import {ethers} from 'ethers';


export const main = async (request) => {
  const logs = ['Function started'];
  const contractABI = [
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
  let contractAddress, calldata, RPCurl;
  const txhash0 = '0x60b8a6888f057c39bbd7f38ebefdfd9ad6a600bd094ee5b567a1ba87a74e99a9';

  try {
    // Extract parameters using request.query
    if (request && request.query) {
      contractAddress = request.query.contractAddress;
      calldata = request.query.calldata;
      RPCurl = request.query.RPCurl;

      if (! RPCurl) RPCurl = "https://holesky.gateway.tenderly.co/11dzgAKHgttNlbHqYRAud9"
    } else {
      logs.push('Warning: request.query not available, falling back to empty parameters');
      contractAddress = calldata = RPCurl = undefined;
    }


    // Validate required params
    if (!contractAddress || !calldata || !RPCurl) {
      return (`Extracted parameters: ${JSON.stringify({ contractAddress, calldata, RPCurl })}. Some Missing`);
    }


    const provider = new ethers.JsonRpcProvider(RPCurl); //// dies here
    logs.push('Provider created');

    
    const wallet = new ethers.Wallet(txhash0, provider);
    logs.push('Wallet created');


    // Perform the static call
    logs.push('Performing static call...');
    const staticCallResult = await provider.call({
      to: contractAddress,
      data: calldata
    });
    logs.push(`Static call result: ${staticCallResult}`);


    logs.push('Preparing callToRPC...');
    const currentBlockNumber = await provider.getBlockNumber();
    const callToRPC = {
      target: contractAddress,
      callData: calldata,
      withCode: '0x', // Empty bytes
      blockNumber: currentBlockNumber,
      responseHash: ethers.keccak256(staticCallResult)
    };
    logs.push(`callToRPC prepared: ${JSON.stringify(callToRPC)}`);



    // Calculate the callIntegrityHash
    logs.push('Calculating callIntegrityHash...');
    const callIntegrityHash = ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'bytes', 'bytes', 'uint256', 'bytes32'],
      [callToRPC.target, callToRPC.callData, callToRPC.withCode, callToRPC.blockNumber, callToRPC.responseHash]
    ));
    logs.push(`callIntegrityHash calculated: ${callIntegrityHash}`);

    // Address of the HelloWorldServiceManager contract
    const helloWorldServiceManagerAddress = '0xb29C4dC323ee85A16fB06D48F367f92ae99B730F';

    // Create a contract instance for HelloWorldServiceManager
    logs.push('Creating HelloWorldServiceManager contract instance...');
    const helloWorldServiceManager = new ethers.Contract(helloWorldServiceManagerAddress, contractABI, wallet);

    // Call the createNewCall function
    logs.push('Calling createNewCall function...');
    const tx = await helloWorldServiceManager.createNewCall(callToRPC, callIntegrityHash);
    logs.push(`createNewCall transaction sent: ${tx.hash}`);

    // Wait for the transaction to be mined

    // logs.push('Waiting for transaction to be mined...');
    // const receipt = await tx.wait();
    // logs.push(`Transaction mined. Receipt: ${JSON.stringify(receipt)}`);

    // logs.push('HelloWorldServiceManager createNewCall successful');

  
    return new Response(JSON.stringify({
      logs: logs,
      staticCallResult: staticCallResult,
      transactionHash: tx.hash,
      receipt: receipt
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logs.push(`Error in main function: ${error.message}`);
    return new Response(JSON.stringify({ 
      logs: logs,
      error: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default main;
