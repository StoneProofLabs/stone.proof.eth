import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployMineralSystem: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };

  console.log("Deploying RolesManager...");
  const rolesManager = await deploy("RolesManager", {
    from: deployer,
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("RolesManager", rolesManager);

  console.log("Deploying TransactionLog...");
  const transactionLog = await deploy("TransactionLog", {
    from: deployer,
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("TransactionLog", transactionLog);

  console.log("Deploying MineralRegistry...");
  const mineralRegistry = await deploy("MineralRegistry", {
    from: deployer,
    args: [rolesManager.address],
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("MineralRegistry", mineralRegistry);

  console.log("Deploying PrivacyGuard...");
  const privacyGuard = await deploy("PrivacyGuard", {
    from: deployer,
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("PrivacyGuard", privacyGuard);

  console.log("Deploying Tokenization...");
  const tokenization = await deploy("Tokenization", {
    from: deployer,
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("Tokenization", tokenization);

  console.log("Deploying DisputeResolution...");
  const disputeResolution = await deploy("DisputeResolution", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("DisputeResolution", disputeResolution);

  console.log("Deploying LogisticsManager...");
  const logisticsManager = await deploy("LogisticsManager", {
    from: deployer,
    args: [
      /*rolesManager.address,
      mineralRegistry.address,
      transactionLog.address,
      tokenization.address,*/
    ],
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("LogisticsManager", logisticsManager);

  console.log("Deploying SupplychainValidator...");
  const supplychainValidator = await deploy("SupplychainValidator", {
    from: deployer,
    args: [
      rolesManager.address,
      mineralRegistry.address,
      privacyGuard.address,
      tokenization.address,
      transactionLog.address,
      /*mineralTransporter.address,*/
      disputeResolution.address,
    ],
    log: true,
    autoMine: true,
    gasLimit: 6000000,
  });
  await logGasUsed("SupplychainValidator", supplychainValidator);

  console.log("🚀 Deployment complete!");
};

export default deployMineralSystem;
deployMineralSystem.tags = ["MineralSystem"];









/*

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployMineralSystem: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };

  // 1. First deploy RolesManager with increased gas limit
  console.log("Deploying RolesManager...");
  const rolesManager = await deploy("RolesManager", {
    from: deployer,
    log: true,
    autoMine: true,
    gasLimit: 6000000, // Increased gas limit
  });
  await logGasUsed("RolesManager", rolesManager);

  // 2. Initialize roles after deployment
  const rolesManagerContract = await ethers.getContractAt("RolesManager", rolesManager.address);
  
  // Grant all roles to deployer initially (optional)
  console.log("Setting up initial roles...");
  const tx1 = await rolesManagerContract.assignMiner(deployer);
  await tx1.wait();
  const tx2 = await rolesManagerContract.assignRefiner(deployer);
  await tx2.wait();
  const tx3 = await rolesManagerContract.assignTransporter(deployer);
  await tx3.wait();
  const tx4 = await rolesManagerContract.assignAuditor(deployer);
  await tx4.wait();
  const tx5 = await rolesManagerContract.assignInspector(deployer);
  await tx5.wait();
  const tx6 = await rolesManagerContract.assignBuyer(deployer);
  await tx6.wait();
  console.log("All roles assigned to deployer");

  // 3. Deploy other contracts with proper dependencies
  console.log("Deploying TransactionLog...");
  const transactionLog = await deploy("TransactionLog", {
    from: deployer,
    log: true,
    autoMine: true,
  });
  await logGasUsed("TransactionLog", transactionLog);

  console.log("Deploying MineralRegistry...");
  const mineralRegistry = await deploy("MineralRegistry", {
    from: deployer,
    args: [rolesManager.address],
    log: true,
    autoMine: true,
    gasLimit: 5000000, // Adjusted gas limit
  });
  await logGasUsed("MineralRegistry", mineralRegistry);

  console.log("Deploying PrivacyGuard...");
  const privacyGuard = await deploy("PrivacyGuard", {
    from: deployer,
    log: true,
    autoMine: true,
  });
  await logGasUsed("PrivacyGuard", privacyGuard);

  console.log("Deploying Tokenization...");
  const tokenization = await deploy("Tokenization", {
    from: deployer,
    args: [rolesManager.address], // Added roles manager as dependency
    log: true,
    autoMine: true,
    gasLimit: 5000000, // Adjusted gas limit
  });
  await logGasUsed("Tokenization", tokenization);

  console.log("Deploying DisputeResolution...");
  const disputeResolution = await deploy("DisputeResolution", {
    from: deployer,
    args: [rolesManager.address], // Added roles manager as dependency
    log: true,
    autoMine: true,
  });
  await logGasUsed("DisputeResolution", disputeResolution);

  console.log("Deploying LogisticsManager...");
  const logisticsManager = await deploy("LogisticsManager", {
    from: deployer,
    args: [
      rolesManager.address,
      mineralRegistry.address,
      transactionLog.address,
      tokenization.address
    ], // Uncommented and added dependencies
    log: true,
    autoMine: true,
    gasLimit: 6000000, // Increased gas limit
  });
  await logGasUsed("LogisticsManager", logisticsManager);

  console.log("Deploying SupplychainValidator...");
  const supplychainValidator = await deploy("SupplychainValidator", {
    from: deployer,
    args: [
      rolesManager.address,
      mineralRegistry.address,
      privacyGuard.address,
      tokenization.address,
      transactionLog.address,
      disputeResolution.address,
    ],
    log: true,
    autoMine: true,
    gasLimit: 6000000, // Increased gas limit
  });
  await logGasUsed("SupplychainValidator", supplychainValidator);

  console.log("🚀 Deployment complete!");
};

export default deployMineralSystem;
deployMineralSystem.tags = ["MineralSystem"];

*/