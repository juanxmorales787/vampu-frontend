import { useCandyMachine } from "../hooks/useCandyMachine";

export const SupplyTicker = () => {
  const { loading, error, stats, refresh } = useCandyMachine(15000);

  if (loading && !stats) {
    return <div className="opacity-80">Loading supply…</div>;
  }
  if (error) {
    return (
      <div className="text-red-300">
        Failed to load supply. <button onClick={refresh} className="underline">Retry</button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <div className="px-4 py-2 rounded-xl bg-white/5">
        <div className="text-xs opacity-70">Minted</div>
        <div className="text-xl font-semibold">{stats?.itemsMinted ?? 0}</div>
      </div>
      <div className="px-4 py-2 rounded-xl bg-white/5">
        <div className="text-xs opacity-70">Remaining</div>
        <div className="text-xl font-semibold">{stats?.itemsRemaining ?? 0}</div>
      </div>
      <div className="px-4 py-2 rounded-xl bg-white/5">
        <div className="text-xs opacity-70">Total</div>
        <div className="text-xl font-semibold">{stats?.itemsAvailable ?? 0}</div>
      </div>
    </div>
  );
};
