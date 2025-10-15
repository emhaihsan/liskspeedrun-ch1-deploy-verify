# Lisk SpeedRun Challenge - Deploy & Verify Smart Contracts

This repository is my submission for the Lisk SpeedRun Challenge 1: Deploy & Verify Your First Contracts.

## Overview

In this challenge, I've deployed and verified ERC20 and ERC721 smart contracts on the Lisk Sepolia testnet. The project demonstrates:

- Compiling and deploying ERC20 token and ERC721 NFT contracts
- Using modern Solidity best practices
- Interacting with contracts through a NextJS frontend
- Verifying contracts on Lisk Blockscout

## My Submission

**Deployed Contracts:**

- ERC20 Token (MyToken): 0x6EbBEc01EC7ec9edcF9103aec2E251325A1c330B
- ERC721 NFT (MyNFT): 0x14636FAAe3a2F34D7e1b6fC0CEd6343FB3473532

## Project Structure

This project is built using Scaffold-Lisk, a fork of Scaffold-OP with additional dApp examples and native support for Superchain testnets.

### Key Features

- ✅ **Contract Hot Reload**: Frontend auto-adapts to smart contract changes
- 🪝 **Custom hooks**: React hooks wrapper around wagmi for simplified smart contract interactions
- 🧱 **Components**: Collection of common web3 components for frontend development
- 🔥 **Burner Wallet & Local Faucet**: For quick testing
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Getting Started

1. Clone this repo & install dependencies

```bash
git clone https://github.com/emhaihsan/liskspeedrun-ch1-deploy-verify.git
cd liskspeedrun-ch1-deploy-verify
yarn install
```

2. Run a local network in the first terminal:

```bash
yarn chain
```

3. On a second terminal, deploy the contracts:

```bash
yarn deploy
```

4. On the same terminal, start your NextJS app:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`

## Deploying to Lisk Sepolia Testnet

1. Set up your environment by copying `.env.example` to `.env` in the packages/hardhat directory

2. Add your private key to the `.env` file:

```
DEPLOYER_PRIVATE_KEY = "your_private_key_with_sepolia_ETH"
```

3. Deploy your contracts to Lisk Sepolia:

```bash
yarn deploy --network liskSepolia
```

4. Verify your contracts:

```bash
yarn hardhat-verify --network liskSepolia --contract contracts/MyToken.sol:MyToken YOUR_TOKEN_ADDRESS
yarn hardhat-verify --network liskSepolia --contract contracts/MyNFT.sol:MyNFT YOUR_NFT_ADDRESS
```

## Challenge Details

This submission is part of the Lisk SpeedRun Challenge, which involves:

1. Creating ERC20 and ERC721 smart contracts
2. Deploying them to Lisk Sepolia testnet
3. Verifying the contracts on Lisk Blockscout
4. Building a frontend that interacts with these contracts

For more information about the challenge, visit [SpeedRunLisk.xyz](https://SpeedRunLisk.xyz).
