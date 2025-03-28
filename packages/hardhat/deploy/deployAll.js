const { ethers } = require("hardhat");

const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("----------------------------------------");
    console.log("----------------------------------------");
     
    // keep track of gas used 
    const logGasUsed = async (contractName, contractInstance) => {
        const tx = contractInstance.deployTransaction; 
        const receipt = await tx.wait();
        console.log(`${contractName} contract deployed at: ${contractInstance.address}`);
        console.log(`Gas used for ${contractName}: ${receipt.gasUsed.toString()}`);
        console.log("///////////////////////////////////////////////////////////////////");
        console.log("///////////////////////////////////////////////////////////////////");
    };

    // Deploy RolesManager contract
    const RolesManager = await ethers.getContractFactory("RolesManager");
    console.log("Deploying RolesManager contract...");
    console.log("=========================================================================");
    const rolesManager = await RolesManager.deploy();
    await logGasUsed("RolesManager", rolesManager);


    // Deploy TransactionLog contract
    const TransactionLog = await ethers.getContractFactory("TransactionLog");
    console.log("Deploying TransactionLog contract...");
    console.log("=========================================================================");
    const transactionLog = await TransactionLog.deploy();
    await logGasUsed("TransactionLog", transactionLog);

    // Deploy MineralRegistry contract
    const MineralRegistry = await ethers.getContractFactory("MineralRegistry");
    console.log("Deploying MineralRegistry contract...");
    console.log("=========================================================================");
    const mineralRegistry = await MineralRegistry.deploy(rolesManager.address);
    await logGasUsed("MineralRegistry", mineralRegistry);

    // Deploy PrivacyGuard contract
    const PrivacyGuard = await ethers.getContractFactory("PrivacyGuard");
    console.log("Deploying PrivacyGuard contract...");
    console.log("=========================================================================");
    const privacyGuard = await PrivacyGuard.deploy();
    await logGasUsed("PrivacyGuard", privacyGuard);

    // Deploy Tokenization contract
    const Tokenization = await ethers.getContractFactory("Tokenization");
    console.log("Deploying Tokenization contract...");
    console.log("=========================================================================");
    const tokenization = await Tokenization.deploy();
    await logGasUsed("Tokenization", tokenization);

    // Deploy DisputeResolution contract
    const DisputeResolution = await ethers.getContractFactory("DisputeResolution");
    console.log("Deploying DisputeResolution contract...");
    console.log("=========================================================================");
    const disputeResolution = await DisputeResolution.deploy(transactionLog.address);
    await logGasUsed("DisputeResolution", disputeResolution);

    // Deploy MineralTransporter contract
    const MineralTransporter = await ethers.getContractFactory("MineralTransporter");
    console.log("Deploying MineralTransporter contract...");
    console.log("=========================================================================");
    const mineralTransporter = await MineralTransporter.deploy(
        rolesManager.address,
        mineralRegistry.address,
        transactionLog.address,
        tokenization.address
    );
    await logGasUsed("MineralTransporter", mineralTransporter);

    // Deploy SupplychainValidator contract
    const SupplychainValidator = await ethers.getContractFactory("SupplychainValidator");
    console.log("Deploying SupplychainValidator contract...");
    console.log("=========================================================================");
    const supplychainValidator = await SupplychainValidator.deploy(
        rolesManager.address,
        mineralRegistry.address,
        privacyGuard.address,
        tokenization.address,
        transactionLog.address,
        mineralTransporter.address,
        disputeResolution.address
    );
    await logGasUsed("SupplychainValidator", supplychainValidator);

    // Log all deployed contract addresses
    console.log("=========================================================================");
    console.log("=========================================================================");
    console.log("=========================================================================");
    
    console.log("RolesManager contract deployed at: ", rolesManager.address);
    console.log("=========================================================================");

    console.log("TransactionLog contract deployed at: ", transactionLog.address);
    console.log("=========================================================================");

    console.log("MineralRegistry contract deployed at: ", mineralRegistry.address);
    console.log("=========================================================================");

    console.log("PrivacyGuard contract deployed at: ", privacyGuard.address);
    console.log("=========================================================================");

    console.log("Tokenization contract deployed at: ", tokenization.address);
    console.log("=========================================================================");

    console.log("MineralTransporter contract deployed at: ", mineralTransporter.address);
    console.log("=========================================================================");

    console.log("DisputeResolution contract deployed at: ", disputeResolution.address);
    console.log("=========================================================================");

    console.log("SupplychainValidator contract deployed at: ", supplychainValidator.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.error("ERROR occurred while deploying contracts!!", err);
        process.exit(1);
    }
};

runMain();
