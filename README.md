# Satoshi-Power

## About

### Overview

Compares the price of a single satoshi with that of the smallest units of each fiat currency. Displays these comparisons in easy to interpret infographics.

[Live site](https://satoshi-power.com/)

This is follows from [Satoshi-Power-deprecated](https://github.com/bazzle/Satoshi-Power-deprecated) built in next.js

### Stack

- Next.js
- Blockchain.com Exchange Rates API
- Hosted on Netlify

### API's used

[blockchain.com exchange rates API](https://www.blockchain.com/explorer/api/exchange_rates_api)

### Getting Started

```bash
git clone https://github.com/bazzle/satoshi-power-v2.git
yarn install
yarn dev
```

## Roadmap

### Phase 1 ✅ Satoshi to smallest unit conversion & data snapshots

#### Data

1. Pulls BTC/various fiat currency exchange rates from [external API](https://www.blockchain.com/explorer/api/exchange_rates_api)
2. Saves the data into iterable array of objects, adding new values, removing ones that aren't needed.
3. Automated snapshots once a week, github action to fetch exchange rates. Saves into a json.
4. Undecided exactly what I'll do with this data, after a number of weeks.

#### UI

* Present percentages on the homepage index view of all currencies smallest units / satoshi
* Skull icons to show if the unit is "killed" or the value of one sat has exceeded that unit. If smallest unit killed, one skull, if main unit killed two skulls.

### Phase 2 ✅ Dedicated page for each currency and conversion & conversion tool

#### UI

1. Page for each currency, showing various pieces of data:
  * BTC price in that currency
  * Sats per currency unit (or vice-versa if the sat has exceeded the currency unit)
  * Sats per smallest unit (or vice-versa if the sat has exceeded the currency unit)
2. Conversion tool, allowing users to input any amount of sats to find the conversion in their local currency.

### Phase 3 🔜 Accessibility and SEO audits

1. Full accessibility and best-practice review and remediations
2. Figure out how I can improve SEO, particularly on the currency pages. Given the boundaries between server and client-side rendering.

### Phase 4 🔜 Historical data presentation

#### UI

* Using the data collected over time from the snapshots (when there's a meaningful amount) present line-charts showing price fluctuations over time.
* Potentially pull in historical data instead (~5 years) possibly mempool.space or similar.


