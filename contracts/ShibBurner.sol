// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IBurnable.sol";

/**
 * @title ShibBurner
 * @dev Service contract to collect and incinerate SHIB tokens.
 */
contract ShibBurner {
    address public immutable shibToken;
    uint256 public totalIncinerated;

    event Burned(uint256 amount, uint256 timestamp);

    constructor(address _shibToken) {
        shibToken = _shibToken;
    }

    /**
     * @notice Burns all SHIB currently held by this contract.
     */
    function triggerBurn() external {
        uint256 balance = IBurnable(shibToken).balanceOf(address(this));
        require(balance > 0, "Architect: No SHIB to incinerate");

        // Execute the burn via the SHIB token contract logic
        IBurnable(shibToken).burn(balance);
        
        totalIncinerated += balance;
        emit Burned(balance, block.timestamp);
    }
}