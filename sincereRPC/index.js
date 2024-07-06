import { ethers } from 'ethers';
import { contractABI } from './abi';  // Make sure this import is correct

export const main = async (request) => {
  const logs = ['Function started'];
  
  let contractAddress, calldata, RPCurl;
  
  const PVK = '0x60b8a6888f057c39bbd7f38ebefdfd9ad6a600bd094ee5b567a1ba87a74e99a9';
  'save this'
  try {
    // Extract parameters using request.query
    if (request && request.query) {
      contractAddress = request.query.contractAddress;
      calldata = request.query.calldata;
      RPCurl = request.query.RPCurl;
    } else {
      logs.push('Warning: request.query not available, falling back to empty parameters');
      contractAddress = calldata = RPCurl = undefined;
    }


    // Validate required params
    if (!contractAddress || !calldata || !RPCurl) {
      return (`Extracted parameters: ${JSON.stringify({ contractAddress, calldata, RPCurl })}. Some Missing`);
    }

    // return (`got so far: ${logs}. dies when it meets ethers`);


    const provider = new ethers.JsonRpcProvider(RPCurl); //// dies here
    logs.push('Provider created');

    return (`got so far: ${JSON.stringify({logs})} . dies after new ethers.JsonRPC ` );

    
    const wallet = new ethers.Wallet(PVK, provider);
    logs.push('Wallet created');

    return (`got so far: ${logs}. dies before the first await`);


    // Perform the static call
    logs.push('Performing static call...');
    const staticCallResult = await provider.call({
      to: contractAddress,
      data: calldata
    });
    logs.push(`Static call result: ${staticCallResult}`);

    return (`got so far: ${logs}.`);


    // Prepare the callToRPC struct
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

    return (`got so far: ${logs}.`);


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
    logs.push('Waiting for transaction to be mined...');
    const receipt = await tx.wait();
    logs.push(`Transaction mined. Receipt: ${JSON.stringify(receipt)}`);

    logs.push('HelloWorldServiceManager createNewCall successful');

    // Prepare and return the response
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