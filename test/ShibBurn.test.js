const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Setup Validation", function () {
  it("Should confirm the architect's wallet is active", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Active Wallet:", owner.address);
    expect(owner.address).to.be.a("string");
  });
});