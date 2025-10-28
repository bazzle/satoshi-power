# Satoshi-Power V2

## About

Compares the price of a single satoshi with that of the smallest units of each fiat currency. Displays these comparisons in easy to interpret infographics.

## Getting Started

```bash
git clone https://github.com/bazzle/satoshi-power-v2.git
cd satoshi-power
yarn install
yarn dev
```

[Live site](https://satoshi-power.com/)

## What this does currently

1. Pulls BTC/various fiat currency exchange rates from [external API](https://www.blockchain.com/explorer/api/exchange_rates_api)
2. Does various calculations:
  1. Satoshi/fiat exchange
  2. Show sub-unit or main unit depending on what is relevant. If 1 sat is more that the sub-unit, then show main unit comparison
  3. Get the percentage
4. Display results in a cool looking infographic

This is a continuation of [Satoshi-Power-deprecated](https://github.com/bazzle/Satoshi-Power-deprecated) built in nextJS

## Stack

- Next.js
- Blockchain.com Exchange Rates API
- Hosted on Netlify

## API's used

[blockchain.com exchange rates API](https://www.blockchain.com/explorer/api/exchange_rates_api)

## Roadmap

Subject to change

### ✅ Phase 1 – Live data

- Live exchange rates fetch
- UI for satoshi/fiat index showing percentage proportion in price
- Start collecting data from API on a schedule to later show historical price action

### ✅ Phase 2 – Dedicated currency page and exchange tool

- Dedicated page for each fiat currency showing the 1 sat denominated price
- Exchange tool.

### 🔜 Phase 3 – Historical data and chart

- Chart showing the fiat historical price action, using the sat as denominator

### 🔜 Phase 4 – Accessibility and SEO review

- Full accessibility audit and remediations
- SEO audit and optimisations, potentially text content for keywords

### 🔜 Phase 5 – Full historical data

- Pull in historical price data (~5 years) possibly mempool.space
