# Lisk SpeedRun Challenge 2: Connect Your Contracts to Frontend

This repository is my submission for Lisk SpeedRun Challenge 2, where I connected my ERC20 and ERC721 smart contracts from Week 1 to a React/Next.js frontend with wallet integration.

## Challenge Overview

In this challenge, I have:

- Connected my Week 1 smart contracts to a React/Next.js frontend
- Implemented wallet integration (using Rabby Wallet)
- Created components to display token balances and NFTs
- Added token transfer and NFT minting functionality
- Deployed the frontend to Vercel

## My Submission

**Deployed Contracts:**

- ERC20 Token (MyToken): `0x6EbBEc01EC7ec9edcF9103aec2E251325A1c330B`
- ERC721 NFT (MyNFT): `0x14636FAAe3a2F34D7e1b6fC0CEd6343FB3473532`

**Frontend URL:** [https://liskspeedrun-challenges-nextjs.vercel.app/](https://liskspeedrun-challenges-nextjs.vercel.app/)

## Key Features

The application has three main components:

1. **TokenBalance**: Displays the user's token balance and token information
2. **TokenTransfer**: Allows users to transfer tokens to other addresses
3. **NFTCollection**: Shows NFT collection details and enables minting

## Technologies Used

- **Frontend**: React, Next.js, TailwindCSS
- **Web3**: Wagmi, RainbowKit, Viem
- **Smart Contract**: Solidity (from Week 1)
- **Deployment**: Vercel

## How to Run the Project Locally

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/lisk-speedrun-challenge.git
   cd lisk-speedrun-challenge
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Run the development server

   ```bash
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Component Structure

### TokenBalance Component

This component displays the user's token balance and token metadata (name and symbol):

```tsx
const { data: tokenBalance } = useScaffoldContractRead({
  contractName: "MyToken",
  functionName: "balanceOf",
  args: [connectedAddress],
});

// Display balance in a readable format
{
  tokenBalance ? (Number(tokenBalance) / 1e18).toFixed(4) : "0.0000";
}
```

### TokenTransfer Component

This component allows users to transfer tokens to other addresses:

```tsx
const { writeAsync: writeMyTokenAsync } = useScaffoldContractWrite({
  contractName: "MyToken",
  functionName: "transfer",
});

// Send transaction
await writeMyTokenAsync({
  args: [recipient, parseEther(amount)],
});
```

### NFTCollection Component

This component displays NFT collection information and enables minting:

```tsx
const { data: totalSupply } = useScaffoldContractRead({
  contractName: "MyNFT",
  functionName: "totalSupply",
});

const { writeAsync: writeMyNFTAsync } = useScaffoldContractWrite({
  contractName: "MyNFT",
  functionName: "mint",
});
```

## Performance Optimizations

The components implement several performance optimizations:

- **Minimize Re-renders**:

  ```tsx
  // ✅ Good: Specific hooks for each data point
  const { data: tokenName } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "name",
  });
  ```

- **Handle Loading States**:
  ```tsx
  if (isLoading) return <div className="loading loading-spinner"></div>;
  ```

## Network Configuration

The application is configured to connect directly to Lisk Sepolia when first loaded:

```typescript
// scaffold.config.ts
const scaffoldConfig = {
  targetNetwork: liskSepolia,
  targetNetworks: [liskSepolia],
};

// wagmi-config.tsx
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
  initialChain: liskSepolia,
});
```
