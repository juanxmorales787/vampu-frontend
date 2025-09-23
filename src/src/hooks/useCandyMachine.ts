import { useEffect, useMemo, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { ADDRS } from "../constants";

export function useCandyMachine(pollMs = 15000) {
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet"), "confirmed"), []);
  const metaplex = useMemo(() => Metaplex.make(connection), [connection]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    itemsAvailable: number;
    itemsMinted: number;
    itemsRemaining: number;
    symbol?: string;
  } | null>(null);

  async function fetchState() {
    try {
      setError(null);
      const cm = await metaplex.candyMachinesV2().findByAddress({ address: ADDRS.candyMachine });
      const itemsAvailable = Number(cm.itemsAvailable);
      const itemsMinted = Number(cm.itemsMinted);
      const itemsRemaining = Number(cm.itemsRemaining);
      setStats({ itemsAvailable, itemsMinted, itemsRemaining, symbol: cm.symbol });
    } catch (e: any) {
      console.error("fetch CM error:", e);
      setError(e?.message ?? "Failed to load Candy Machine");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, pollMs);
    return () => clearInterval(id);
  }, [pollMs]);

  return { loading, error, stats, refresh: fetchState };
}
