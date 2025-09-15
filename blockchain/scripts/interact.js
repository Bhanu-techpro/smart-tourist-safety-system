const { ethers } = require("hardhat");
require("dotenv").config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const RPC_URL = process.env.BLOCKCHAIN_RPC_URL;

async function main() {
    if (!CONTRACT_ADDRESS || !ADMIN_PRIVATE_KEY || !RPC_URL) {
        throw new Error("Please set CONTRACT_ADDRESS, ADMIN_PRIVATE_KEY, and RPC_URL in your .env file");
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const adminWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);

    const digitalTouristID = await ethers.getContractAt("DigitalTouristID", CONTRACT_ADDRESS, adminWallet);

    console.log(`Attached to DigitalTouristID contract at ${CONTRACT_ADDRESS}`);

    // --- Example: Register a new tourist ---
    const touristAddress = "0x... tourist's wallet address ..."; // Replace with a real address
    const touristData = {
        passport: "AB123456",
        name: "John Doe",
        dob: "1990-01-01"
    };
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes(`${touristData.passport}-${touristData.name}-${touristData.dob}`));
    
    // Set expiry to 30 days from now
    const expiryTimestamp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

    console.log(`
Registering tourist ${touristAddress}...`);
    const tx = await digitalTouristID.registerTourist(touristAddress, dataHash, expiryTimestamp);
    await tx.wait();
    console.log("Tourist registered successfully! Transaction hash:", tx.hash);

    // --- Example: Verify a tourist ---
    console.log(`
Verifying tourist ${touristAddress}...`);
    const isVerified = await digitalTouristID.isTouristVerified(touristAddress);
    console.log(`Is tourist verified? ${isVerified}`);

    // --- Example: Get tourist info ---
    console.log(`
Getting info for tourist ${touristAddress}...`);
    const info = await digitalTouristID.getTouristInfo(touristAddress);
    console.log("Tourist Info:", {
        dataHash: info.dataHash,
        expiryTimestamp: new Date(Number(info.expiryTimestamp) * 1000).toLocaleString(),
        isActive: info.isActive
    });

    // --- Example: Revoke a tourist ---
    // console.log(`
Revoking tourist ${touristAddress}...`);
    // const revokeTx = await digitalTouristID.revokeTourist(touristAddress);
    // await revokeTx.wait();
    // console.log("Tourist revoked successfully! Transaction hash:", revokeTx.hash);
    
    // const isVerifiedAfterRevoke = await digitalTouristID.isTouristVerified(touristAddress);
    // console.log(`Is tourist verified after revoke? ${isVerifiedAfterRevoke}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
