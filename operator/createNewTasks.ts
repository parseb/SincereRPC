

import axios from 'axios';
import { ethers } from 'ethers';

// Replace with your edge function URL
const EDGE_FUNCTION_URL = 'https://puny-angle-millions.functions.on-fleek.app';

// Replace with your own private key (ensure this is kept secret in real applications)
const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

// Replace with the address of your smart contract
// const contractAddress = '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB';
const contractAddress = '0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f';

// Replace with your RPC URL
const RPCurl = 'http://127.0.0.1:8545';

async function createNewTask() {
  try {
    const provider = new ethers.providers.JsonRpcBatchProvider(RPCurl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const currentBlockNumber = await provider.getBlockNumber();

    // Generate some random data for the call
    const target = ethers.Wallet.createRandom().address;
    const calldata = ethers.utils.randomBytes(100);
    const responseHash = ethers.utils.keccak256(ethers.utils.randomBytes(32));

    // Construct the URL with parameters
    const url = new URL(EDGE_FUNCTION_URL);
    url.searchParams.append('contractAddress', contractAddress);
    url.searchParams.append('RPCurl', RPCurl);
    url.searchParams.append('privateKey', privateKey);
    url.searchParams.append('target', target);
    url.searchParams.append('callData', calldata.toString());

    // Make the HTTP request to the edge function
    const response = await axios.get(url.toString());

    //// Response is abi.encodePacked
    "This is me, a contract response, but from fallback (no function called), either way, this is great"


    console.log('Edge function response:', response.data);
  } catch (error) {
    console.error('Error creating new task:');
  }
}

function startCreatingTasks() {
  setInterval(() => {
    console.log('Creating new task...');
    createNewTask();
  }, 15000);
}

// Start the process
startCreatingTasks();