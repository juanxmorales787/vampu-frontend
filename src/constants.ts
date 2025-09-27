import { PublicKey } from "@solana/web3.js";

export const ADDRS = {
  tokenMint: null, // paying in SOL
  candyMachine: new PublicKey("8wq37tGtKLZCB5KkXzQXFxzDpTvSejBq1vRbPggWWzma"),
  stakingProgram: null
};

// Set this to the same UTC time as your guard's startDate
export const START_DATE_UTC = "2025-09-23T00:00:00Z";

