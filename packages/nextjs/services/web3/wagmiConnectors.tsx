import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import * as chains from "viem/chains";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import scaffoldConfig from "~~/scaffold.config";
import { burnerWalletConfig } from "~~/services/web3/wagmi-burner/burnerWalletConfig";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();
const { onlyLocalBurnerWallet } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
const enabledChains = targetNetworks.find(network => network.id === 1)
  ? targetNetworks
  : [...targetNetworks, chains.mainnet];

/**
 * Chains for the app
 */
export const appChains = configureChains(
  enabledChains,
  [
    jsonRpcProvider({
      rpc: chain => {
        // Use custom RPC for Lisk Sepolia if available
        if (chain.id === 4202 && process.env.NEXT_PUBLIC_LISK_SEPOLIA_RPC) {
          return { http: process.env.NEXT_PUBLIC_LISK_SEPOLIA_RPC };
        }
        return null;
      },
    }),
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
    }),
    publicProvider(),
  ],
  {
    // We might not need this checkout https://github.com/scaffold-eth/scaffold-eth-2/pull/45#discussion_r1024496359, will test and remove this before merging
    stallTimeout: 3_000,
    // Sets pollingInterval if using chains other than local hardhat chain
    ...(targetNetworks.find(network => network.id !== chains.hardhat.id)
      ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
      : {}),
  },
);

const walletsOptions = { chains: appChains.chains, projectId: scaffoldConfig.walletConnectProjectId };
const wallets = [
  metaMaskWallet({ ...walletsOptions, shimDisconnect: true }),
  walletConnectWallet(walletsOptions),
  ledgerWallet(walletsOptions),
  braveWallet(walletsOptions),
  coinbaseWallet({ ...walletsOptions, appName: "scaffold-eth-2" }),
  rainbowWallet(walletsOptions),
  ...(!targetNetworks.some(network => network.id !== chains.hardhat.id) || !onlyLocalBurnerWallet
    ? [
        burnerWalletConfig({
          chains: appChains.chains.filter(chain => targetNetworks.map(({ id }) => id).includes(chain.id)),
        }),
      ]
    : []),
  safeWallet({ ...walletsOptions }),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets,
  },
]);
