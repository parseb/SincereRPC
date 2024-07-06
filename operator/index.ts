import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { delegationABI } from "./abis/delegationABI";
import { contractABI } from './abis/contractABI';
import { registryABI } from './abis/registryABI';
import { avsDirectoryABI } from './abis/avsDirectoryABI';
dotenv.config();


const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const delegationManagerAddress = process.env.HOLESKY_DELEGATION_MANAGER_ADDRESS!;
const contractAddress = process.env.HOLESKY_CONTRACT_ADDRESS!;
const stakeRegistryAddress = process.env.HOLESKY_STAKE_REGISTRY_ADDRESS!;
const avsDirectoryAddress = process.env.HOLESKY_AVS_DIRECTORY_ADDRESS!;

const delegationManager = new ethers.Contract(delegationManagerAddress, delegationABI, wallet);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const registryContract = new ethers.Contract(stakeRegistryAddress, registryABI, wallet);
const avsDirectory = new ethers.Contract(avsDirectoryAddress, avsDirectoryABI, wallet);

type CallAnDContextRPCtype =  {
    target:string,
    callData: string,
    withCode: string,
    blockNumber: string,
    responseHash: string
}


const signAndRespondToCall = async (callIntegrityHash: string, responseHash: string) => {
    try {
        // Get the response hash from the contract
        const contractResponseHash = await contract.allCallHashes(callIntegrityHash);

        // Verify that the response hash matches what's stored in the contract
        if (contractResponseHash !== responseHash) {
            console.error("Response hash mismatch");
            return;
        }

        // Create the message to sign (prefixed as per Ethereum signed message standard)
        const messageHashBytes = ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(responseHash)));
        const messageHashPrefixed = ethers.utils.hashMessage(messageHashBytes);

        // Sign the message
        const signature = await wallet.signMessage(messageHashBytes);

        // Verify the signature
        const recoveredAddress = ethers.utils.verifyMessage(messageHashBytes, signature);
        if (recoveredAddress !== wallet.address) {
            console.error("Signature verification failed");
            return;
        }

        console.log(`Signing and responding to call with integrity hash: ${callIntegrityHash}`);

        // Call the contract's respondToCall function
        const tx = await contract.respondToCall(callIntegrityHash, signature);
        await tx.wait();

        console.log(`Responded to call. Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error in signAndRespondToCall:", error);
    }
};

const registerOperator = async () => {
    console.log("Registering operator...");
    
    const tx1 = await delegationManager.registerAsOperator({
        earningsReceiver: await wallet.getAddress(),
        delegationApprover: "0x0000000000000000000000000000000000000000",
        stakerOptOutWindowBlocks: 0
    }, "");
    await tx1.wait();
    console.log("Operator registered on EL successfully");

    const salt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now

    let operatorSignature = {
        expiry: expiry,
        salt: salt,
        signature: ""
    };

    const digestHash = await avsDirectory.calculateOperatorAVSRegistrationDigestHash(
        await wallet.getAddress(), 
        contract.address, 
        salt, 
        expiry
    );

    const signingKey = new ethers.utils.SigningKey(process.env.PRIVATE_KEY!);
    const signature = signingKey.signDigest(digestHash);
    
    operatorSignature.signature = ethers.utils.joinSignature(signature);

    const tx2 = await registryContract.registerOperatorWithSignature(
        await wallet.getAddress(),
        operatorSignature
    );
    await tx2.wait();
    console.log("Operator registered on AVS successfully");
};

// const verifyRPCCallIntegrity = async () => {
//     //// 1 verify that hash of CallAnDContextRPC is equal to the callIntegrityHash
//    //// if not console.log ("false integrity hash")

//    //// 2 if hash verified; reporduce the rpc call using CallAndContextRPC data, to call the speciy contract, with given calldata, at given rpc and block
//    /// the response hash equals the responseHash: ethers.keccak256(result) of the staticaal


// }


const verifyRPCCallIntegrity = async (callIntegrityHash: string, task: CallAnDContextRPCtype) => {
    // Step 1: Verify that the hash of CallAnDContextRPC is equal to the callIntegrityHash
    const calculatedHash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
            ["address", "bytes", "string", "string", "string"],
            [task.target, task.callData, task.withCode, task.blockNumber, task.responseHash]
        )
    );

    if (calculatedHash !== callIntegrityHash) {
        console.log("False integrity hash");
        return false;
    }

    // Step 2: Reproduce the RPC call using CallAndContextRPC data
    try {
        // Create a provider that can access historical blocks
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

        // Create a contract instance
        const contract = new ethers.Contract(task.target, [task.withCode], provider);

        // Make a static call to the contract at the specified block
        const result = await contract.callStatic[task.withCode](
            ...ethers.utils.defaultAbiCoder.decode([task.withCode], task.callData),
            { blockTag: parseInt(task.blockNumber) }
        );

        // Calculate the hash of the result
        const resultHash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([task.withCode], [result]));

        // Compare the calculated hash with the provided responseHash
        if (resultHash === task.responseHash) {
            console.log("RPC call integrity verified successfully");
            return true;
        } else {
            console.log("Response hash mismatch");
            return false;
        }
    } catch (error) {
        console.error("Error while verifying RPC call integrity:", error);
        return false;
    }
};


const monitorNewTasks = async () => {
    contract.on("NewRPCCallDeclared", async (callIntegrityHash: string, task: CallAnDContextRPCtype) => {
        console.log(`New RPC call detected. Integrity: ${callIntegrityHash}, Response: ${task.responseHash}`);
        
        const isIntegrityVerified = await verifyRPCCallIntegrity(callIntegrityHash, task);
        
        if (isIntegrityVerified) {
            await signAndRespondToCall(callIntegrityHash, task.responseHash);
        } else {
            console.log("Failed to verify RPC call integrity. Not responding to call.");
        }
    });

    console.log("Monitoring for new tasks...");
};



const main = async () => {
    const isDelegationManagerAlreadyRegistered = await delegationManager.isOperator(wallet.getAddress());
    try {
        if (! isDelegationManagerAlreadyRegistered ) await registerOperator();

        await monitorNewTasks();
    } catch (error) {
        console.error("Error in main function:", error);
    }
};

main();
