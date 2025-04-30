import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployMineralWarehouse: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };


  console.log("Deploying MineralWarehouse...");
  const mineralWarehouse = await deploy("MineralWarehouse", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  await logGasUsed("MineralWarehouse", mineralWarehouse);

console.log("🚀 Deployment complete!");
};

export default deployMineralWarehouse;
deployMineralWarehouse.tags = ["MineralWarehouse"];
