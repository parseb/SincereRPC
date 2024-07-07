import main from './index.js';

// Simulate a request object
const mockRequest = {
  query: {
    contractAddress: '0x9b933369a75f484F10A1765588bc7B1E81Ab712d',
    calldata: '0x12345678ffffff',
    RPCurl: 'https://holesky.gateway.tenderly.co/11dzgAKHgttNlbHqYRAud9'
    // RPCurl: 'https://ethereum-holesky-rpc.publicnode.com/'
  }
};

// Call the edge function
main(mockRequest)
  .then(result => console.log('Result:', result))
  .catch(error => console.error('Error:', error));
