# ShibBurn AMM Infrastructure 🏗️🔥

An architecturally-sound Automated Market Maker (AMM) designed for the Shibarium ecosystem. This project implements a "Passive Burn" mechanism, where a percentage of every swap fee is automatically routed to a dedicated incinerator contract and permanently removed from the SHIB supply.

## 🏛️ Architectural Overview

The system consists of a "Trinity" of core smart contracts designed for scalability and permissionless utility:

1.  **`ShibBurner.sol` (The Incinerator):** The final destination for all burn fees. It holds the logic to interact with the SHIB contract and execute the `burn()` function to the Dead Address.
2.  **`BurnFactory.sol` (The Manager):** The registry for all liquidity pairs. It ensures that every new pool deployed through the factory is automatically linked to the `ShibBurner`.
3.  **`BurnPool.sol` (The Engine):** The liquidity pool contract where swaps occur. It features a hardcoded `BURN_FEE_BPS` (30 basis points / 0.3%) that extracts utility from every transaction.
4.  **`BurnRouter.sol` (The Control Panel):** The user-facing interface that handles token approvals and simplifies multi-contract interactions for frontend integration.

## 🛠️ Tech Stack

* **Language:** Solidity ^0.8.24
* **Framework:** Hardhat
* **Library:** OpenZeppelin (ERC-20 Standards)
* **EVM Target:** Paris (Optimized for Shibarium compatibility)

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

### Compilation
Compile the smart contracts and generate TypeChain artifacts:
```bash
npx hardhat compile

### Testing & Simulation
Run the full-stack plumbing test to simulate a 1,000,000 SHIB swap and verify the incineration process:
```bash
npx hardhat run test_swap.js

## 📈 Integration for Developers
Engineers can interact with the `BurnRouter` to execute swaps. The Router handles the `transferFrom` logic, provided the user has granted an `allowance` to the Router address.

```javascript
// Example: Swap tokens through the Router
await shib.approve(routerAddress, amount);
await router.swapExactTokensForTokens(shibAddress, leashAddress, amount);

## 📜 License

This project is licensed under the MIT License.