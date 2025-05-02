import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployMineralRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const logGasUsed = async (contractName: string, deploymentResult: any) => {
    const receipt = await ethers.provider.getTransactionReceipt(deploymentResult.transactionHash);
    console.log(`${contractName} contract deployed at: ${deploymentResult.address}`);
    console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
    console.log("///////////////////////////////////////////////////////////////////");
  };


  console.log("Deploying MineralRegistry...");
  const mineralRegistry = await deploy("MineralRegistry", {
    from: deployer,
    args: ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
    log: true,
    autoMine: true,
  });
  await logGasUsed("MineralRegistry", mineralRegistry);


console.log("🚀 Deployment complete!");
};

export default deployMineralRegistry;
deployMineralRegistry.tags = ["MineralRegistry"];
