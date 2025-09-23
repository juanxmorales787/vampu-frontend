import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { MintButton } from "./MintButton";
import { Countdown } from "./components/Countdown";
import { SupplyTicker } from "./components/SupplyTicker";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-6 px-6">
      <h1 className="text-4xl">🐱 VAMPU NFT Mint</h1>
      <Countdown />
      <SupplyTicker />
      <WalletMultiButton />
      <MintButton />
      <p className="text-xs opacity-60 mt-6">
        Tip: set your wallet to <b>Devnet</b> while testing.
      </p>
    </div>
  );
}
