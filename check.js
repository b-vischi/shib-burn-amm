const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("SUCCESS! Architect Wallet found:", owner.address);
}

main().catch((error) => {
  console.error("STILL ERROR:", error);
  process.exit(1);
});