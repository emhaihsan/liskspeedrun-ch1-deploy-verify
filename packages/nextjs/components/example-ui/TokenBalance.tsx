"use client";

import { useAccount } from "wagmi";
// state wallet connection
import { Address } from "~~/components/scaffold-eth";
// prebuilt components
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// contract reading hook

export const TokenBalance = () => {
  // 1. Get connected wallet address
  const { address: connectedAddress } = useAccount();

  // 2. Read token balance for connected address
  const { data: tokenBalance, isLoading: balanceLoading } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "balanceOf",
    args: [connectedAddress as `0x${string}`], // Pass user's address as argument
  });

  // 3. Read token metadata (name & symbol)
  const { data: tokenSymbol } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "symbol",
  });

  const { data: tokenName } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "name",
  });

  if (balanceLoading) return <div className="loading loading-spinner"></div>;

  if (!connectedAddress) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Token Balance</h2>
          <p>Please connect your wallet to view token balance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {tokenName} ({tokenSymbol})
        </h2>
        <div className="stats">
          <div className="stat">
            <div className="stat-title">Your Balance</div>
            <div className="stat-value text-white">
              {tokenBalance ? (Number(tokenBalance) / 1e18).toFixed(4) : "0.0000"}
            </div>
            <div className="stat-desc">{tokenSymbol}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};
