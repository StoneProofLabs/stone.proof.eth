import PrivacyGuard from "../hardhat/artifacts/contracts/core/PrivacyGuard.sol/PrivacyGuard.json";
import RolesManager from "../hardhat/artifacts/contracts/core/RolesManager.sol/RolesManager.json";
import SupplychainValidator from "../hardhat/artifacts/contracts/core/SupplychainValidator.sol/SupplychainValidator.json";
import DisputeResolution from "../hardhat/artifacts/contracts/governance/DisputeResolution.sol/DisputeResolution.json";
import TransactionLog from "../hardhat/artifacts/contracts/logs/TransactionLog.sol/TransactionLog.json";
import LogisticsManager from "../hardhat/artifacts/contracts/modules/LogisticsManager.sol/LogisticsManager.json";
import MineralRegistry from "../hardhat/artifacts/contracts/modules/MineralRegistry.sol/MineralRegistry.json";
import MineralWarehouse from "../hardhat/artifacts/contracts/modules/MineralWarehouse.sol/MineralWarehouse.json";
import Tokenization from "../hardhat/artifacts/contracts/tokens/Tokenization.sol/Tokenization.json";
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
    MineralWarehouse: {
      address: string;
      abi: any;
    };
    DisputeResolution: {
      adddress: string;
      abi: any;
    };
    LogisticsManager: {
      adddress: string;
      abi: any;
    };
    TransactionLog: {
      adddress: string;
      abi: any;
    };
    MineralRegistry: {
      adddress: string;
      abi: any;
    };
    PrivacyGuard: {
      adddress: string;
      abi: any;
    };
    Tokenization: {
      address: string;
      abi: any;
    };
    SupplychainValidator: {
      adddress: string;
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
    chains.polygon,
    chains.optimism,
    chains.arbitrum,
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
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: RolesManager.abi,
    },
    MineralWarehouse: {
      address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
      abi: MineralWarehouse.abi,
    },
    LogisticsManager: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      abi: LogisticsManager.abi,
    },
    MineralRegistry: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: MineralRegistry.abi,
    },
    SuplychainValidator: {
      address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
      abi: SupplychainValidator.abi,
    },
    TransactionLog: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: TransactionLog.abi,
    },
    DisputeResolution: {
      address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      abi: DisputeResolution.abi,
    },
    PrivacyGuard: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: PrivacyGuard.abi,
    },
    Tokenization: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      abi: Tokenization.abi,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
