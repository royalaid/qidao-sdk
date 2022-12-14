import { Provider } from '@ethersproject/providers'
import { constants, Signer } from 'ethers'
import {
  CrosschainNativeQiStablecoin,
  CrosschainQiStablecoin,
  CrosschainQiStablecoinSlim,
  CrosschainQiStablecoinSlimV2,
  CrosschainQiStablecoinSlimV2__factory,
  CrosschainQiStablecoinV2,
  CrosschainQiStablecoinSlim__factory,
  CrosschainQiStablecoinV2__factory,
  CrosschainQiStablecoinwbtc,
  CrosschainQiStablecoin__factory,
  Erc20QiStablecoincamwbtc,
  Erc20QiStablecoinwbtc,
  Erc20Stablecoin,
  StableQiVault,
  StableQiVault__factory,
  CrosschainNativeQiStablecoin__factory,
  CrosschainQiStablecoinwbtc__factory,
  Erc20Stablecoin__factory,
  Erc20QiStablecoinwbtc__factory,
  Erc20QiStablecoincamwbtc__factory,
} from './contracts'
import { Token } from './entities'
import {
  AAVE_ADDRESS,
  CAMAAVE_VAULT_ADDRESS, CAMDAI_VAULT_ADDRESS, CAMWBTC_VAULT_ADDRESS,
  CAMWETH_VAULT_ADDRESS,
  CAMWMATIC_VAULT_ADDRESS,
  ChainId, LINK_ADDRESS, METIS_WBTC_ADDRESS, MOO_BIFI_FTM_VAULT_ADDRESS,
  MOO_SCREAM_DAI_VAULT_ADDRESS,
  MOO_SCREAM_ETH_VAULT_ADDRESS, MOO_SCREAM_LINK_VAULT_ADDRESS,
  MOO_SCREAM_WBTC_VAULT_ADDRESS,
  MOO_SCREAM_WFTM_VAULT_ADDRESS, MOO_ETH_STETH_CRV_VAULT_ADDRESS, MOO_WAVAX_VAULT_ADDRESS,
  OG_MATIC_VAULT, STETH_ADDRESS, WETH_ADDRESS, WFTM_ADDRESS, WSTETH_VAULT_ADDRESS,
  YVDAI_VAULT_ADDRESS, YVETH_VAULT_ADDRESS, YVLINK_VAULT_ADDRESS,
  YVWBTC_VAULT_ADDRESS, YVWETH_OPTIMISM_VAULT_ADDRESS,
  YVWETH_VAULT_ADDRESS,
  YVWFTM_VAULT_ADDRESS,
  YVYFI_VAULT_ADDRESS
} from './constants'

export type SnapshotCanonicalChoiceName =
  | 'Wrapped MATIC (Polygon)'
  | 'WETH (Polygon)'
  | 'WBTC (Polygon)'
  | 'AAVE (Polygon)'
  | 'LINK (Polygon)'
  | 'xxLINK (Polygon)'
  | 'KNC (Polygon)'
  | 'CRV (Polygon)'
  | 'BAL (Polygon)'
  | 'GHST (Polygon)'
  | 'vGHST (Polygon)'
  | 'Frax Share (Polygon)'
  | 'SAND (Polygon)'
  | 'Compounding Aave MATIC (Polygon)'
  | 'Compounding Aave ETH (Polygon)'
  | 'Compounding Aave AAVE (Polygon)'
  | 'Compounding Aave WBTC (Polygon)'
  | 'WETH (Fantom)'
  | 'WFTM (Fantom)'
  | 'LINK (Fantom)'
  | 'WBTC (Fantom)'
  | 'SUSHI (Fantom)'
  | 'AAVE (Fantom)'
  | 'mooBIFI (Fantom)'
  | 'xBOO (Fantom)'
  | 'Yearn vault WFTM (Fantom)'
  | 'Yearn vault BTC (Fantom)'
  | 'Yearn vault ETH (Fantom)'
  | 'Yearn vault YFI (Fantom)'
  | 'WBTC (Avalanche)'
  | 'WETH (Avalanche)'
  | 'WAVAX (Avalanche)'
  | 'Beefy Aave AVAX (Avalanche)'
  | 'MOVR (Moonriver)'
  | 'WETH (Gnosis Chain)'
  | 'GNO (Gnosis Chain)'
  | 'WETH (Arbitrum)'
  | 'WBTC (Arbitrum)'
  | 'WETH (Optimism)'
  | 'WBTC (Optimism)'
  | 'OP (Optimism)'
  | 'Beefy Aave ETH (Optimism)'
  | 'Beefy Aave BTC (Optimism)'
  | 'CAKE (BNB)'
  | 'BNB (BNB)'
  | 'DODO (BNB)'
  | 'METIS (Metis)'
  | 'WETH (Metis)'
  | 'WBTC (Metis)'
  | 'm.WBTC (Metis)'
  | 'Yearn WETH (Ethereum)'
  | 'Yearn LINK (Ethereum)'
  | 'WBTC (Ethereum)'
  | 'WETH (Ethereum)'
  | 'StakeDAO Curve ETH/stETH (Eth)'
  | 'Yearn Curve ETH/stETH (Ethereum)'
  | 'MAI DAI Arrakis Polygon'
  | 'Wrapped Staked ETH (Optimism)'
  | 'Yearn vault ETH (Optimism)'
  | 'Moo stETH Curve (Optimism)'

