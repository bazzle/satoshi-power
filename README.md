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

### ✅ v1.0.0 Initial stable release

* Show live conversions from exchange rates API

### v2.0.0 Historical data

* Github action to pull in conversion data once weekly and trigger a commit into data submodule repo, then redeploy the app
* UI range slider/date picker on the homepage. To allow users to see historical data snapshots.
* Infographics/charts for each currency. Showing devaluation over time against satoshi's.