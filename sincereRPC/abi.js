export const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_avsDirectory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_stakeRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_delegationManager",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "callIntegrityHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "AuthenticatedRPCResponseHash",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "callIntegrityHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "withCode",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "blockNumber",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "responseHash",
            "type": "bytes32"
          }
        ],
        "indexed": false,
        "internalType": "struct IHelloWorldServiceManager.CallAnDContextRPC",
        "name": "callAndResponse",
        "type": "tuple"
      }
    ],
    "name": "NewRPCCallDeclared",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPausedStatus",
        "type": "uint256"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract IPauserRegistry",
        "name": "pauserRegistry",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "contract IPauserRegistry",
        "name": "newPauserRegistry",
        "type": "address"
      }
    ],
    "name": "PauserRegistrySet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "prevRewardsInitiator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newRewardsInitiator",
        "type": "address"
      }
    ],
    "name": "RewardsInitiatorUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPausedStatus",
        "type": "uint256"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "allCallHashes",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "allCallResponses",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "avsDirectory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "contract IStrategy",
                "name": "strategy",
                "type": "address"
              },
              {
                "internalType": "uint96",
                "name": "multiplier",
                "type": "uint96"
              }
            ],
            "internalType": "struct IRewardsCoordinator.StrategyAndMultiplier[]",
            "name": "strategiesAndMultipliers",
            "type": "tuple[]"
          },
          {
            "internalType": "contract IERC20",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint32",
            "name": "startTimestamp",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "duration",
            "type": "uint32"
          }
        ],
        "internalType": "struct IRewardsCoordinator.RewardsSubmission[]",
        "name": "rewardsSubmissions",
        "type": "tuple[]"
      }
    ],
    "name": "createAVSRewardsSubmission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "withCode",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "blockNumber",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "responseHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IHelloWorldServiceManager.CallAnDContextRPC",
        "name": "callToRPC",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "callIntegrityHash",
        "type": "bytes32"
      }
    ],
    "name": "createNewCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "deregisterOperatorFromAVS",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "getOperatorRestakedStrategies",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRestakeableStrategies",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "operatorHasMinimumWeight",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newPausedStatus",
        "type": "uint256"
      }
    ],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pauseAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "index",
        "type": "uint8"
      }
    ],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pauserRegistry",
    "outputs": [
      {
        "internalType": "contract IPauserRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "salt",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "expiry",
            "type": "uint256"
          }
        ],
        "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
        "name": "operatorSignature",
        "type": "tuple"
      }
    ],
    "name": "registerOperatorToAVS",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "callIntegrityHash_",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "respondToCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardsInitiator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IPauserRegistry",
        "name": "newPauserRegistry",
        "type": "address"
      }
    ],
    "name": "setPauserRegistry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newRewardsInitiator",
        "type": "address"
      }
    ],
    "name": "setRewardsInitiator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stakeRegistry",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newPausedStatus",
        "type": "uint256"
      }
    ],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_metadataURI",
        "type": "string"
      }
    ],
    "name": "updateAVSMetadataURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]