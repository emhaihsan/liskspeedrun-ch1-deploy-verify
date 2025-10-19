# Lisk SpeedRun Challenges: Full Stack Web3 Development

This repository contains my submissions for Lisk SpeedRun Challenges 1-4, building a complete Web3 application with smart contracts, frontend, events tracking, oracles, and gasless transactions.

## Challenge Overview

Building progressively through four weeks, I have:

### Week 1: Smart Contract Development

- Created ERC20 token contract (MyToken)
- Created ERC721 NFT contract (MyNFT)
- Deployed contracts to Lisk Sepolia testnet
- Verified contracts on Blockscout

### Week 2: Frontend Integration

- Connected smart contracts to React/Next.js frontend
- Implemented wallet integration using RainbowKit
- Created components to display token balances and NFTs
- Added token transfer and NFT minting functionality

### Week 3: Events & Transaction History

- Added contract events tracking and transaction history
- Implemented filtering between token and NFT events
- Real-time event monitoring with auto-refresh

### Week 4: Oracles & Gasless Transactions

- **NEW**: Integrated RedStone oracle for live price feeds (ETH/BTC)
- **NEW**: Implemented ERC-4337 Account Abstraction with Smart Wallets
- **NEW**: Added gasless NFT minting using thirdweb paymaster
- **NEW**: Built oracle price display component with auto-refresh
- Deployed complete dApp to Vercel

## My Submission

**Deployed Contracts:**

- ERC20 Token (MyToken): `0x6EbBEc01EC7ec9edcF9103aec2E251325A1c330B`
- ERC721 NFT (MyNFT): `0x14636FAAe3a2F34D7e1b6fC0CEd6343FB3473532`
- PriceFeed Oracle (Week 4): `0xe522477aAa26cfE59eA375B6CF3f0327a88f59da`

