#! /usr/bin/env node
import {ChainId, COLLATERALS} from "../../dist/index.modern.mjs";
import PQueue from 'p-queue';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
const {isEmpty} = _;

const COINGECKO_ID = {
  [ChainId.MATIC]: 'polygon-pos',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.METIS]: 'metis-andromeda',
  [ChainId.XDAI]: 'xdai',
  [ChainId.OPTIMISM]: 'optimistic-ethereum',
  [ChainId.ARBITRUM]: 'arbitrum-one',
  [ChainId.BSC]: 'binance-smart-chain',
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.MOONRIVER]: 'moonriver',
  [ChainId.MOONBEAM]: 'moonbeam',
  [ChainId.HARMONY]: 'harmony-shard-0',
  [ChainId.BASE]: 'base',
  [ChainId.LINEA]: 'linea',
}

function collateralName(c) {
  return c?.snapshotName || c?.token?.name + ' on ' + c?.chainId;
}

const main = async () => {
  const queue = new PQueue({concurrency: 1, interval: 8005, intervalCap: 1});

  const fallBackCollaterals = Object.values(COLLATERALS).flat().filter(c => !c.deprecated && c.fallbackUnderlyingAddress)

  const failingTokens = []
  await Promise.all(fallBackCollaterals.map(async c => {
    const contractAddress = c.fallbackUnderlyingAddress
    const assetPlatform = COINGECKO_ID[c.chainId]
    let res = await queue.add(() => fetch(`https://api.coingecko.com/api/v3/coins/${assetPlatform}/contract/${contractAddress?.toLowerCase()}`))
    while(res.type === 'error'){
      console.log('Fetch Failed')

      res = await queue.add(() => fetch(`https://api.coingecko.com/api/v3/coins/${assetPlatform}/contract/${contractAddress?.toLowerCase()}`))
    }
    const json = await res.json()
    console.log(`Checked ${collateralName(c)}`)
    if(!json.name){
      console.error(c)
      failingTokens.push({c,json})
    }
    else {
      console.log(`Found token ${json.name}`)
    }
  }))

  if(!isEmpty(failingTokens)){
    console.log('Failing Tokens')
    failingTokens.forEach((c) => {
      console.log(c)
    })
    process.exit(1)
  }

}

//https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id="eth,btc"&aux="description"

const coinmarketcap = async () => {
  const queue = new PQueue({concurrency: 1, interval: 5005, intervalCap: 1});

  const fallBackCollaterals = Object.values(COLLATERALS).flat().filter(c => c.fallbackUnderlyingAddress)

  const failingTokens = []

  await Promise.all(fallBackCollaterals.map(async c => {
    const contractAddress = c.fallbackUnderlyingAddress
    const assetPlatform = COINGECKO_ID[c.chainId]
    let res = await queue.add(() => fetch(`https://api.coingecko.com/api/v3/coins/${assetPlatform}/contract/${contractAddress?.toLowerCase()}`))
    while(res.type === 'error'){
      console.log('Fetch Failed')

      res = await queue.add(() => fetch(`https://api.coingecko.com/api/v3/coins/${assetPlatform}/contract/${contractAddress?.toLowerCase()}`))
    }
    const json = await res.json()
    if(!json.name){
      failingTokens.push({c,json})
    }
    console.log(`Checked ${collateralName(c)}`)
  }))

  if(!isEmpty(failingTokens)){
    console.log('Failing Tokens')
    failingTokens.forEach((c) => {
      console.log(collateralName(c))
    })
    process.exit(1)
  }

}

void main()
