import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { ADDRS } from "./constants";
import { useState } from "react";

export const MintButton = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [loading, setLoading] = useState(false);

  // devnet for testing; switch endpoint for mainnet when ready
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const metaplex = Metaplex.make(connection).use({
    signTransaction,
    signAllTransactions,
    publicKey,
  } as any);

  const handleMint = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
    setLoading(true);
    try {
      const candyMachine = await metaplex.candyMachinesV2().findByAddress({
        address: ADDRS.candyMachine,
      });

      const { nft } = await metaplex.candyMachinesV2().mint({
        candyMachine,
        collectionUpdateAuthority: candyMachine.authorityAddress,
      });

      alert(`✅ Mint successful: ${nft.name}`);
    } catch (err) {
      console.error(err);
      alert("❌ Mint failed, check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={loading}
      className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow-lg disabled:opacity-50"
    >
      {loading ? "Minting..." : "Mint VAMPU"}
    </button>
  );
};
