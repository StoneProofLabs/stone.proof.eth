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
      address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
      abi: MineralWarehouse.abi,
    },
    LogisticsManager: {
      address: "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
      abi: LogisticsManager.abi,
    },
    MineralRegistry: {
      address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
      abi: MineralRegistry.abi,
    },
    SuplychainValidator: {
      address: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
      abi: SupplychainValidator.abi,
    },
    TransactionLog: {
      address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
      abi: TransactionLog.abi,
    },
    DisputeResolution: {
      address: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
      abi: DisputeResolution.abi,
    },
    PrivacyGuard: {
      address: "0x9A676e781A523b5d0C0e43731313A708CB607508",
      abi: PrivacyGuard.abi,
    },
    Tokenization: {
      address: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
      abi: Tokenization.abi,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
