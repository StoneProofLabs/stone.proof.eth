import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployLogisticsManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };

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
  });
  await logGasUsed("LogisticsManager", logisticsManager);



console.log("🚀 Deployment complete!");
};

export default deployLogisticsManager;
deployLogisticsManager.tags = ["LogisticsManager"];
