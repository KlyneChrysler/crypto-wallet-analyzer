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
export declare function analyzeCryptoWallet(address: string): Promise<CryptoWalletProfile>;
