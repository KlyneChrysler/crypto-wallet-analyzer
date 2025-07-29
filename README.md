# crypto-wallet-analyst

[![npm version](https://img.shields.io/npm/v/wallet-analyzer)](https://www.npmjs.com/package/wallet-analyzer)
[![build](https://img.shields.io/github/actions/workflow/status/KlyneChrysler/wallet-analyzer/build.yml?branch=main)](https://github.com/KlyneChrysler/wallet-analyzer/actions)
[![license](https://img.shields.io/npm/l/wallet-analyzer)](LICENSE)
[![typescript](https://img.shields.io/badge/built%20with-typescript-blue)](tsconfig.json)
[![issues](https://img.shields.io/github/issues/KlyneChrysler/wallet-analyzer)](https://github.com/KlyneChrysler/wallet-analyzer/issues)

# What is this?

Analyze Bitcoin and Ethereum wallet activity, balances, and transaction history.

# What it can do:

- Analyzes any BTC or ETH address
- Returns balance, transaction stats, USD value, and activity scores
- Useful for detecting inactive or risky wallets
- Built in pure TypeScript
- No external packages or blockchain SDKs

# How to set up:

npm install crypto-wallet-analyzer

# How to use:

import { analyzeCryptoWallet } from 'wallet-analyzer';

const profile = await analyzeCryptoWallet("bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080");

console.log(profile);

{
network: 'bitcoin',
address: 'bc1qw...',
balance: 0.54,
usdValue: 17890.23,
firstTransaction: '2017-10-19T02:11:45Z',
txCount: 14,
activityScore: 50,
riskScore: 5
}

# What types?

type Network = 'bitcoin' | 'ethereum';

interface CryptoWalletProfile {
network: Network;
address: string;
balance: number;
usdValue: number;
firstTransaction: string;
txCount: number;
activityScore: number; // 0–100
riskScore: number; // 0–100
}
