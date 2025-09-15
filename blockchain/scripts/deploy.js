const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const initialOwner = deployer.address;
  const digitalTouristID = await hre.ethers.deployContract("DigitalTouristID", [initialOwner]);

  await digitalTouristID.waitForDeployment();

  console.log(`DigitalTouristID contract deployed to: ${digitalTouristID.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
