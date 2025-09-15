const { ethers } = require('ethers');
require('dotenv').config();

const { BLOCKCHAIN_RPC_URL, ADMIN_PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

// This should be the ABI of your deployed contract
const contractABI = [
    // Paste the ABI from your compiled contract's JSON file here
    // e.g., from artifacts/contracts/DigitalTouristID.sol/DigitalTouristID.json
    // For now, a minimal ABI
    "function registerTourist(address touristAddress, bytes32 dataHash, uint256 expiryTimestamp) external",
    "function isTouristVerified(address touristAddress) external view returns (bool)",
];

let provider, adminWallet, contract;

try {
    provider = new ethers.JsonRpcProvider(BLOCKCHAIN_RPC_URL);
    adminWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);
    contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, adminWallet);
} catch (error) {
    console.error("Failed to initialize blockchain utility:", error.message);
}


/**
 * Registers a tourist on the blockchain.
 * @param {string} touristAddress - The tourist's wallet address.
 * @param {object} touristData - The data to hash (e.g., { passportNumber, name, dateOfBirth }).
 * @param {string} expiryDate - The expiry date string for the ID.
 * @returns {Promise<{dataHash: string, expiryTimestamp: number}>}
 */
async function registerTouristOnBlockchain(touristAddress, touristData, expiryDate) {
    if (!contract) throw new Error("Blockchain service not initialized.");

    const dataString = `${touristData.passportNumber}-${touristData.name}-${touristData.dateOfBirth}`;
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes(dataString));
    const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);

    try {
        console.log(`Registering tourist on blockchain with hash: ${dataHash}`);
        const tx = await contract.registerTourist(touristAddress, dataHash, expiryTimestamp);
        await tx.wait(); // Wait for the transaction to be mined
        console.log(`Transaction successful: ${tx.hash}`);
        return { dataHash, expiryTimestamp };
    } catch (error) {
        console.error("Error registering tourist on blockchain:", error);
        throw new Error("Blockchain registration failed.");
    }
}

module.exports = {
    registerTouristOnBlockchain,
};
