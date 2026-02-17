const hre = require("hardhat");

async function main() {
  // We pull getAddress from ethers to fix the checksum issue
  const { getAddress } = hre.ethers;
  const [architect] = await hre.ethers.getSigners();
  console.log("Starting deployment with address:", architect.address);

  // 1. Normalize and Deploy the ShibBurner
  // Wrapping these in getAddress() fixes the "bad address checksum" error
  const SHIB_ADDRESS = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE".toLowerCase();
  const LEASH_ADDRESS = "0x27C70Fe79721E9104E3331697a64DFf2ea413e11".toLowerCase();

  const Burner = await hre.ethers.getContractFactory("ShibBurner");
  const burner = await Burner.deploy(SHIB_ADDRESS);
  await burner.waitForDeployment();
  const burnerAddr = await burner.getAddress();
  console.log("1. ShibBurner (Incinerator) active at:", burnerAddr);

  // 2. Deploy the BurnFactory
  const Factory = await hre.ethers.getContractFactory("BurnFactory");
  const factory = await Factory.deploy(burnerAddr);
  await factory.waitForDeployment();
  const factoryAddr = await factory.getAddress();
  console.log("2. BurnFactory (Manager) active at:", factoryAddr);

  // 3. Create a SHIB/LEASH Pool
  console.log("Creating SHIB/LEASH liquidity pool...");
  const tx = await factory.createPair(SHIB_ADDRESS, LEASH_ADDRESS);
  await tx.wait();

  const poolAddress = await factory.getPair(SHIB_ADDRESS, LEASH_ADDRESS);
  console.log("3. ✅ SUCCESS: SHIB/LEASH Burn-Enabled Pool deployed at:", poolAddress);

  // 4. Deploy the BurnRouter (The Interface)
  const Router = await hre.ethers.getContractFactory("BurnRouter");
  const router = await Router.deploy(factoryAddr);
  await router.waitForDeployment();
  const routerAddr = await router.getAddress();
  console.log("4. ✅ SUCCESS: BurnRouter (Control Panel) active at:", routerAddr);
}

main().catch((error) => {
  console.error("Architectural Failure:", error.message);
  process.exit(1);
});