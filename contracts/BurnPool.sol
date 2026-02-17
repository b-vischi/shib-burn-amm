// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IBurnable.sol";

contract BurnPool {
    address public immutable token0;
    address public immutable token1;
    address public immutable burnerService;
    
    uint256 public constant BURN_FEE_BPS = 30; // 0.3%
    uint256 public totalBurnFeesCollected;

    constructor(address _token0, address _token1, address _burner) {
        token0 = _token0;
        token1 = _token1;
        burnerService = _burner;
    }

    /**
     * @notice Executes a swap and physically moves the burn fee.
     */
    function swap(uint256 amountIn, address tokenIn) external {
        require(tokenIn == token0 || tokenIn == token1, "Invalid token");
        
        // The tokens are already IN the pool thanks to the Router
        // Now we just move the fee to the burner
        uint256 burnAmount = (amountIn * BURN_FEE_BPS) / 10000;
        
        IBurnable(tokenIn).transfer(burnerService, burnAmount);
        
        totalBurnFeesCollected += burnAmount;
    }
}