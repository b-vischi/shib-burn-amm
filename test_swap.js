const hre = require("hardhat");

async function main() {
  const [architect] = await hre.ethers.getSigners();
  
  // 1. Deploy the Mock Token first so we have "Real" assets to move
  const MockShib = await hre.ethers.getContractFactory("MockShib");
  const shib = await MockShib.deploy();
  await shib.waitForDeployment();
  const shibAddr = await shib.getAddress();
  
  // We'll use the same address for tokenB just for this plumbing test
  const tokenB = "0x27C70Fe79721E9104E3331697a64DFf2ea413e11".toLowerCase();

  // 2. Setup the Infrastructure
  const burner = await (await hre.ethers.getContractFactory("ShibBurner")).deploy(shibAddr);
  const factory = await (await hre.ethers.getContractFactory("BurnFactory")).deploy(await burner.getAddress());
  const router = await (await hre.ethers.getContractFactory("BurnRouter")).deploy(await factory.getAddress());

  // 3. Create the Pool
  await factory.createPair(shibAddr, tokenB);
  const poolAddress = await factory.getPair(shibAddr, tokenB);
  const pool = await hre.ethers.getContractAt("BurnPool", poolAddress);

  console.log("Infrastructure deployed. Starting Token Flow Test...");

  // 4. THE CRITICAL STEP: Approval
  // The architect (user) must tell the SHIB contract that the POOL is allowed to take tokens.
  const amountToSwap = hre.ethers.parseUnits("1000000", 18);
  console.log("Approving ROUTER to spend SHIB...");
  await shib.approve(await router.getAddress(), amountToSwap);

  // 5. Execute Swap
  console.log("Executing swap through Router...");
  await router.swapExactTokensForTokens(shibAddr, tokenB, amountToSwap);

  // 6. Verify Results
  const poolFeeBalance = await pool.totalBurnFeesCollected();
  const burnerBalance = await shib.balanceOf(await burner.getAddress());

  console.log("--- ARCHITECTURAL VERIFICATION ---");
  console.log("Total SHIB Swapped: 1,000,000");
  console.log("Fee Tracked in Pool: ", hre.ethers.formatUnits(poolFeeBalance, 18));
  console.log("SHIB Physically moved to Burner: ", hre.ethers.formatUnits(burnerBalance, 18));

  if (burnerBalance > 0n) {
    console.log("✅ SUCCESS: The plumbing is connected. Tokens are moving to the incinerator.");
  }

  console.log("\nStarting Final Incineration...");
  
  // Check supply before
  const supplyBefore = await shib.totalSupply();
  
  // Trigger the burn!
  await burner.triggerBurn();
  
  // Check supply after
  const supplyAfter = await shib.totalSupply();
  const burnedAmount = supplyBefore - supplyAfter;

  console.log("--- BURN VERIFICATION ---");
  console.log("SHIB Destroyed from Supply:", hre.ethers.formatUnits(burnedAmount, 18));
  
  if (burnedAmount > 0n) {
    console.log("🔥 TOTAL SUCCESS: The SHIB has been removed from the blockchain forever.");
  }
}

main().catch((error) => {
  console.error("Plumbing Failure:", error);
  process.exit(1);
});