export type VaultShortName =
  | 'aave'
  | 'avax'
  | 'avaxweth'
  | 'avaxwbtc'
  | 'bal'
  | 'bal-old'
  | 'beefy-aave-avax'
  | 'beefy-aave-dai'
  | 'beefy-aave-weth'
  | 'beefy-aave-wbtc'
  | 'beefy-bifi'
  | 'beefy-scream-dai'
  | 'beefy-scream-eth'
  | 'beefy-scream-ftm'
  | 'beefy-scream-link'
  | 'beefy-scream-wbtc'
  | 'beefy-spooky-btc-ftm'
  | 'beefy-spooky-eth-ftm'
  | 'btc'
  | 'btc_old'
  | 'cake'
  | 'camaave'
  | 'camdai'
  | 'camwbtc'
  | 'camweth'
  | 'camwmatic'
  | 'crv'
  | 'cxada'
  | 'cxdoge'
  | 'cxeth'
  | 'dquick'
  | 'dquick-old'
  | 'eth'
  | 'ftm'
  | 'ftmweth'
  | 'fxs'
  | 'ghst'
  | 'gno'
  | 'link'
  | 'matic'
  | 'moo-solar-eth-usdc'
  | 'moo-solar-movr-usdc'
  | 'movr'
  | 'one'
  | 'sdam3crv'
  | 'sdav3crv'
  | 'sushi'
  | 'vghst'
  | 'wbtc'
  | 'wbnb'
  | 'weth'
  | 'weth-old'
  | 'yveth'
  | 'yvlink'
  | 'yvcrv-eth-steth'
  | 'yvwdai'
  | 'yvwftm'
  | 'yvwbtc'
  | 'yvyfi'
  | 'celsius'
  | 'sand'
  | 'stake-dao-crv-eth-steth'
  | 'wmatic'
  | 'xboo'
  | 'dodo'
  | 'xxdai'
  | 'xxlink'
  | 'op'
  | 'metis'
  | 'mwbtc'
  | 'knc'
  | 'xSMVT'
  | 'GLMVT'
  | 'LSMMVT'
  | 'STMMVT'
  | 'maidai'
  | 'yvweth'
  | 'wsteth'
  | 'beefy-eth-steth-crv'

type VaultContractAbi =
  | typeof Erc20Stablecoin__factory.abi
  | typeof Erc20QiStablecoinwbtc__factory.abi
  | typeof Erc20QiStablecoincamwbtc__factory.abi
  | typeof StableQiVault__factory.abi
  | typeof CrosschainQiStablecoin__factory.abi
  | typeof CrosschainNativeQiStablecoin__factory.abi
  | typeof CrosschainQiStablecoinV2__factory.abi
  | typeof CrosschainQiStablecoinSlim__factory.abi
  | typeof CrosschainQiStablecoinSlimV2__factory.abi
  | typeof CrosschainQiStablecoinwbtc__factory.abi

export enum FRONTEND {
  MAI,
  MANHATTAN,
  STELLASWAP,
}

export interface COLLATERAL {
  aaveId?: string
  connect(
    address: string,
    signerOrProvider: Signer | Provider
  ):
    | Erc20Stablecoin
    | Erc20QiStablecoinwbtc
    | Erc20QiStablecoincamwbtc
    | StableQiVault
    | CrosschainQiStablecoin
    | CrosschainNativeQiStablecoin
    | CrosschainQiStablecoinV2
    | CrosschainQiStablecoinSlim
    | CrosschainQiStablecoinSlimV2
    | CrosschainQiStablecoinwbtc
  chainId: ChainId
  depreciated?: boolean
  disabled?: boolean
  infoUrl?: string
  minimumCDR: number
  native?: boolean
  subgraph?: string
  token: Token
  vaultAddress: string
  shortName: VaultShortName
  contractAbi: VaultContractAbi
  frontend: FRONTEND
  version: 1
  fallbackUnderlyingAddress?: string
}

export interface GAUGE_VALID_COLLATERAL extends COLLATERAL {
  snapshotName: SnapshotCanonicalChoiceName
}

export interface COLLATERAL_V2 extends Omit<COLLATERAL, 'version'> {
  version: 2
}

export interface GAUGE_VALID_COLLATERAL_V2 extends COLLATERAL_V2 {
  snapshotName: SnapshotCanonicalChoiceName
}


export function isV2QiVault(collateral: COLLATERAL | COLLATERAL_V2 | GAUGE_VALID_COLLATERAL | GAUGE_VALID_COLLATERAL_V2): collateral is COLLATERAL_V2 | GAUGE_VALID_COLLATERAL_V2 {
  return collateral.version === 2
}

export function isGaugeValid(collateral: COLLATERAL | COLLATERAL_V2 | GAUGE_VALID_COLLATERAL | GAUGE_VALID_COLLATERAL_V2): collateral is GAUGE_VALID_COLLATERAL | GAUGE_VALID_COLLATERAL_V2{
  return ((collateral as GAUGE_VALID_COLLATERAL).snapshotName !== undefined && !collateral.depreciated)
}

