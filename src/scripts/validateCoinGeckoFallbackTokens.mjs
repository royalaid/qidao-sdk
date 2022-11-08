#! /usr/bin/env node
import {ChainId, COLLATERALS} from "../../dist/index.modern.mjs";
import PQueue from 'p-queue';
import _ from 'lodash';
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
}

const main = async () => {
  const queue = new PQueue({concurrency: 1, interval: 1200, intervalCap: 1});

  const fallBackCollaterals = Object.values(COLLATERALS).flat().filter(c => c.fallbackUnderlyingAddress)

  const failingTokens = []
  await Promise.all(fallBackCollaterals.slice(3).map(async c => {
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
  }))

  if(!isEmpty(failingTokens)){
    console.log('Failing Tokens')
    failingTokens.forEach((c) => {
      console.log(c.snapshotName)
    })
    process.exit(1)
  }

}

void main()
