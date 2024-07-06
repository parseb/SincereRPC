// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IHelloWorldServiceManager {
    struct CallAnDContextRPC {
        address target;
        bytes callData;
        bytes withCode;
        uint256 blockNumber;
        bytes32 responseHash;
    }

    // EVENTS


    function createNewCall(CallAnDContextRPC memory callToRPC, bytes32 callIntegrityHash) external;

    /// @notice called by operator to attest to existing call
    function respondToCall(bytes32 callIntegrityHash_, bytes calldata signature) external;
}
