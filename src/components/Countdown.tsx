import { useEffect, useMemo, useState } from "react";
import { START_DATE_UTC } from "../constants";

function formatDelta(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}

export const Countdown = () => {
  const start = useMemo(() => new Date(START_DATE_UTC).getTime(), []);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const live = now >= start;
  const delta = start - now;

  return (
    <div className="text-center">
      {!live ? (
        <>
          <div className="text-sm opacity-80">Mint opens (UTC): {START_DATE_UTC}</div>
          <div className="text-2xl font-semibold">{formatDelta(delta)}</div>
          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-xs">
            Status: Coming Soon
          </div>
        </>
      ) : (
        <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm">
          Status: Live
        </div>
      )}
    </div>
  );
};
