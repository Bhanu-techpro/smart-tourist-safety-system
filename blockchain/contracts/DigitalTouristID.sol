// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DigitalTouristID
 * @dev This contract manages digital identities for tourists on the blockchain.
 * It stores a hash of tourist data for privacy, along with an expiry timestamp.
 * Only the owner (admin) can register or revoke tourist IDs.
 */
contract DigitalTouristID is Ownable, ReentrancyGuard {
    
    struct Tourist {
        bytes32 dataHash; // A hash of sensitive tourist data (e.g., keccak256(abi.encodePacked(passport, name, dob)))
        uint256 expiryTimestamp; // Unix timestamp when the ID expires
        bool isActive;
    }

    mapping(address => Tourist) public tourists;
    mapping(bytes32 => address) public hashToAddress;

    event TouristRegistered(address indexed touristAddress, bytes32 indexed dataHash, uint256 expiryTimestamp);
    event TouristRevoked(address indexed touristAddress, bytes32 indexed dataHash);

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Registers a new tourist or updates an existing one.
     * The dataHash should be a keccak256 hash of the tourist's identifying information.
     * The expiryTimestamp should be a future Unix timestamp.
     * @param touristAddress The wallet address of the tourist.
     * @param dataHash A hash of the tourist's KYC data.
     * @param expiryTimestamp The timestamp when this digital ID expires.
     */
    function registerTourist(address touristAddress, bytes32 dataHash, uint256 expiryTimestamp) external onlyOwner nonReentrant {
        require(touristAddress != address(0), "DigitalTouristID: Invalid tourist address");
        require(expiryTimestamp > block.timestamp, "DigitalTouristID: Expiry must be in the future");
        require(hashToAddress[dataHash] == address(0) || hashToAddress[dataHash] == touristAddress, "DigitalTouristID: Data hash already registered to another address");

        tourists[touristAddress] = Tourist({
            dataHash: dataHash,
            expiryTimestamp: expiryTimestamp,
            isActive: true
        });
        hashToAddress[dataHash] = touristAddress;

        emit TouristRegistered(touristAddress, dataHash, expiryTimestamp);
    }

    /**
     * @dev Revokes a tourist's digital ID, marking it as inactive.
     * This can be used at the end of a trip or if the ID is compromised.
     * @param touristAddress The address of the tourist to revoke.
     */
    function revokeTourist(address touristAddress) external onlyOwner nonReentrant {
        require(tourists[touristAddress].isActive, "DigitalTouristID: Tourist is not active or does not exist");

        Tourist storage tourist = tourists[touristAddress];
        bytes32 dataHash = tourist.dataHash;

        tourist.isActive = false;
        delete hashToAddress[dataHash];

        emit TouristRevoked(touristAddress, dataHash);
    }

    /**
     * @dev Verifies if a tourist's digital ID is currently valid.
     * An ID is valid if it is marked as active and has not expired.
     * @param touristAddress The address to verify.
     * @return bool True if the tourist ID is valid, false otherwise.
     */
    function isTouristVerified(address touristAddress) external view returns (bool) {
        return tourists[touristAddress].isActive && tourists[touristAddress].expiryTimestamp > block.timestamp;
    }

    /**
     * @dev Gets the details of a tourist.
     * Returns the data hash and expiry timestamp for a given address.
     * @param touristAddress The address of the tourist.
     * @return dataHash The hash of the tourist's data.
     * @return expiryTimestamp The expiry timestamp of the ID.
     * @return isActive The current status of the ID.
     */
    function getTouristInfo(address touristAddress) external view returns (bytes32 dataHash, uint256 expiryTimestamp, bool isActive) {
        Tourist storage tourist = tourists[touristAddress];
        return (tourist.dataHash, tourist.expiryTimestamp, tourist.isActive);
    }
}
