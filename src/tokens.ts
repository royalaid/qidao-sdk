import { ChainId } from './constants'
import { Token } from './entities'

type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token
}

function makeTokenFn(symbol: string, name: string, decimals: number = 18) {
  return (chainId: ChainId, address: string) => {
    return new Token(chainId, address, decimals, symbol, name)
  }
}

const makeLDOToken = makeTokenFn('LDO', 'Lido')
export const LDO: { readonly [chainId in ChainId]?: Token } = {
  [ChainId.MATIC]: makeLDOToken(ChainId.MATIC, '0xC3C7d422809852031b44ab29EEC9F1EfF2A58756'),
}

const makeMETISToken = makeTokenFn('METIS', 'Metis')
export const METIS: { readonly [chainId in ChainId]?: Token } = {
  [ChainId.METIS]: makeMETISToken(ChainId.METIS, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'),
}

const makeSDToken = makeTokenFn('SD', 'Stader Labs')
export const SD: { readonly [chainId in ChainId]?: Token } = {
  [ChainId.MATIC]: makeSDToken(ChainId.MATIC, '0x1d734A02eF1e1f5886e66b0673b71Af5B53ffA94'),
}

const makeQiToken = makeTokenFn('QI', 'QiDao')
export const QI: { readonly [chainId in ChainId]?: Token } = {
  [ChainId.MAINNET]: makeQiToken(ChainId.MAINNET, '0x559b7bfC48a5274754b08819F75C5F27aF53D53b'),
  [ChainId.MATIC]: makeQiToken(ChainId.MATIC, '0x580A84C73811E1839F75d86d75d88cCa0c241fF4'),
  [ChainId.FANTOM]: makeQiToken(ChainId.FANTOM, '0x68Aa691a8819B07988B18923F712F3f4C8d36346'),
  [ChainId.AVALANCHE]: makeQiToken(ChainId.AVALANCHE, '0xA56F9A54880afBc30CF29bB66d2D9ADCdcaEaDD6'),
  [ChainId.ARBITRUM]: makeQiToken(ChainId.ARBITRUM, '0xB9C8F0d3254007eE4b98970b94544e473Cd610EC'),
  [ChainId.BOBA]: makeQiToken(ChainId.BOBA, '0xC85C1ce70C4Bf751a73793D735e9D0209152F13d'),
  [ChainId.XDAI]: makeQiToken(ChainId.XDAI, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02'),
  [ChainId.METIS]: makeQiToken(ChainId.METIS, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.OPTIMISM]: makeQiToken(ChainId.OPTIMISM, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.BSC]: makeQiToken(ChainId.BSC, '0xdDC3D26BAA9D2d979F5E2e42515478bf18F354D5'),
}

const makeMaiToken = makeTokenFn('MAI', 'MAI (miMatic)')
export const MAI: ChainTokenMap = {
  [ChainId.MAINNET]: makeMaiToken(ChainId.MAINNET, '0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6'),
  [ChainId.MATIC]: makeMaiToken(ChainId.MATIC, '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1'),
  [ChainId.FANTOM]: makeMaiToken(ChainId.FANTOM, '0xfB98B335551a418cD0737375a2ea0ded62Ea213b'),
  [ChainId.AVALANCHE]: makeMaiToken(ChainId.AVALANCHE, '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b'),
  [ChainId.MOONBEAM]: makeMaiToken(ChainId.MOONRIVER, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02'),
  [ChainId.MOONRIVER]: makeMaiToken(ChainId.MOONRIVER, '0xFb2019DfD635a03cfFF624D210AEe6AF2B00fC2C'),
  [ChainId.HARMONY]: makeMaiToken(ChainId.HARMONY, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.CRONOS]: makeMaiToken(ChainId.CRONOS, '0x2Ae35c8E3D4bD57e8898FF7cd2bBff87166EF8cb'),
  [ChainId.ARBITRUM]: makeMaiToken(ChainId.ARBITRUM, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.BOBA]: makeMaiToken(ChainId.BOBA, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.XDAI]: makeMaiToken(ChainId.XDAI, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.METIS]: makeMaiToken(ChainId.METIS, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02'),
  [ChainId.BSC]: makeMaiToken(ChainId.BSC, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.AURORA]: makeMaiToken(ChainId.AURORA, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02'),
  [ChainId.CELO]: makeMaiToken(ChainId.CELO, '0xB9C8F0d3254007eE4b98970b94544e473Cd610EC'),
  [ChainId.IOTEX]: makeMaiToken(ChainId.IOTEX, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d'),
  [ChainId.OPTIMISM]: makeMaiToken(ChainId.OPTIMISM, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02'),
  [ChainId.KAVA]: makeMaiToken(ChainId.KAVA, '0xb84Df10966a5D7e1ab46D9276F55d57bD336AFC7'),
  [ChainId.DOGECHAIN]: makeMaiToken(ChainId.DOGECHAIN, '0xb84Df10966a5D7e1ab46D9276F55d57bD336AFC7'),
}
