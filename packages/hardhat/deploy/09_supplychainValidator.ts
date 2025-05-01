import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { MineralWarehouse__factory } from "../typechain-types";

const deploySupplyChainValidator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };





console.log("Deploying SupplychainValidator...");
const supplychainValidator = await deploy("SupplychainValidator", {
  from: deployer,
  args: [
    rolesManager.address,
    mineralRegistry.address,
    mineralWarehouse.adddress,
    logisticsManager.address,
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

export default deploySupplyChainValidator;
deploySupplyChainValidator.tags = ["SupplyChainValidator"];