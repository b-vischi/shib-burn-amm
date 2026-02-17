// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BurnFactory.sol";
import "./BurnPool.sol";

/**
 * @title BurnRouter
 * @dev The entry point for users to interact with the AMM.
 */
contract BurnRouter {
    address public immutable factory;

    constructor(address _factory) {
        factory = _factory;
    }

    /**
     * @notice Executes a swap and ensures the burn fee is handled.
     * @param tokenIn The token the user is giving.
     * @param tokenOut The token the user wants.
     * @param amountIn The amount being traded.
     */
    function swapExactTokensForTokens(
        address tokenIn, address tokenOut, uint256 amountIn
    ) external {
        address pool = BurnFactory(factory).getPair(tokenIn, tokenOut);
        require(pool != address(0), "Router: Pool does not exist");

        // NEW: Pull the tokens from the User to the Pool
        IBurnable(tokenIn).transferFrom(msg.sender, pool, amountIn);

        // Execute the swap logic on the pool
        BurnPool(pool).swap(amountIn, tokenIn);
    }
}