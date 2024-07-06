import axios from 'axios';
import { ethers } from 'ethers';

// Replace with your edge function URL
const EDGE_FUNCTION_URL = process.env.FLEEK_URL || 'https://millions-ram-narrow.functions.on-fleek.app';

// hello contract
const contractAddress = '0xb29C4dC323ee85A16fB06D48F367f92ae99B730F';

// Replace with your RPC URL
const RPCurl = 'https://ethereum-holesky-rpc.publicnode.com';

async function createNewTask() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(RPCurl);

    // Generate random calldata
    const calldata = ethers.utils.hexlify(ethers.utils.randomBytes(100));

    // Construct the URL with parameters
    const url = new URL(EDGE_FUNCTION_URL);
    url.searchParams.append('contractAddress', contractAddress);
    url.searchParams.append('RPCurl', RPCurl);
    url.searchParams.append('calldata', calldata);

    
    // Make the HTTP request to the edge function
    const response = await axios.get(url.toString());
    console.log('url I called : ', url.toString());
    console.log('Edge function response:', response.data);

    // If the response is encoded, try to decode it
    if (typeof response.data === 'string' && response.data.startsWith('0x')) {
      try {
        const decodedResponse = ethers.utils.toUtf8String(response.data);
        console.log('Decoded response:', decodedResponse);
      } catch (error) {
        console.log('Could not decode response as UTF-8 string');
      }
    }
  } catch (error) {
    console.error('Error creating new task:', error);
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