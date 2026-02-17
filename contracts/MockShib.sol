// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockShib
 * @dev A test token that mimics SHIB behavior including a burn function.
 */
contract MockShib is ERC20 {
    constructor() ERC20("Mock Shiba Inu", "SHIB") {
        _mint(msg.sender, 1000000000 * 10**18); // 1 Billion SHIB
    }

    // This mimics the specific burn logic we need to test our Burner
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}