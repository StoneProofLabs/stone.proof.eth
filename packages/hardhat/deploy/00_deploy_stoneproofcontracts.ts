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
  });
  await logGasUsed("RolesManager", rolesManager);

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
    log: true,
    autoMine: true,
  });
  await logGasUsed("Tokenization", tokenization);

  console.log("Deploying DisputeResolution...");
  const disputeResolution = await deploy("DisputeResolution", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  await logGasUsed("DisputeResolution", disputeResolution);

  console.log("Deploying MineralTransporter...");
  const mineralTransporter = await deploy("MineralTransporter", {
    from: deployer,
    args: [
      /*rolesManager.address,
      mineralRegistry.address,
      transactionLog.address,
      tokenization.address,*/
    ],
    log: true,
    autoMine: true,
  });
  await logGasUsed("MineralTransporter", mineralTransporter);

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
  });
  await logGasUsed("SupplychainValidator", supplychainValidator);

  console.log("🚀 Deployment complete!");
};

export default deployMineralSystem;
deployMineralSystem.tags = ["MineralSystem"];
