#!/usr/bin/env node
import { COLLATERALS } from '../../dist/index.modern.mjs'
import fetch from 'node-fetch'
import fs from 'fs'
import PQueue from 'p-queue'
// const fetch = require('node-fetch');

console.log('Fetching CMC descriptions...')

const queue = new PQueue({ concurrency: 1 })
const tokenInfo = new Set()

Object.values(COLLATERALS)
  .flat()
  .map((collateral) => {
    // console.log('Collateral', collateral);
    collateral?.underlyingIds?.map((id) => {
      tokenInfo.add(id)
    })
    // console.log('Fetching CMC description for', tokenInfo);
  })

// console.log('Fetching CMC description for', tokenInfo.keys());

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  headers: {
    TI_API_KEY: 'c29e7b7fc21792aa96f69229c4b30bb0',
    accept: 'application/json',
  },
}

const manualOverrides = {
  stellaswap: {
    shortDescription:
      'Stellaswap is the largest decentralized exchange on Moonbeam, with the only concentrated liquidity platform on Polkadot.',
    logo: 'https://stellaswap.com/logo.svg',
    name: 'Stellaswap',
  },
  gns: {
    shortDescription:
      'Gains Network or GNS is a decentralized trading platform. It provides users with both crypto and forex trading options with leverage.',
    logo: 'https://gainsnetwork.io/images/logo_header.png',
    name: 'Gains Network (GNS)',
  },
  "wrapped-matic": {
    "shortDescription": "Wrapped Matic (WMATIC) is a token within the Polygon (previously Matic) network that represents MATIC in a wrapped form. This concept is similar to Wrapped Bitcoin (WBTC) or Wrapped Ether (WETH) on the Ethereum blockchain. The main function of this token is to facilitate transactions and interaction between the Ethereum and Polygon blockchains.",
    "logo": "https://s2.tokeninsight.com/static/coins/img/currency/WrappedMatic_WMATIC.jpeg",
    "name": "Wrapped Matic"
  },
}

const fetches = Array.from(tokenInfo.keys()).map((tokenSlug) => {
  console.log('Fetching CMC description for', tokenSlug)
  if (manualOverrides[tokenSlug]) {
    return [tokenSlug, manualOverrides[tokenSlug]]
  } else {
    return queue
      .add(() => fetch(`https://api.tokeninsight.com/api/v1/coins/${tokenSlug}`, config))
      .then((response) => response.json())
      .then((result) => {
        const shortDescription = result?.data?.localization?.find(
          (localization) => localization.lang === 'en'
        )?.description_short
        const logo = result?.data?.logo
        const name = result?.data?.name
        const toRet = [tokenSlug, { shortDescription, logo, name }]
        console.log(toRet)
        return toRet
      })
      .catch((error) => console.log('error', error))
  }
})

const fetchesed = await Promise.all(fetches)
const combined = Object.fromEntries(fetchesed)
//write to file
fs.writeFileSync(`./src/tokenDescriptions.json`, JSON.stringify(combined, null, 2))
