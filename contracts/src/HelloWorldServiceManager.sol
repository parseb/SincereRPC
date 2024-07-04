// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@eigenlayer/contracts/libraries/BytesLib.sol";
import "@eigenlayer/contracts/core/DelegationManager.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
import "@eigenlayer/contracts/permissions/Pausable.sol";
import {IRegistryCoordinator} from "@eigenlayer-middleware/src/interfaces/IRegistryCoordinator.sol";
import "./IHelloWorldServiceManager.sol";

/**
 * @title Proof of concept Eigenlayer attested RPC responses
 * @author Eigen Labs, Inc.; parseb.eth
 */
contract HelloWorldServiceManager is ECDSAServiceManagerBase, IHelloWorldServiceManager, Pausable {
    using BytesLib for bytes;
    using ECDSAUpgradeable for bytes32;
    
    /* STORAGE */

    /// maps hash of request to hash of response
    mapping(bytes32 => bytes32) public allCallHashes;

    mapping(address => mapping(bytes32 => bytes)) public allCallResponses;

    /* MODIFIERS */
    modifier onlyOperator() {
        require(ECDSAStakeRegistry(stakeRegistry).operatorRegistered(msg.sender) == true, "Operator must be the caller");
        _;
    }

    constructor(address _avsDirectory, address _stakeRegistry, address _delegationManager)
        ECDSAServiceManagerBase(
            _avsDirectory,
            _stakeRegistry,
            address(0), // hello-world doesn't need to deal with payments
            _delegationManager
        )
    {}

    /* FUNCTIONS */

    /// @notice call to emit new rpc call
    /// @param callToRPC RPC call data and response
    /// @param callIntegrityHash haso of callToRPC struct
    /// @dev we avoid verifying the hash here. consistency is the responsibility of the signer
    function createNewCall(CallAnDContextRPC memory callToRPC, bytes32 callIntegrityHash) external {
        allCallHashes[callIntegrityHash] = callToRPC.responseHash;

        /// AVS verifies that callIntegrityHash -> responseHash && callIntegrityHash == keccak256(callToRPC)
        emit NewRPCCallDeclared(callIntegrityHash, callToRPC);
    }

    /// @notice this function is for operatiors to to sign existing Calls.
    function respondToCall(bytes32 callIntegrityHash_, bytes calldata signature) external onlyOperator {
        require(operatorHasMinimumWeight(msg.sender), "Operator does not have match the weight requirements");

        // some logical checks
        require(allCallResponses[msg.sender][callIntegrityHash_].length == 0, "Intergrity Hash already certified");

        // The message that was signed
        // AVS verifies the hashed response belongs to the responded data
        // the AVS signs the response hash
        bytes32 RPCCallReponseHashed = allCallHashes[callIntegrityHash_].toEthSignedMessageHash();

        // Recover the signer address from the signature (@todo look for spcificities)
        address signer = RPCCallReponseHashed.recover(signature);

        require(signer == msg.sender, "Message signer is not operator");

        // associating AVS signature to RPC call and response hash
        allCallResponses[msg.sender][callIntegrityHash_] = signature;

        // emitting event
        emit AuthenticatedRPCResponseHash(callIntegrityHash_, msg.sender);
    }

    // HELPER

    function operatorHasMinimumWeight(address operator) public view returns (bool) {
        return ECDSAStakeRegistry(stakeRegistry).getOperatorWeight(operator)
            >= ECDSAStakeRegistry(stakeRegistry).minimumWeight();
    }
}
