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
✅ v1.0.0 Initial stable release  
v2.0.0 Historical data, choose a date in UI
v3.0.0 Infographics, line graphs for each currency


## Currencies

ARS : Argentine Peso  
AUD : Australian Dollar  
BRL : Brazilian Real  
CAD : Canadian Dollar  
CHF : Swiss Franc  
CLP : Chilean Peso  
CNY : Chinese Yuan  
CZK : Czech Koruna  
DKK : Danish Krone  
EUR : Euro  
GBP : Great British Pound  
HKD : Hong Kong Dollar  
HRK : Croatian Kuna  
HUF : Hungarian Forint  
INR : Indian Rupee  
ISK : Icelandic Króna  
JPY : Japanese Yen  
KRW : South Korean Won  
NGN : Nigerian Naira  
NZD : New Zealand Dollar  
PLN : Polish Złoty  
RON : Romanian Leu  
RUB : Russian Ruble  
SEK : Swedish Krona  
SGD : Singapore Dollar  
THB : Thai Baht  
TRY : Turkish Lira  
TWD : New Taiwan Dollar  
USD : United States Dollar  
