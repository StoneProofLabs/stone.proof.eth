// packages/hardhat/scripts/verifyAdmin.js
const hre = require("hardhat");

async function main() {
  const ROLES_MANAGER_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
  const DEPLOYER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  // 1. Verify contract exists
  const code = await hre.ethers.provider.getCode(ROLES_MANAGER_ADDRESS);
  console.log(`Contract code exists: ${code !== "0x"}`);

  // 2. Get contract instance
  const rolesManager = await hre.ethers.getContractAt(
    "RolesManager",
    ROLES_MANAGER_ADDRESS
  );

  // 3. Check DEFAULT_ADMIN_ROLE (bytes32(0))
  const DEFAULT_ADMIN_ROLE = hre.ethers.ZeroHash;
  const isAdmin = await rolesManager.hasRole(DEFAULT_ADMIN_ROLE, DEPLOYER_ADDRESS);
  console.log(`Is deployer admin: ${isAdmin}`);

  // 4. Check all roles for deployer
  console.log("\nAll roles for deployer:");
  const roles = await rolesManager.getRolesForAddress(DEPLOYER_ADDRESS);
  console.log(roles);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});