export type Network = "bitcoin" | "ethereum";

export interface CryptoWalletProfile {
  network: Network;
  address: string;
  balance: number;
  usdValue: number;
  firstTransaction: string;
  txCount: number;
  activityScore: number;
  riskScore: number;
}

export async function analyzeCryptoWallet(
  address: string
): Promise<CryptoWalletProfile> {
  const network = detectNetwork(address);
  if (network === "bitcoin") {
    return await analyzeBitcoinWallet(address);
  } else if (network === "ethereum") {
    return await analyzeEthereumWallet(address);
  } else {
    throw new Error("Unsupported network or invalid address");
  }
}

function detectNetwork(address: string): Network {
  if (/^(1|3|bc1)[a-zA-Z0-9]{25,39}$/.test(address)) return "bitcoin";
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) return "ethereum";
  throw new Error("Unknown address format");
}

async function analyzeBitcoinWallet(
  address: string
): Promise<CryptoWalletProfile> {
  const res = await fetch(`https://blockchain.info/rawaddr/${address}`);
  const data = await res.json();
  const balanceBTC = data.final_balance / 1e8;
  const txCount = data.n_tx;
  const firstTx = new Date(data.txs.at(-1)?.time * 1000).toISOString();
  return {
    network: "bitcoin",
    address,
    balance: balanceBTC,
    usdValue: await convertBTCtoUSD(balanceBTC),
    firstTransaction: firstTx,
    txCount,
    activityScore: Math.min(100, txCount / 5),
    riskScore: 5,
  };
}

async function convertBTCtoUSD(btc: number): Promise<number> {
  const res = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
  );
  const price = (await res.json()).bpi.USD.rate_float;
  return parseFloat((btc * price).toFixed(2));
}

// ethereum
async function analyzeEthereumWallet(
  address: string
): Promise<CryptoWalletProfile> {
  throw new Error("Ethereum analysis not yet implemented");
}
