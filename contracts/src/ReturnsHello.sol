// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title Proof of concept Eigenlayer attested RPC responses
 * @author Eigen Labs, Inc.; parseb.eth
 */
contract ReturnsHello {

    fallback(bytes calldata) external returns (bytes memory) {
        return abi.encodePacked("Hello! I am a contract response.");
    }

}