export const COLLATERALS: { [chainId in ChainId]?: (COLLATERAL | GAUGE_VALID_COLLATERAL | COLLATERAL_V2 | GAUGE_VALID_COLLATERAL_V2)[] } = {
  [ChainId.MAINNET]: [
    {
      shortName: 'weth',
      vaultAddress: '0x98eb27E5F24FB83b7D129D789665b08C258b4cCF',
      chainId: ChainId.MAINNET,
      token: new Token(ChainId.MAINNET, WETH_ADDRESS, 18, 'WETH', 'Wrapped Ether'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 120,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'WETH (Ethereum)'
    },
    {
      shortName: 'wbtc',
      vaultAddress: '0x8C45969aD19D297c9B85763e90D0344C6E2ac9d1',
      chainId: ChainId.MAINNET,
      token: new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped Bitcoin'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 120,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'WBTC (Ethereum)'
    },
    {
      shortName: 'stake-dao-crv-eth-steth',
      fallbackUnderlyingAddress: STETH_ADDRESS,
      vaultAddress: '0xcc61Ee649A95F2E2f0830838681f839BDb7CB823',
      chainId: ChainId.MAINNET,
      token: new Token(
        ChainId.MAINNET,
        '0xbC10c4F7B9FE0B305e8639B04c536633A3dB7065',
        18,
        'sdsteCRV',
        'StakeDAO Curve.fi ETH/stETH'
      ),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 125,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'StakeDAO Curve ETH/stETH (Eth)',
    },
    {
      shortName: 'yvcrv-eth-steth',
      fallbackUnderlyingAddress: STETH_ADDRESS,
      vaultAddress: '0x82E90EB7034C1DF646bD06aFb9E67281AAb5ed28',
      chainId: ChainId.MAINNET,
      token: new Token(
        ChainId.MAINNET,
        '0xdCD90C7f6324cfa40d7169ef80b12031770B4325',
        18,
        'yvcurve-eth-steth',
        'Yearn Curve.fi ETH/stETH'
      ),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 125,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Yearn Curve ETH/stETH (Ethereum)',
    },
    {
      shortName: 'yveth',
      vaultAddress: YVETH_VAULT_ADDRESS,
      fallbackUnderlyingAddress: WETH_ADDRESS,
      chainId: ChainId.MAINNET,
      token: new Token(ChainId.MAINNET, '0xa258C4606Ca8206D8aA700cE2143D7db854D168c', 18, 'YVETH', 'Yearn WETH'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 125,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Yearn WETH (Ethereum)',
    },
    {
      shortName: 'yvlink',
      vaultAddress: YVLINK_VAULT_ADDRESS,
      fallbackUnderlyingAddress: LINK_ADDRESS,
      chainId: ChainId.MAINNET,
      token: new Token(ChainId.MAINNET, '0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2', 18, 'YVLINK', 'Yearn Link'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 140,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Yearn LINK (Ethereum)',
    },
  ],
  [ChainId.FANTOM]: [
    {
      shortName: 'ftm',
      vaultAddress: '0x1066b8FC999c1eE94241344818486D5f944331A0',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, WFTM_ADDRESS, 18, 'FTM', 'Fantom'),
      minimumCDR: 130,
      native: true,
      contractAbi: CrosschainNativeQiStablecoin__factory.abi,
      connect: CrosschainNativeQiStablecoin__factory.connect,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-fantom-vaults',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WFTM (Fantom)'
    },
    {
      shortName: 'yvwftm',
      vaultAddress: YVWFTM_VAULT_ADDRESS,
      fallbackUnderlyingAddress: WFTM_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0', 18, 'yvWFTM', 'Yearn Fantom'),
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-yvwftm-vaults',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Yearn vault WFTM (Fantom)',
    },
    {
      shortName: 'yvwbtc',
      vaultAddress: YVWBTC_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0xd817a100ab8a29fe3dbd925c2eb489d67f758da9',
        8,
        'yvWBTC',
        'Yearn Wrapped Bitcoin'
      ),
      fallbackUnderlyingAddress: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoinSlimV2__factory.abi,
      connect: CrosschainQiStablecoinSlimV2__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Yearn vault BTC (Fantom)',
    },
    {
      shortName: 'yvyfi',
      vaultAddress: YVYFI_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x2C850cceD00ce2b14AA9D658b7Cad5dF659493Db', 18, 'yvYFI', 'Yearn Vault YFI'),
      minimumCDR: 135,
      fallbackUnderlyingAddress: '0x29b0Da86e484E1C0029B56e817912d778aC0EC69',
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Yearn vault YFI (Fantom)',
    },
    {
      shortName: 'yveth',
      vaultAddress: YVWETH_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      fallbackUnderlyingAddress: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      token: new Token(
        ChainId.FANTOM,
        '0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7',
        18,
        'yvWETH',
        'Yearn Wrapped Ether'
      ),
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Yearn vault ETH (Fantom)',
    },
    {
      shortName: 'yvwdai',
      vaultAddress: YVDAI_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x637eC617c86D24E421328e6CAEa1d92114892439', 18, 'yvDAI', 'Yearn DAI'),
      minimumCDR: 110,
      fallbackUnderlyingAddress: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-yvdai-vaults',
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'ftmweth',
      vaultAddress: '0xD939c268C49c442F037E968F045ba02f499562D4',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'ETH', 'Ethereum'),
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-fantom-eth-vaults',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Fantom)',
    },
    {
      shortName: 'aave',
      vaultAddress: '0xdB09908b82499CAdb9E6108444D5042f81569bD9',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B', 18, 'AAVE', 'Aave'),
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'AAVE (Fantom)',
    },
    {
      shortName: 'sushi',
      vaultAddress: '0x267bDD1C19C932CE03c7A62BBe5b95375F9160A6',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC', 18, 'SUSHI', 'Sushi'),
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'SUSHI (Fantom)',
    },
    {
      shortName: 'link',
      vaultAddress: '0xd6488d586E8Fcd53220e4804D767F19F5C846086',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8', 18, 'LINK', 'ChainLink'),
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'LINK (Fantom)'
    },
    {
      shortName: 'btc',
      vaultAddress: '0xE5996a2cB60eA57F03bf332b5ADC517035d8d094',
      chainId: ChainId.FANTOM,
      token: new Token(ChainId.FANTOM, '0x321162Cd933E2Be498Cd2267a90534A804051b11', 8, 'BTC', 'Bitcoin'),
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoinwbtc__factory.abi,
      connect: CrosschainQiStablecoinwbtc__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WBTC (Fantom)',
    },
    {
      shortName: 'beefy-scream-wbtc',
      vaultAddress: MOO_SCREAM_WBTC_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0x97927aBfE1aBBE5429cBe79260B290222fC9fbba',
        18,
        'mooScreamWBTC',
        'Beefy Scream WBTC'
      ),
      minimumCDR: 135,
      fallbackUnderlyingAddress: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'beefy-scream-dai',
      vaultAddress: MOO_SCREAM_DAI_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0x920786cff2A6f601975874Bb24C63f0115Df7dc8',
        18,
        'mooScreamDAI',
        'Beefy Scream DAI'
      ),
      fallbackUnderlyingAddress: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'beefy-scream-eth',
      vaultAddress: MOO_SCREAM_ETH_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0x0a03D2C1cFcA48075992d810cc69Bd9FE026384a',
        18,
        'mooScreamETH',
        'Beefy Scream ETH'
      ),
      fallbackUnderlyingAddress: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'beefy-scream-ftm',
      vaultAddress: MOO_SCREAM_WFTM_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0x49c68eDb7aeBd968F197121453e41b8704AcdE0C',
        18,
        'mooScreamFTM',
        'Beefy Scream FTM'
      ),
      fallbackUnderlyingAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'beefy-scream-link',
      vaultAddress: MOO_SCREAM_LINK_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0x6DfE2AAEA9dAadADf0865B661b53040E842640f8',
        18,
        'mooScreamLINK',
        'Beefy Scream LINK'
      ),
      fallbackUnderlyingAddress: '0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8',
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'beefy-spooky-btc-ftm',
      vaultAddress: '0xF34e271312e41Bbd7c451B76Af2AF8339D6f16ED',
      depreciated: true,
      chainId: ChainId.FANTOM,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(
        ChainId.FANTOM,
        '0xA3e3Af161943CfB3941B631676134bb048739727',
        18,
        'mooBooBTC-FTM',
        'Beefy SpookySwap BTC-FTM LP'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    /* {
            shortName: "beefy-spooky-dai-ftm",
            vaultAddress: "0xFc6F8Dd56E9ECAc70795Adc312EE363c608DefdA",
            chainId: ChainId.FANTOM,
            token: new Token(
                ChainId.FANTOM,
                "0x8316b990De26eB530B7B1bb0d87f5b0a304637cd",
                18,
                "mooBooDAI-FTM",
                "Moo Boo DAI-FTM"
            ),
            minimumCDR: 135,
            version: 1
      snapshotName: '',
        }, */
    {
      shortName: 'beefy-spooky-eth-ftm',
      vaultAddress: '0x9BA01B1279B1F7152b42aCa69fAF756029A9ABDe',
      depreciated: true,
      chainId: ChainId.FANTOM,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(
        ChainId.FANTOM,
        '0x2a30C5e0d577108F694d2A96179cd73611Ee069b',
        18,
        'mooBooETH-FTM',
        'Beefy SpookySwap ETH-FTM LP'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    /* {
            shortName: "beefy-spooky-ftm-usdc",
            vaultAddress: "0x7BB4a236c4DA7F9593Caaa84ed0c63E81B9650A2",
            chainId: ChainId.FANTOM,
            token: new Token(
                ChainId.FANTOM,
                "0x41D44B276904561Ac51855159516FD4cB2c90968",
                18,
                "mooBooFTM-USDC",
                "Moo Boo FTM-USDC"
            ),
            minimumCDR: 135,
            version: 1
      snapshotName: '',
        }, */
    {
      shortName: 'beefy-bifi',
      vaultAddress: MOO_BIFI_FTM_VAULT_ADDRESS,
      chainId: ChainId.FANTOM,
      token: new Token(
        ChainId.FANTOM,
        '0xbF07093ccd6adFC3dEB259C557b61E94c1F66945',
        18,
        'mooFantomBIFI',
        'Beefy Staked BIFI'
      ),
      minimumCDR: 140,
      fallbackUnderlyingAddress: '0xd6070ae98b8069de6b494332d1a1a81b6179d960',
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'mooBIFI (Fantom)',
    },
    {
      shortName: 'xboo',
      vaultAddress: '0x3f6cf10e85e9c0630856599FAB8D8BFcd9C0E7D4',
      chainId: ChainId.FANTOM,
      fallbackUnderlyingAddress: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe',
      token: new Token(ChainId.FANTOM, '0xa48d959AE2E88f1dAA7D5F611E01908106dE7598', 18, 'XBOO', 'xBoo MirrorWorld'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 155,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'xBOO (Fantom)',
    },
  ],
  [ChainId.AVALANCHE]: [
    {
      shortName: 'beefy-aave-avax',
      vaultAddress: MOO_WAVAX_VAULT_ADDRESS,
      chainId: ChainId.AVALANCHE,
      token: new Token(
        ChainId.AVALANCHE,
        '0x1B156C5c75E9dF4CAAb2a5cc5999aC58ff4F9090',
        18,
        'mooAaveAVAX',
        'Beefy Aave AVAX'
      ),
      minimumCDR: 135,
      fallbackUnderlyingAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Beefy Aave AVAX (Avalanche)',
    },
    {
      shortName: 'sdav3crv',
      vaultAddress: '0x13A7fE3Ab741ea6301Db8B164290bE711f546A73',
      chainId: ChainId.AVALANCHE,
      token: new Token(
        ChainId.AVALANCHE,
        '0x0665eF3556520B21368754Fb644eD3ebF1993AD4',
        18,
        'sdav3CRV',
        'Stake DAO av3CRV Strategy'
      ),
      contractAbi: CrosschainQiStablecoinSlimV2__factory.abi,
      connect: CrosschainQiStablecoinSlimV2__factory.connect,
      minimumCDR: 110,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'avaxwbtc',
      vaultAddress: '0x1f8f7a1d38e41eaf0ed916def29bdd13f2a3f11a',
      chainId: ChainId.AVALANCHE,
      token: new Token(ChainId.AVALANCHE, '0x50b7545627a5162F82A992c33b87aDc75187B218', 8, 'WBTC.e', 'Wrapped BTC'),
      contractAbi: CrosschainQiStablecoinSlimV2__factory.abi,
      connect: CrosschainQiStablecoinSlimV2__factory.connect,
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WBTC (Avalanche)',
    },
    {
      shortName: 'avaxweth',
      vaultAddress: '0xa9122dacf3fccf1aae6b8ddd1f75b6267e5cbbb8',
      chainId: ChainId.AVALANCHE,
      token: new Token(ChainId.AVALANCHE, '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', 18, 'WETH', 'Wrapped Ethereum'),
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Avalanche)',
    },
    {
      shortName: 'avax',
      vaultAddress: '0x73a755378788a4542a780002a75a7bae7f558730',
      chainId: ChainId.AVALANCHE,
      token: new Token(ChainId.AVALANCHE, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WAVAX (Avalanche)',
    },
  ],
  [ChainId.ARBITRUM]: [
    {
      shortName: 'weth-old',
      depreciated: true,
      vaultAddress: '0xf5c2b1b92456fe1b1208c63d8ea040d464f74a72',
      chainId: ChainId.ARBITRUM,
      contractAbi: CrosschainNativeQiStablecoin__factory.abi,
      connect: CrosschainNativeQiStablecoin__factory.connect,
      token: new Token(
        ChainId.ARBITRUM,
        '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        18,
        'WETH (OLD)',
        'Wrapped Ether (OLD)'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'weth',
      vaultAddress: '0xC76a3cBefE490Ae4450B2fCC2c38666aA99f7aa0',
      chainId: ChainId.ARBITRUM,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.ARBITRUM, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Arbitrum)',
    },
    {
      shortName: 'wbtc',
      vaultAddress: '0xB237f4264938f0903F5EC120BB1Aa4beE3562FfF',
      chainId: ChainId.ARBITRUM,
      contractAbi: CrosschainQiStablecoinSlimV2__factory.abi,
      connect: CrosschainQiStablecoinSlimV2__factory.connect,
      token: new Token(ChainId.ARBITRUM, '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', 8, 'WBTC', 'Wrapped Bitcoin'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WBTC (Arbitrum)',
    },
  ],
  [ChainId.OPTIMISM]: [
    {
      shortName: 'weth',
      vaultAddress: '0x062016Cd29Fabb26c52BAB646878987fC9B0Bc55',
      chainId: ChainId.OPTIMISM,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Optimism)',
    },
    {
      shortName: 'wbtc',
      vaultAddress: '0xB9C8F0d3254007eE4b98970b94544e473Cd610EC',
      chainId: ChainId.OPTIMISM,
      contractAbi: CrosschainQiStablecoinSlimV2__factory.abi,
      connect: CrosschainQiStablecoinSlimV2__factory.connect,
      token: new Token(ChainId.OPTIMISM, '0x68f180fcCe6836688e9084f035309E29Bf0A2095', 8, 'WBTC', 'Wrapped BTC'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WBTC (Optimism)',
    },
    {
      shortName: 'op',
      vaultAddress: '0xbf1aeA8670D2528E08334083616dD9C5F3B087aE',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(ChainId.OPTIMISM, '0x4200000000000000000000000000000000000042', 18, 'OP', 'Optimism'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'OP (Optimism)',
    },
    {
      shortName: 'beefy-aave-dai',
      vaultAddress: '0xB89c1b3d9f335B9d8Bb16016F3d60160AE71041f',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      fallbackUnderlyingAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      token: new Token(
        ChainId.OPTIMISM,
        '0x4D153F47F03c237F6360a6eccd185b4aE09c63D0',
        18,
        'mooAaveDAI',
        'Beefy OP Aave Dai'
      ),
      minimumCDR: 110,
      frontend: FRONTEND.MAI,
      version: 2,
    },
    {
      shortName: 'beefy-aave-weth',
      vaultAddress: '0xF9CE2522027bD40D3b1aEe4abe969831FE3BeAf5',
      fallbackUnderlyingAddress: '0x4200000000000000000000000000000000000006',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(
        ChainId.OPTIMISM,
        '0x7eE71053102d54Fc843BaEBaf07277C2b6dB64f1',
        18,
        'mooAaveWETH',
        'Beefy OP Aave WETH'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Beefy Aave ETH (Optimism)',
    },
    {
      shortName: 'beefy-aave-wbtc',
      vaultAddress: '0xAB91c51b55F7Dd7B34F2FD7217506fD5b632B2B9',
      fallbackUnderlyingAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(
        ChainId.OPTIMISM,
        '0x8e2cdf8c6477439b7c989e86b917d80871b92339',
        18,
        'mooAaveWBTC',
        'Beefy OP Aave WBTC'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Beefy Aave BTC (Optimism)',
    },
    {
      shortName: 'wsteth',
      vaultAddress: WSTETH_VAULT_ADDRESS,
      fallbackUnderlyingAddress: '0x4200000000000000000000000000000000000006',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(
        ChainId.OPTIMISM,
        '0x77965B3282DFdeB258B7ad77e833ad7Ee508B878',
        18,
        'wstETH',
        'Wrapped liquid staked Ether 2.0'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Wrapped Staked ETH (Optimism)',
    },
    {
      shortName: 'yvweth',
      vaultAddress: YVWETH_OPTIMISM_VAULT_ADDRESS,
      fallbackUnderlyingAddress: '0x4200000000000000000000000000000000000006',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(
        ChainId.OPTIMISM,
        '0x5A6325c3E3c88Dbcd52a8d55a31b342d09fa7982',
        18,
        'yvWETH',
        'WETH yVault'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Yearn vault ETH (Optimism)',
    },
    {
      shortName: 'beefy-eth-steth-crv',
      vaultAddress: MOO_ETH_STETH_CRV_VAULT_ADDRESS,
      fallbackUnderlyingAddress: '0x4200000000000000000000000000000000000006',
      chainId: ChainId.OPTIMISM,
      connect: StableQiVault__factory.connect,
      contractAbi: StableQiVault__factory.abi,
      token: new Token(
        ChainId.OPTIMISM,
        '0x0892a178c363b4739e5Ac89E9155B9c30214C0c0',
        18,
        'mooCurveWSTETH',
        'Moo Curve wstETH'
      ),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'Moo stETH Curve (Optimism)',
    }
  ],
  [ChainId.MOONRIVER]: [
    {
      shortName: 'eth',
      vaultAddress: '0x4a0474E3262d4DB3306Cea4F207B5d66eC8E0AA9',
      depreciated: true,
      chainId: ChainId.MOONRIVER,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(ChainId.MOONRIVER, '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C', 18, 'ETH', 'Ethereum'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'moo-solar-eth-usdc',
      vaultAddress: '0x97D811A7eb99Ef4Cb027ad59800cE27E68Ee1109',
      depreciated: true,
      chainId: ChainId.MOONRIVER,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(
        ChainId.MOONRIVER,
        '0x932009984bd2a7dA8C6396694E811Da5C0952d05',
        18,
        'mooSolarETH-USDC',
        'Beefy Solarbeam ETH-USDC LP'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'movr',
      native: true,
      vaultAddress: '0x5dB6617DDF077d76CFD9d7fC0Fa91aAabc3da683',
      chainId: ChainId.MOONRIVER,
      contractAbi: CrosschainNativeQiStablecoin__factory.abi,
      connect: CrosschainNativeQiStablecoin__factory.connect,
      token: new Token(ChainId.MOONRIVER, '0x98878B06940aE243284CA214f92Bb71a2b032B8A', 18, 'MOVR', 'Moonriver'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'MOVR (Moonriver)',
    },
    {
      shortName: 'moo-solar-movr-usdc',
      vaultAddress: '0xF4fa968578723580935a00d1e12Fe96Bc6401947',
      depreciated: true,
      chainId: ChainId.MOONRIVER,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(
        ChainId.MOONRIVER,
        '0x78Dc4b7C7A89812fb337dD8C3B0ccB3e04E02D7C',
        18,
        'mooSolarMOVR-USDC',
        'Beefy Solarbeam MOVR-USDC LP'
      ),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
    },
  ],
  [ChainId.MOONBEAM]: [
    {
      connect: StableQiVault__factory.connect,
      chainId: ChainId.MOONBEAM,
      minimumCDR: 200,
      token: new Token(ChainId.MOONBEAM, '0xAcc15dC74880C9944775448304B263D191c6077F', 18, 'WGLMT', 'Wrapped GLMR'),
      shortName: 'GLMVT',
      frontend: FRONTEND.MANHATTAN,
      vaultAddress: '0x3A82F4da24F93a32dc3C2A28cFA9D6E63EC28531',
      contractAbi: StableQiVault__factory.abi,
      version: 2,
    },
    {
      connect: StableQiVault__factory.connect,
      chainId: ChainId.MOONBEAM,
      minimumCDR: 250,
      token: new Token(ChainId.MOONBEAM, '0x06A3b410b681c82417A906993aCeFb91bAB6A080', 18, 'xStella', 'xStella'),
      shortName: 'xSMVT',
      frontend: FRONTEND.MANHATTAN,
      vaultAddress: '0x3756465c5b1C1C4cEe473880c9726E20875284f1',
      contractAbi: StableQiVault__factory.abi,
      version: 2,
    },
  ],
  [ChainId.HARMONY]: [
    {
      shortName: 'eth',
      vaultAddress: '0x46469f995A5CB60708200C25EaD3cF1667Ed36d6',
      chainId: ChainId.HARMONY,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      depreciated: true,
      token: new Token(ChainId.HARMONY, '0x6983D1E6DEf3690C4d616b13597A09e6193EA013', 18, '1ETH', 'Wrapped Ethereum'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'one',
      vaultAddress: '0x12FcB286D664F37981a42cbAce92eAf28d1dA94f',
      native: true,
      chainId: ChainId.HARMONY,
      contractAbi: CrosschainNativeQiStablecoin__factory.abi,
      connect: CrosschainNativeQiStablecoin__factory.connect,
      token: new Token(ChainId.HARMONY, '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a', 18, 'ONE', 'Harmony (ONE)'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'btc_old',
      vaultAddress: '0x9f4E3d01c634441F284beb92bBAEeb76133BbB28',
      depreciated: true,
      chainId: ChainId.HARMONY,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(
        ChainId.HARMONY,
        '0x3095c7557bCb296ccc6e363DE01b760bA031F2d9',
        8,
        '1WBTC OLD',
        'Wrapped Bitcoin OLD'
      ),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'btc',
      vaultAddress: '0x4592e0bcf01121757e70404915f220a77ffb4e15',
      depreciated: true,
      chainId: ChainId.HARMONY,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(ChainId.HARMONY, '0x3095c7557bCb296ccc6e363DE01b760bA031F2d9', 8, '1WBTC', 'Wrapped Bitcoin'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
  ],
  [ChainId.BSC]: [
    {
      shortName: 'wbnb',
      vaultAddress: '0xA56F9A54880afBc30CF29bB66d2D9ADCdcaEaDD6',
      chainId: ChainId.BSC,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'Wrapped BNB', 'WBNB'),
      minimumCDR: 135,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'BNB (BNB)',
    },
    {
      shortName: 'cake',
      vaultAddress: '0x014A177E9642d1b4E970418f894985dC1b85657f',
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      chainId: ChainId.BSC,
      token: new Token(ChainId.BSC, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'PancakeSwap Token', 'CAKE'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'CAKE (BNB)',
    },
    {
      shortName: 'dodo',
      vaultAddress: '0x7333fd58d8D73a8e5FC1a16C8037ADa4f580FA2B',
      chainId: ChainId.BSC,
      token: new Token(ChainId.BSC, '0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2', 18, 'DODO', 'DODO'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 150,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'DODO (BNB)',
    },
  ],
  [ChainId.XDAI]: [
    {
      shortName: 'weth',
      vaultAddress: '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b',
      chainId: ChainId.XDAI,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      token: new Token(ChainId.XDAI, '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1', 18, 'Wrapped Ether', 'WETH'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Gnosis Chain)',
    },
    {
      shortName: 'gno',
      vaultAddress: '0x014a177e9642d1b4e970418f894985dc1b85657f',
      chainId: ChainId.XDAI,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.XDAI, '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb', 18, 'Gnosis', 'GNO'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'GNO (Gnosis Chain)',
    },
  ],
  [ChainId.MATIC]: [
    {
      shortName: 'matic',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-mai-finance-og',
      vaultAddress: OG_MATIC_VAULT,
      token: new Token(ChainId.MATIC, constants.AddressZero, 18, 'MATIC', 'Polygon MATIC'),
      depreciated: true,
      minimumCDR: 150,
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'camwmatic',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-amwmatic-vaults',
      vaultAddress: CAMWMATIC_VAULT_ADDRESS,
      contractAbi: Erc20Stablecoin__factory.abi,
      fallbackUnderlyingAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(
        ChainId.MATIC,
        '0x7068Ea5255cb05931EFa8026Bd04b18F3DeB8b0B',
        18,
        'camWMATIC',
        'Compounding Aave Market MATIC'
      ),
      minimumCDR: 135,
      aaveId: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf12700xd05e3e715d945b59290df0ae8ef85c1bdb684744',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Compounding Aave MATIC (Polygon)',
    },
    {
      shortName: 'weth',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-weth-vaults',
      vaultAddress: '0x3fd939B017b31eaADF9ae50C7fF7Fa5c0661d47C',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped Ether'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WETH (Polygon)',
    },
    {
      shortName: 'camweth',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-cam-weth-vaults',
      vaultAddress: CAMWETH_VAULT_ADDRESS,
      fallbackUnderlyingAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(
        ChainId.MATIC,
        '0x0470CD31C8FcC42671465880BA81D631F0B76C1D',
        18,
        'camWETH',
        'Compounding Aave Market WETH'
      ),
      minimumCDR: 135,
      aaveId: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f6190xd05e3e715d945b59290df0ae8ef85c1bdb684744',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Compounding Aave ETH (Polygon)',
    },
    {
      shortName: 'camaave',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-cam-aave-vaults',
      vaultAddress: CAMAAVE_VAULT_ADDRESS,
      fallbackUnderlyingAddress: AAVE_ADDRESS,
      token: new Token(
        ChainId.MATIC,
        '0xeA4040B21cb68afb94889cB60834b13427CFc4EB',
        18,
        'camAAVE',
        'Compounding Aave Market AAVE'
      ),
      minimumCDR: 135,

      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      aaveId: '0xd6df932a45c0f255f85145f286ea0b292b21c90b0xd05e3e715d945b59290df0ae8ef85c1bdb684744',
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Compounding Aave AAVE (Polygon)',
    },
    {
      shortName: 'aave',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-aave-vaults',
      vaultAddress: '0x87ee36f780ae843A78D5735867bc1c13792b7b11',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, AAVE_ADDRESS, 18, 'AAVE', 'Aave'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'AAVE (Polygon)',
    },
    {
      shortName: 'link',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-link-vaults',
      vaultAddress: '0x61167073E31b1DAd85a3E531211c7B8F1E5cAE72',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39', 18, 'LINK', 'ChainLink Token'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'LINK (Polygon)',
    },
    {
      shortName: 'crv',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/mai-finance-curve-vaults',
      vaultAddress: '0x98B5F32dd9670191568b661a3e847Ed764943875',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x172370d5Cd63279eFa6d502DAB29171933a610AF', 18, 'CRV', 'Curve Dao Token'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'CRV (Polygon)',
    },
    {
      shortName: 'wbtc',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-wbtc-vaults',
      vaultAddress: '0x37131aEDd3da288467B6EBe9A77C523A700E6Ca1',
      contractAbi: Erc20QiStablecoinwbtc__factory.abi,
      connect: Erc20QiStablecoinwbtc__factory.connect,
      token: new Token(ChainId.MATIC, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 8, 'WBTC', 'Wrapped BTC'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'WBTC (Polygon)',
    },
    {
      shortName: 'camwbtc',
      chainId: ChainId.MATIC,
      fallbackUnderlyingAddress: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-cam-wbtc-vaults',
      vaultAddress: CAMWBTC_VAULT_ADDRESS,
      token: new Token(
        ChainId.MATIC,
        '0xBa6273A78a23169e01317bd0f6338547F869E8Df',
        8,
        'camWBTC',
        'Compounding Aave Market WBTC'
      ),
      minimumCDR: 135,
      aaveId: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd60xd05e3e715d945b59290df0ae8ef85c1bdb684744',
      contractAbi: Erc20QiStablecoincamwbtc__factory.abi,
      connect: Erc20QiStablecoincamwbtc__factory.connect,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Compounding Aave WBTC (Polygon)',
    },
    {
      shortName: 'bal-old',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-bal-vaults',
      vaultAddress: '0xf6906b1Cf79Ab14c79DdC7D763c1A517cF9968A5',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3', 18, 'BAL OLD', 'Balancer'),
      minimumCDR: 130,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'dquick-old',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-dquick-vaults',
      vaultAddress: '0x9e6e3e8161Fffb31a6030E56a3E024842567154F',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', 18, 'dQUICK OLD', 'Dragon QUICK'),
      minimumCDR: 130,
      depreciated: true,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'bal',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-bal-vaults-v2',
      vaultAddress: '0x701A1824e5574B0b6b1c8dA808B184a7AB7A2867',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3', 18, 'BAL', 'Balancer'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'BAL (Polygon)',
    },
    {
      shortName: 'dquick',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-dquick-vaults-v2',
      vaultAddress: '0x649Aa6E6b6194250C077DF4fB37c23EE6c098513',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', 18, 'dQUICK', 'Dragon QUICK'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'ghst',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-ghst-vaults',
      vaultAddress: '0xF086dEdf6a89e7B16145b03a6CB0C0a9979F1433',
      contractAbi: Erc20Stablecoin__factory.abi,
      connect: Erc20Stablecoin__factory.connect,
      token: new Token(ChainId.MATIC, '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7', 18, 'GHST', 'Aavegotchi GHST'),
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'GHST (Polygon)',
    },
    {
      shortName: 'camdai',
      chainId: ChainId.MATIC,
      subgraph: 'https://api.thegraph.com/subgraphs/name/0xlaozi/qi-dao-camdai-vaults',
      vaultAddress: CAMDAI_VAULT_ADDRESS,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      fallbackUnderlyingAddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      token: new Token(
        ChainId.MATIC,
        '0xE6C23289Ba5A9F0Ef31b8EB36241D5c800889b7b',
        18,
        'camDAI',
        'Compounding Aave Market DAI'
      ),
      minimumCDR: 110,
      aaveId: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a0630xd05e3e715d945b59290df0ae8ef85c1bdb684744',
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'sdam3crv',
      vaultAddress: '0x57Cbf36788113237D64E46f25A88855c3dff1691',
      contractAbi: CrosschainQiStablecoinV2__factory.abi,
      connect: CrosschainQiStablecoinV2__factory.connect,
      chainId: ChainId.MATIC,
      minimumCDR: 110,
      token: new Token(
        ChainId.MATIC,
        '0x7d60F21072b585351dFd5E8b17109458D97ec120',
        18,
        'sdam3CRV',
        'Stake DAO am3CRV Strategy'
      ),
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'fxs',
      vaultAddress: '0xff2c44Fb819757225a176e825255a01B3B8BB051',
      chainId: ChainId.MATIC,
      contractAbi: CrosschainQiStablecoin__factory.abi,
      connect: CrosschainQiStablecoin__factory.connect,
      minimumCDR: 130,
      token: new Token(ChainId.MATIC, '0x1a3acf6D19267E2d3e7f898f42803e90C9219062', 18, 'FXS', 'Frax Share'),
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Frax Share (Polygon)',
    },
    {
      shortName: 'cxeth',
      vaultAddress: '0x7d36999a69f2B99BF3FB98866cBbE47aF43696C8',
      chainId: ChainId.MATIC,
      depreciated: true,
      disabled: true,
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.MATIC, '0xfe4546feFe124F30788c4Cc1BB9AA6907A7987F9', 18, 'cxETH', 'CelsiusX ETH'),
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'cxada',
      vaultAddress: '0x506533B9C16eE2472A6BF37cc320aE45a0a24F11',
      chainId: ChainId.MATIC,
      depreciated: true,
      disabled: true,
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(
        ChainId.MATIC,
        '0x64875Aaa68d1d5521666C67d692Ee0B926b08b2F',
        18,
        'cxADA',
        'CelsiusX Wrapped ADA'
      ),
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'cxdoge',
      vaultAddress: '0x7CbF49E4214C7200AF986bc4aACF7bc79dd9C19a',
      chainId: ChainId.MATIC,
      depreciated: true,
      disabled: true,
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(
        ChainId.MATIC,
        '0x9Bd9aD490dD3a52f096D229af4483b94D63BE618',
        18,
        'cxDOGE',
        'CelsiusX Wrapped DOGE'
      ),
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'vghst',
      vaultAddress: '0x1F0aa72b980d65518e88841bA1dA075BD43fa933',
      fallbackUnderlyingAddress: '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7',
      chainId: ChainId.MATIC,
      minimumCDR: 130,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.MATIC, '0x51195e21BDaE8722B29919db56d95Ef51FaecA6C', 18, 'vGHST', 'Gotchi Vault GHST'),
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'vGHST (Polygon)',
    },
    {
      shortName: 'celsius',
      vaultAddress: '0x178f1c95C85Fe7221C7A6a3d6F12B7Da3253eeAe',
      chainId: ChainId.MATIC,
      depreciated: true,
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoinV2__factory.abi,
      connect: CrosschainQiStablecoinV2__factory.connect,
      token: new Token(ChainId.MATIC, '0xd85d1e945766fea5eda9103f918bd915fbca63e6', 4, 'CEL', 'Celsius'),
      frontend: FRONTEND.MAI,
      version: 1,
    },
    {
      shortName: 'sand',
      vaultAddress: '0x1DCc1f864A4Bd0b8f4Ad33594B758b68e9Fa872c',
      chainId: ChainId.MATIC,
      minimumCDR: 135,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.MATIC, '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683', 18, 'SAND', 'The Sandbox Game'),
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'SAND (Polygon)',
    },
    {
      shortName: 'wmatic',
      vaultAddress: '0x305f113ff78255d4F8524c8F50C7300B91B10f6A',
      chainId: ChainId.MATIC,
      minimumCDR: 120,
      contractAbi: CrosschainQiStablecoinSlim__factory.abi,
      connect: CrosschainQiStablecoinSlim__factory.connect,
      token: new Token(ChainId.MATIC, '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 18, 'WMATIC', 'Wrapped Matic'),
      frontend: FRONTEND.MAI,
      version: 1,
      snapshotName: 'Wrapped MATIC (Polygon)',
    },
    {
      shortName: 'xxdai',
      vaultAddress: '0xaa19d0e397c964a35e6e80262c692dbfC9C23451',
      chainId: ChainId.MATIC,
      fallbackUnderlyingAddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      minimumCDR: 110,
      token: new Token(ChainId.MATIC, '0xf52B3250E026E0307d7d717AE0f331baAA4F83a8', 18, 'xxDAI', 'Tetu xxDAI'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      frontend: FRONTEND.MAI,
      version: 2,
    },
    {
      shortName: 'xxlink',
      vaultAddress: '0x11826d20B6A16A22450978642404dA95B4640123',
      chainId: ChainId.MATIC,
      fallbackUnderlyingAddress: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
      minimumCDR: 150,
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      token: new Token(ChainId.MATIC, '0x6c5e2E7dF0372f834B7F40D16Ff4333Cf49Af235', 18, 'xxLINK', 'Tetu xxLINK'),
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'xxLINK (Polygon)',
    },
    {
      shortName: 'knc',
      vaultAddress: '0xa3b0A659f2147D77A443f70D96b3cC95E7A26390',
      chainId: ChainId.MATIC,
      token: new Token(ChainId.MATIC, '0x1c954e8fe737f99f68fa1ccda3e51ebdb291948c', 18, 'KNC', 'Kyber Network Crystal'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 140,
      frontend: FRONTEND.MAI,
      snapshotName: 'KNC (Polygon)',
      version: 2,
    },
    {
      shortName: 'maidai',
      vaultAddress: '0x7d75F83f0aBe2Ece0b9Daf41CCeDdF38Cb66146b',
      chainId: ChainId.MATIC,
      token: new Token(ChainId.MATIC, '0x873f4ae80867b9f97304b9bb7ef92c4d563fa48c', 18, 'aMAIDAI', 'Arrakis MAI/DAI'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 102,
      frontend: FRONTEND.MAI,
      fallbackUnderlyingAddress: OG_MATIC_VAULT,
      version: 2,
    },
    {
      shortName: 'LSMMVT',
      connect: StableQiVault__factory.connect,
      chainId: ChainId.MATIC,
      minimumCDR: 135,
      token: new Token(
        ChainId.MATIC,
        '0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6',
        18,
        'MaticX',
        'Liquid Staking Matic'
      ),
      frontend: FRONTEND.MANHATTAN,
      vaultAddress: '0x4b7509ce029656341D0B59D387D9B5312E41615a',
      contractAbi: StableQiVault__factory.abi,
      version: 2,
    },
    {
      shortName: 'STMMVT',
      connect: StableQiVault__factory.connect,
      chainId: ChainId.MATIC,
      minimumCDR: 135,
      token: new Token(ChainId.MATIC, '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4', 18, 'stMatic', 'Staked Matic'),
      frontend: FRONTEND.MANHATTAN,
      vaultAddress: '0x34fa22892256216a659D4f635354250b4D771458',
      contractAbi: StableQiVault__factory.abi,
      version: 2,
    },
  ],
  [ChainId.METIS]: [
    {
      shortName: 'metis',
      vaultAddress: '0x10DcBEe8afA39a847707e16Aea5eb34c6b01aBA9',
      chainId: ChainId.METIS,
      token: new Token(ChainId.METIS, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', 18, 'METIS', 'Metis'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 155,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'METIS (Metis)',
    },
    {
      shortName: 'weth',
      vaultAddress: '0xC09c73F7B32573d178138E76C0e286BA21085c20',
      chainId: ChainId.METIS,
      token: new Token(ChainId.METIS, '0x420000000000000000000000000000000000000A', 18, 'WETH', 'Wrapped Ether'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'WETH (Metis)',
    },
    {
      shortName: 'wbtc',
      vaultAddress: '0xB89c1b3d9f335B9d8Bb16016F3d60160AE71041f',
      chainId: ChainId.METIS,
      token: new Token(ChainId.METIS, METIS_WBTC_ADDRESS, 8, 'WBTC', 'Wrapped BTC'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 2,
      depreciated: true,
      snapshotName: 'WBTC (Metis)',
    },
    {
      shortName: 'mwbtc',
      vaultAddress: '0x5A03716bd1f338D7849f5c9581AD5015ce0020B0',
      chainId: ChainId.METIS,
      token: new Token(ChainId.METIS, '0x433e43047b95cb83517abd7c9978bdf7005e9938', 8, 'm.WBTC', 'Metis Wrapped BTC'),
      contractAbi: StableQiVault__factory.abi,
      connect: StableQiVault__factory.connect,
      minimumCDR: 130,
      frontend: FRONTEND.MAI,
      version: 2,
      snapshotName: 'm.WBTC (Metis)',
      fallbackUnderlyingAddress: METIS_WBTC_ADDRESS
    },
  ],
}
