// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./BurnPool.sol";

contract BurnFactory {
    address public immutable burnerService;
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    constructor(address _burnerService) {
        burnerService = _burnerService;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, "Identical addresses");
        require(getPair[tokenA][tokenB] == address(0), "Pair exists");

        // Deploying the BurnPool structurally
        BurnPool newPool = new BurnPool(tokenA, tokenB, burnerService);
        pair = address(newPool);

        getPair[tokenA][tokenB] = pair;
        getPair[tokenB][tokenA] = pair;
        allPairs.push(pair);
    }
}