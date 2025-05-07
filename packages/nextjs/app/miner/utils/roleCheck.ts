import { ethers } from "ethers";
import { getContract } from "~~/utils/getContract";

export const checkMinerRole = async (address: string): Promise<boolean> => {
  const rolesManager = await getContract("RolesManager");

  try {
    // eslint-disable-next-line prettier/prettier
    const MINER_ROLE = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("MINER_ROLE")
    );
    return await rolesManager.hasRole(MINER_ROLE, address);
  } catch (error) {
    console.error("Error checking miner role:", error);
    return false;
  }
};