**Frontend URL:** [https://liskspeedrun-challenges-nextjs.vercel.app/](https://liskspeedrun-challenges-nextjs.vercel.app/)

## Key Features

The application includes multiple pages and components:

### Week 1-2 Components

1. **TokenBalance**: Displays the user's token balance and token information
2. **TokenTransfer**: Allows users to transfer tokens to other addresses
3. **NFTCollection**: Shows NFT collection details and enables minting

### Week 3 Features

4. **Events Page**: Displays contract events and transaction history with filtering

### Week 4 Features (NEW!)

5. **Oracle Page** (`/oracle`): Live cryptocurrency price feeds

   - Real-time ETH/USD and BTC/USD prices from RedStone oracle
   - Auto-refresh every 30 seconds
   - Manual refresh button
   - Formatted price display with timestamps

6. **Gasless Transactions Page** (`/gasless`): ERC-4337 Account Abstraction
   - Smart Wallet creation and connection
   - Gasless NFT minting (100% sponsored by thirdweb paymaster)
   - No gas fees required for users
   - Transaction history on Blockscout

## Technologies Used

### Core Stack

- **Frontend**: React, Next.js 14, TailwindCSS, DaisyUI
- **Web3 Libraries**: Wagmi, RainbowKit, Viem, Ethers.js v5
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Deployment**: Vercel

### Week 4 Additions

- **Oracle Integration**: RedStone Finance (Pull Oracle)
  - `@redstone-finance/evm-connector` - Smart contract integration
  - `@redstone-finance/sdk` - Frontend data fetching
- **Account Abstraction**: thirdweb SDK (ERC-4337)
  - Smart Wallet creation and management
  - Paymaster-sponsored gasless transactions
  - Bundler infrastructure

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

3. Set up environment variables

   Create `packages/nextjs/.env.local`:

   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   ```

   Get your thirdweb Client ID from [thirdweb.com](https://thirdweb.com/dashboard/settings/api-keys)

4. Run the development server

   ```bash
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

### Available Pages

- `/` - Home page with token and NFT components
- `/events` - Contract events and transaction history
- `/oracle` - Live price feeds (ETH/BTC)
- `/gasless` - Gasless NFT minting with Smart Wallets

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

### Events Component (Week 3)

This component displays contract events and transaction history:

```tsx
// Get token transfer events
const { data: tokenEvents, isLoading: tokenLoading } = useScaffoldEventHistory({
  contractName: "MyToken",
  eventName: "Transfer",
  fromBlock: 0n,
  watch: true,
});

// Get NFT transfer events
const { data: nftEvents, isLoading: nftLoading } = useScaffoldEventHistory({
  contractName: "MyNFT",
  eventName: "Transfer",
  fromBlock: 0n,
  watch: true,
});
```

The events page includes:

- Tabs to switch between token and NFT events
- Transaction details including sender, recipient, and amount/token ID
- Links to view transactions on the Lisk Sepolia block explorer
- Real-time updates when new events occur

### PriceDisplay Component (Week 4 - NEW!)

This component fetches and displays live cryptocurrency prices using RedStone oracle:

```tsx
// Create ethers provider and contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(address, abi, provider);

// Wrap contract with RedStone data
const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
  dataServiceId: "redstone-main-demo",
  dataPackagesIds: [symbol], // "ETH" or "BTC"
  uniqueSignersCount: 1,
  authorizedSigners: getSignersForDataServiceId("redstone-main-demo"),
});

// Fetch price from oracle
const priceData = await wrappedContract.getEthPrice();
const formattedPrice = (Number(priceData) / 1e8).toFixed(2);
```

Features:

- Real-time ETH/USD and BTC/USD prices
- Auto-refresh every 30 seconds
- Manual refresh button
- Price formatted with 2 decimal places
- Last update timestamp

### SmartWalletDemo Component (Week 4 - NEW!)

This component enables gasless NFT minting using ERC-4337 Smart Wallets:

```tsx
// Create thirdweb contract instance
const nftContract = getContract({
  client: thirdwebClient,
  chain: liskSepoliaThirdweb,
  address: nftAddress, // Your existing MyNFT contract!
});

// Prepare contract call
const transaction = prepareContractCall({
  contract: nftContract,
  method: "function mint(address to)",
  params: [targetAddress],
});

// Send gasless transaction - paymaster sponsors the gas!
await sendTransaction({ transaction, account });
```

Features:

- Smart Wallet creation (one-time, gasless deployment)
- Gasless NFT minting (100% sponsored by thirdweb)
- Works with existing MyNFT contract (no modifications needed!)
- Real-time balance updates
- Transaction links to Blockscout

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

## Week 4 Architecture

### Oracle Integration (RedStone Pull)

**How it works:**

1. User requests price data from frontend
2. Frontend fetches signed price data from RedStone API
3. Price data is appended to transaction calldata
4. Smart contract verifies signatures and extracts prices
5. Price displayed to user

**Key Benefits:**

- ✅ No on-chain oracle deployment needed
- ✅ Lower gas costs (data in calldata, not storage)
- ✅ Wide variety of price feeds available
- ✅ Cryptographically signed data ensures security

**Why Ethers.js + Viem Hybrid?**

- RedStone's `WrapperBuilder` requires ethers.js contracts
- Rest of the app uses viem for better TypeScript support
- Both can coexist by accessing the same `window.ethereum` provider

### Account Abstraction (ERC-4337)

**Architecture Flow:**

```
User → Signs UserOperation → thirdweb Bundler → Paymaster Sponsors Gas → EntryPoint Contract → Your Smart Contract
```

**Key Components:**

- **Smart Wallet**: User's programmable account (deployed as smart contract)
- **UserOperation**: Like a transaction, but more flexible
- **Bundler**: Packages UserOps and submits them on-chain (thirdweb)
- **Paymaster**: Sponsors gas fees for users (thirdweb)
- **EntryPoint**: Singleton contract that validates and executes UserOps

**Why This Approach?**

- ✅ Works with existing contracts (no modifications needed!)
- ✅ Production-ready infrastructure (thirdweb)
- ✅ Better UX (users don't need ETH for gas)
- ✅ Advanced features (batch transactions, session keys, social recovery)

**Contract Compatibility:**
Your existing `MyToken` and `MyNFT` contracts from Week 1 work perfectly with gasless transactions! No ERC2771 context, no trusted forwarders, no special imports needed. Just use `msg.sender` as normal.

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

### Week 4: Dual Chain Configuration

For Week 4, we added thirdweb's chain configuration alongside wagmi:

```typescript
// chains.ts - thirdweb configuration
export const liskSepoliaThirdweb = defineChain({
  id: 4202,
  name: "Lisk Sepolia",
  rpc: "https://rpc.sepolia-api.lisk.com",
  // ... other config
});

// Used specifically for Smart Wallet and gasless transactions
```

## What I Learned

### Week 1-2: Foundation

- Smart contract development with Solidity
- ERC20 and ERC721 token standards
- Frontend integration with wagmi and viem
- Wallet connection with RainbowKit

### Week 3: Events & History

- Reading on-chain events with `useScaffoldEventHistory`
- Real-time event monitoring
- Transaction history display

### Week 4: Advanced Features

- **Oracle Integration**: Bringing real-world data on-chain securely
- **Account Abstraction**: Modern approach to gasless transactions
- **Smart Wallets**: Programmable accounts for better UX
- **Paymaster Infrastructure**: Production-ready sponsored transactions
- **Hybrid Library Approach**: Using ethers.js + viem together
- **ERC-4337 Standard**: Understanding UserOperations, bundlers, and paymasters

## Deployment

### Smart Contracts (Lisk Sepolia)

All contracts are deployed and verified on Lisk Sepolia testnet:

- View on [Lisk Sepolia Blockscout](https://sepolia-blockscout.lisk.com)
- Verified source code available for transparency

### Frontend (Vercel)

- Deployed on Vercel with automatic deployments from main branch
- Environment variables configured for thirdweb integration
- Optimized build with Next.js 14

### Configuration Files

Key configuration files for deployment:

- `.yarnrc.yml` - Yarn 3 configuration with log filters for CI/CD
- `package.json` - Resolutions for peer dependency compatibility
- `.eslintrc.json` - ESLint rules with disabled strict checks for rapid development
- `.env.local` - Environment variables (thirdweb Client ID)

## Acknowledgments

Built as part of the [Lisk SpeedRun Challenges](https://lisk.com) - a comprehensive Web3 development learning path.

**Technologies & Services:**

- [Scaffold-ETH 2](https://scaffoldeth.io) - Full-stack Ethereum development framework
- [RedStone Finance](https://redstone.finance) - Decentralized oracle network
- [thirdweb](https://thirdweb.com) - Web3 development platform with ERC-4337 infrastructure
- [Lisk](https://lisk.com) - Ethereum L2 blockchain
- [Vercel](https://vercel.com) - Frontend deployment platform

## License

MIT
