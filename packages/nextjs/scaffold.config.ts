import RolesManager  from "../hardhat/artifacts/contracts/core/RolesManager.sol/RolesManager.json";
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  contracts: {
    RolesManager: {
      address: string;
      abi: any;
    };
  };
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [
    chains.hardhat,
    chains.mainnet,
    chains.sepolia,
    chains.polygon, // Polygon network
    chains.optimism,// Optimism network
    chains.arbitrum,// Arbitrum network
    chains.base,
    chains.shape,
    chains.zora,
    chains.flare,
    chains.lisk,

    chains.shapeSepolia,
    chains.baseSepolia,
    chains.zoraSepolia,
    chains.arbitrumSepolia,
    chains.polygonMumbai,
    chains.polygonZkEvm,
    chains.polygonZkEvmTestnet,
    chains.flareTestnet,
    chains.liskSepolia,
  ],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,

  contracts: {
    RolesManager: {
      address: "0x5fbdb2315678afecb367f032d93f642f64180aa3", // Replace with your actual contract address
      abi: RolesManager.abi, // Make sure this is imported correctly
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
