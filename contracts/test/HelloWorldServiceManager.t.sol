// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "../src/HelloWorldServiceManager.sol";
import "../src/IHelloWorldServiceManager.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";

/// @author claude.ai
contract MockECDSAStakeRegistry {
    mapping(address => bool) public operatorRegistered;
    mapping(address => uint256) public operatorWeights;
    uint256 public minimumWeight;

    function setOperatorRegistered(address operator, bool isRegistered) external {
        operatorRegistered[operator] = isRegistered;
    }

    function setOperatorWeight(address operator, uint256 weight) external {
        operatorWeights[operator] = weight;
    }

    function setMinimumWeight(uint256 weight) external {
        minimumWeight = weight;
    }

    function getOperatorWeight(address operator) external view returns (uint256) {
        return operatorWeights[operator];
    }

    function isOperatorRegistered(address operator) external view returns (bool) {
        return operatorRegistered[operator];
    }
}

contract HelloWorldServiceManagerTest is Test {
    HelloWorldServiceManager public helloWorldServiceManager;
    MockECDSAStakeRegistry public mockStakeRegistry;

    address public operator;
    uint256 private operatorPrivateKey;

    function setUp() public {
        operatorPrivateKey = 0x1;
        operator = vm.addr(operatorPrivateKey);

        mockStakeRegistry = new MockECDSAStakeRegistry();

        address mockAVSDirectory = address(0x1);
        address mockDelegationManager = address(0x2);

        helloWorldServiceManager = new HelloWorldServiceManager(
            mockAVSDirectory,
            address(mockStakeRegistry),
            mockDelegationManager
        );

        mockStakeRegistry.setOperatorRegistered(operator, true);
        mockStakeRegistry.setOperatorWeight(operator, 150 ether);
        mockStakeRegistry.setMinimumWeight(50 ether);
    }

    function testValidSignature() public {
        bytes32 callIntegrityHash = keccak256("someData");
        bytes32 responseHash = keccak256("responseData");

        IHelloWorldServiceManager.CallAnDContextRPC memory callToRPC = IHelloWorldServiceManager.CallAnDContextRPC({
            target: address(0),
            callData: "",
            withCode: "",
            blockNumber: 0,
            responseHash: responseHash
        });

        helloWorldServiceManager.createNewCall(callToRPC, callIntegrityHash);

        bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", responseHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(operator);
        helloWorldServiceManager.respondToCall(callIntegrityHash, signature);

        // assertTrue(helloWorldServiceManager.allTaskResponses(operator, callIntegrityHash).length > 0);
    }

    function testInvalidSignature() public {
        bytes32 callIntegrityHash = keccak256("someData");
        bytes32 responseHash = keccak256("responseData");

        IHelloWorldServiceManager.CallAnDContextRPC memory callToRPC = IHelloWorldServiceManager.CallAnDContextRPC({
            target: address(0),
            callData: "",
            withCode: "",
            blockNumber: 0,
            responseHash: responseHash
        });

        helloWorldServiceManager.createNewCall(callToRPC, callIntegrityHash);

        bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", responseHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(0x2, messageHash); // Different private key
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(operator);
        vm.expectRevert("Message signer is not operator");
        helloWorldServiceManager.respondToCall(callIntegrityHash, signature);
    }

    function testHashMismatch() public {
        bytes32 callIntegrityHash = keccak256("someData");
        bytes32 responseHash = keccak256("responseData");

        IHelloWorldServiceManager.CallAnDContextRPC memory callToRPC = IHelloWorldServiceManager.CallAnDContextRPC({
            target: address(0),
            callData: "",
            withCode: "",
            blockNumber: 0,
            responseHash: responseHash
        });

        helloWorldServiceManager.createNewCall(callToRPC, callIntegrityHash);

        bytes32 differentResponseHash = keccak256("differentResponseData");
        bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", differentResponseHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(operatorPrivateKey, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(operator);
        vm.expectRevert("Message signer is not operator");
        helloWorldServiceManager.respondToCall(callIntegrityHash, signature);
    }
}
