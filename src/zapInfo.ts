import { BigNumber, CallOverrides, Contract, Signer } from 'ethers'
import BeefyZapperABI from './abis/BeefyZapper.json'
import QiZappahABI from './abis/QiZappah.json'
import ThreeStepQiZappah from './abis/ThreeStepQiZappah.json'

import {
  ARBI_GAINS_ZAPPER,
  ARBI_GDAI_VAULT_ADDRESS,
  ARBI_KNC_VAULT_ADDRESS,
  ARBI_THREE_STEP_ZAPPER,
  CAMAAVE_VAULT_ADDRESS,
  CAMDAI_VAULT_ADDRESS,
  CAMWBTC_VAULT_ADDRESS,
  CAMWETH_VAULT_ADDRESS,
  CAMWMATIC_VAULT_ADDRESS,
  ChainId,
  GDAI_VAULT_ADDRESS,
  MATIC_THREE_STEP_ZAPPER,
  MATIC_WSTETH_VAULT_ADDRESS,
  MATICX_MAI_VAULT_ADDRESS,
  MOO_BIFI_FTM_VAULT_ADDRESS,
  MOO_ETH_STETH_CRV_VAULT_ADDRESS,
  MOO_SCREAM_DAI_VAULT_ADDRESS,
  MOO_SCREAM_ETH_VAULT_ADDRESS,
  MOO_SCREAM_LINK_VAULT_ADDRESS,
  MOO_SCREAM_WBTC_VAULT_ADDRESS,
  MOO_SCREAM_WFTM_VAULT_ADDRESS,
  MOO_WAVAX_VAULT_ADDRESS,
  OP_KNC_VAULT_ADDRESS,
  OP_QI_ZAPPER,
  OP_THREE_STEP_ZAPPER,
  STMATIC_MAI_VAULT_ADDRESS,
  WFTM_ADDRESS,
  WSTETH_VAULT_ADDRESS,
  YVDAI_VAULT_ADDRESS,
  YVWBTC_VAULT_ADDRESS,
  YVWETH_OPTIMISM_VAULT_ADDRESS,
  YVWETH_VAULT_ADDRESS,
  YVWFTM_VAULT_ADDRESS,
  YVYFI_VAULT_ADDRESS,
} from './constants'
import { GainsZapper__factory } from './contracts'
import { Token } from './entities'
import ZapMeta, { CamMeta, QiZapGainsMeta, QiZapMeta, QiZapThreeStepMeta, ScalingInfo } from './ZapMeta'

const ftmZapperAddress = '0xE2379CB4c4627E5e9dF459Ce08c2342C696C4c1f'
const avaxZapperAddress = '0x1d0a9E2c445EB8f99767eF289832637921e6F6a5'

export async function beefyZapToVault(
  signer: Signer,
  zapperAddress: string,
  assetAddress: string,
  mooAssetAddress: string,
  mooAssetVaultAddress: string,
  amount: BigNumber,
  vaultIndex: BigNumber,
  overrides?: CallOverrides
) {
  const zapperContract = new Contract(zapperAddress, BeefyZapperABI, signer)
  return zapperContract.beefyZapToVault(
    amount,
    vaultIndex,
    assetAddress,
    mooAssetAddress,
    mooAssetVaultAddress,
    overrides
  )
}

export async function beefyZapFromVault(
  signer: Signer,
  zapperAddress: string,
  assetAddress: string,
  mooAssetAddress: string,
  mooAssetVaultAddress: string,
  amount: BigNumber,
  vaultIndex: BigNumber,
  overrides?: CallOverrides
) {
  const zapperContract = new Contract(zapperAddress, BeefyZapperABI, signer)
  return zapperContract.beefyZapFromVault(amount, vaultIndex, assetAddress, mooAssetAddress, mooAssetVaultAddress, {
    gasLimit: 3500000,
    ...overrides,
  })
}

function beefyZapperInfo({
  vaultType,
  underlying,
  underlyingPriceSourceAddress,
  collateralScaling,
  underlyingScaling,
  mooAssetAddress,
  mooAssetVaultAddress,
  zapperAddress,
}: {
  vaultType: 'YEARN' | 'BEEFY'
  underlying: Token
  underlyingPriceSourceAddress: string
  collateralScaling?: ScalingInfo
  underlyingScaling?: ScalingInfo
  mooAssetAddress: string
  mooAssetVaultAddress: string
  zapperAddress: string
}): ZapMeta {
  return {
    vaultType: vaultType,
    zapperAddress: zapperAddress,
    underlying: underlying,
    underlyingPriceSourceAddress: underlyingPriceSourceAddress,
    mooAssetAddress,
    collateralScaling,
    underlyingScaling,
    zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) =>
      beefyZapToVault(
        signer,
        zapperAddress, // Zapper Address
        underlying.address, // Underlying token
        mooAssetAddress, // Receipt token
        mooAssetVaultAddress, // MAI Vault address
        amount,
        vaultIndex,
        overrides
      ),
    zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) =>
      beefyZapFromVault(
        signer,
        zapperAddress, // Zapper Address
        underlying.address, // Underlying token
        mooAssetAddress, // Receipt token
        mooAssetVaultAddress, // MAI Vault address
        amount,
        vaultIndex,
        overrides
      ),
  }
}

export const ZAP_META: { [c in ChainId]?: { [s in string]: ZapMeta } } = {
  [ChainId.AVALANCHE]: {
    [MOO_WAVAX_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: avaxZapperAddress,
      underlying: new Token(
        ChainId.AVALANCHE,
        '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        18,
        'WAVAX',
        'Wrapped AVAX'
      ),
      underlyingPriceSourceAddress: '0x0A77230d17318075983913bC2145DB16C7366156',
      mooAssetAddress: '0x1B156C5c75E9dF4CAAb2a5cc5999aC58ff4F9090',
      mooAssetVaultAddress: MOO_WAVAX_VAULT_ADDRESS,
    }),
  },
  [ChainId.FANTOM]: {
    [YVWFTM_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, WFTM_ADDRESS, 18, 'WFTM', 'Fantom'),
      underlyingPriceSourceAddress: '0xf4766552D15AE4d256Ad41B6cf2933482B0680dc',
      mooAssetAddress: '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0',
      mooAssetVaultAddress: YVWFTM_VAULT_ADDRESS,
    }),
    [YVWBTC_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x321162Cd933E2Be498Cd2267a90534A804051b11', 8, 'WBTC', 'Wrapped Bitcoin'),
      underlyingPriceSourceAddress: '0x8e94C22142F4A64b99022ccDd994f4e9EC86E4B4',
      collateralScaling: { priceScalingFactor: { scalingFactor: 1e10, scaleVia: 'mul' } },
      underlyingScaling: { liquidationScalingFactor: { scalingFactor: 1e10, scaleVia: 'div' } },
      mooAssetAddress: '0xd817A100AB8A29fE3DBd925c2EB489D67F758DA9',
      mooAssetVaultAddress: YVWBTC_VAULT_ADDRESS,
    }),
    [YVYFI_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x29b0Da86e484E1C0029B56e817912d778aC0EC69', 18, 'YFI', 'Yearn.finance'),
      underlyingPriceSourceAddress: '0x9d5c6db3bf2904d9277a7b82698a588a05a0679a',
      mooAssetAddress: '0x2C850cceD00ce2b14AA9D658b7Cad5dF659493Db',
      mooAssetVaultAddress: YVYFI_VAULT_ADDRESS,
    }),
    [YVWETH_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'WETH', 'Wrapped Ether'),
      underlyingPriceSourceAddress: '0x425eA1422DBF9764D9f84e6d581c3e0187C5A340',
      mooAssetAddress: '0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7',
      mooAssetVaultAddress: YVWETH_VAULT_ADDRESS,
    }),
    [YVDAI_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18, 'DAI', 'Dai Stablecoin'),
      underlyingPriceSourceAddress: '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52',
      mooAssetAddress: '0x637ec617c86d24e421328e6caea1d92114892439',
      mooAssetVaultAddress: YVDAI_VAULT_ADDRESS,
    }),
    [MOO_SCREAM_WBTC_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x321162Cd933E2Be498Cd2267a90534A804051b11', 8, 'BTC', 'Bitcoin'),
      underlyingPriceSourceAddress: '0x8e94C22142F4A64b99022ccDd994f4e9EC86E4B4',
      mooAssetAddress: '0x97927abfe1abbe5429cbe79260b290222fc9fbba',
      mooAssetVaultAddress: MOO_SCREAM_WBTC_VAULT_ADDRESS,
      collateralScaling: { liquidationScalingFactor: { scalingFactor: 10 ** 10, scaleVia: 'div' } },
    }),
    [MOO_SCREAM_DAI_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18, 'DAI', 'Dai Stablecoin'),
      underlyingPriceSourceAddress: '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52',
      mooAssetAddress: '0x920786cff2A6f601975874Bb24C63f0115Df7dc8',
      mooAssetVaultAddress: MOO_SCREAM_DAI_VAULT_ADDRESS,
    }),
    [MOO_SCREAM_ETH_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'ETH', 'Ethereum'),
      underlyingPriceSourceAddress: '0x11DdD3d147E5b83D01cee7070027092397d63658',
      mooAssetAddress: '0x0a03D2C1cFcA48075992d810cc69Bd9FE026384a',
      mooAssetVaultAddress: MOO_SCREAM_ETH_VAULT_ADDRESS,
    }),
    [MOO_SCREAM_WFTM_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, WFTM_ADDRESS, 18, 'WFTM', 'Wrapped Fantom'),
      underlyingPriceSourceAddress: '0xf4766552D15AE4d256Ad41B6cf2933482B0680dc',
      mooAssetAddress: '0x49c68eDb7aeBd968F197121453e41b8704AcdE0C',
      mooAssetVaultAddress: MOO_SCREAM_WFTM_VAULT_ADDRESS,
    }),
    [MOO_SCREAM_LINK_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8', 18, 'LINK', 'ChainLink'),
      underlyingPriceSourceAddress: '0x221C773d8647BC3034e91a0c47062e26D20d97B4',
      mooAssetAddress: '0x6DfE2AAEA9dAadADf0865B661b53040E842640f8',
      mooAssetVaultAddress: MOO_SCREAM_LINK_VAULT_ADDRESS,
    }),
    [MOO_BIFI_FTM_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'BEEFY',
      underlying: new Token(ChainId.FANTOM, '0xd6070ae98b8069de6B494332d1A1a81B6179D960', 18, 'BIFI', 'Beefy.Finance'),
      underlyingPriceSourceAddress: '0x4F5Cc6a2291c964dEc4C7d6a50c0D89492d4D91B',
      mooAssetAddress: '0xbF07093ccd6adFC3dEB259C557b61E94c1F66945',
      mooAssetVaultAddress: MOO_BIFI_FTM_VAULT_ADDRESS,
      zapperAddress: ftmZapperAddress,
    }),
  },
}

function generateQiZapper({
  perfToken,
  underlyingPriceSourceAddress,
  underlying,
  mooAssetAddress,
  mooAssetVaultAddress,
  zapperAddress,
}: {
  perfToken: string
  underlyingPriceSourceAddress: string
  underlying: Token
  mooAssetAddress: string
  mooAssetVaultAddress: string
  zapperAddress: string
}) {
  return {
    underlyingPriceSourceAddress,
    perfToken,
    underlying,
    mooAssetAddress,
    zapperAddress,
    zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
      const zapperContract = new Contract(zapperAddress, QiZappahABI, signer)
      return zapperContract.beefyZapToVault(
        amount,
        vaultIndex,
        underlying.address,
        mooAssetAddress,
        perfToken,
        mooAssetVaultAddress,
        {
          ...overrides,
        }
      )
    },
    zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
      const zapperContract = new Contract(zapperAddress, QiZappahABI, signer)
      return zapperContract.beefyZapFromVault(
        amount,
        vaultIndex,
        underlying.address,
        mooAssetAddress,
        perfToken,
        mooAssetVaultAddress,
        {
          ...overrides,
        }
      )
    },
  }
}

function generateThreeStepZapper({
  perfToken,
  underlyingPriceSourceAddress,
  underlying,
  mooAssetVaultAddress,
  zapperAddress,
}: {
  perfToken: string
  underlyingPriceSourceAddress: string
  underlying: Token
  mooAssetVaultAddress: string
  zapperAddress: string
}) {
  return {
    underlyingPriceSourceAddress,
    perfToken,
    underlying,
    zapperAddress,
    zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
      const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
      return zapperContract.beefyZapToVault(amount, vaultIndex, underlying.address, perfToken, mooAssetVaultAddress, {
        ...overrides,
      })
    },
    zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
      const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
      return zapperContract.beefyZapFromVault(amount, vaultIndex, underlying.address, perfToken, mooAssetVaultAddress, {
        ...overrides,
      })
    },
  }
}

export type QiZapAnyMeta = QiZapGainsMeta | QiZapMeta | QiZapThreeStepMeta

generateThreeStepZapper({
  perfToken: '0x4fC050d75dBA5bF2d6EbD3667FFEc731A45B1f35',
  mooAssetVaultAddress: ARBI_GDAI_VAULT_ADDRESS,
  underlying: new Token(ChainId.ARBITRUM, '0xd85E038593d7A098614721EaE955EC2022B9B91B', 18, 'gDAI'),
  underlyingPriceSourceAddress: '0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB',
  zapperAddress: ARBI_THREE_STEP_ZAPPER,
})

const ARBI_DAI_ADDRESS = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
const ARBI_GDAI_ADDRESS = '0xd85E038593d7A098614721EaE955EC2022B9B91B'
const ARBI_GDAI_PERF_TOKEN = '0x4fC050d75dBA5bF2d6EbD3667FFEc731A45B1f35'
export const PERF_TOKEN_ZAP_META: {
  [c in ChainId]?: { [s in string]: QiZapAnyMeta }
} = {
  [ChainId.ARBITRUM]: {
    [ARBI_GDAI_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB',
      depositTokens: [
        new Token(ChainId.ARBITRUM, ARBI_DAI_ADDRESS, 18, 'DAI'),
        new Token(ChainId.ARBITRUM, ARBI_GDAI_ADDRESS, 18, 'gDAI'),
      ],
      perfToken: ARBI_GDAI_PERF_TOKEN,
      withdrawToken: new Token(ChainId.ARBITRUM, ARBI_GDAI_ADDRESS, 18, 'gDAI'),
      zapperAddresses: {
        [ARBI_DAI_ADDRESS]: ARBI_GAINS_ZAPPER,
        [ARBI_GDAI_ADDRESS]: ARBI_THREE_STEP_ZAPPER,
      },
      zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
        const zapperContract = new Contract(ARBI_THREE_STEP_ZAPPER, ThreeStepQiZappah, signer)
        return zapperContract.beefyZapFromVault(
          amount,
          vaultIndex,
          ARBI_GDAI_ADDRESS,
          ARBI_GDAI_PERF_TOKEN,
          ARBI_GDAI_VAULT_ADDRESS,
          {
            ...overrides,
          }
        )
      },
      zapInFunctions: {
        [ARBI_DAI_ADDRESS]: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
          const zapperContract = GainsZapper__factory.connect(ARBI_GAINS_ZAPPER, signer)
          return zapperContract.gainsZapToVault(
            amount,
            vaultIndex,
            ARBI_DAI_ADDRESS,
            ARBI_GDAI_ADDRESS,
            ARBI_GDAI_PERF_TOKEN,
            ARBI_GDAI_VAULT_ADDRESS,
            {
              ...overrides,
            }
          )
        },
        [ARBI_GDAI_ADDRESS]: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, overrides?: CallOverrides) => {
          const zapperContract = new Contract(ARBI_THREE_STEP_ZAPPER, ThreeStepQiZappah, signer)
          return zapperContract.beefyZapToVault(
            amount,
            vaultIndex,
            ARBI_GDAI_ADDRESS,
            ARBI_GDAI_PERF_TOKEN,
            ARBI_GDAI_VAULT_ADDRESS,
            {
              ...overrides,
            }
          )
        },
      },
    },
    [ARBI_KNC_VAULT_ADDRESS]: generateThreeStepZapper({
      perfToken: '0xe7d5De69F42881cFEABAc44eaf9c782A08B083B8',
      mooAssetVaultAddress: ARBI_KNC_VAULT_ADDRESS,
      underlying: new Token(
        ChainId.ARBITRUM,
        '0xe4DDDfe67E7164b0FE14E218d80dC4C08eDC01cB',
        18,
        'KNC',
        'Kyber Network Crystal (v2)'
      ),
      underlyingPriceSourceAddress: '0xbF539d4c2106dd4D9AB6D56aed3d9023529Db145',
      zapperAddress: ARBI_THREE_STEP_ZAPPER,
    }),
  },
  [ChainId.OPTIMISM]: {
    [WSTETH_VAULT_ADDRESS]: generateThreeStepZapper({
      perfToken: '0x926B92B15385981416a5E0Dcb4f8b31733d598Cf',
      mooAssetVaultAddress: WSTETH_VAULT_ADDRESS,
      underlying: new Token(
        ChainId.OPTIMISM,
        '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb',
        18,
        'wstETH',
        'Wrapped liquid staked Ether 2.0'
      ),
      underlyingPriceSourceAddress: '0x41878779a388585509657CE5Fb95a80050502186',
      zapperAddress: OP_THREE_STEP_ZAPPER,
    }),
    [YVWETH_OPTIMISM_VAULT_ADDRESS]: generateQiZapper({
      underlyingPriceSourceAddress: '0x13e3ee699d1909e989722e753853ae30b17e08c5',
      perfToken: '0x22f39d6535df5767f8f57fee3b2f941410773ec4',
      mooAssetAddress: '0x5B977577Eb8a480f63e11FC615D6753adB8652Ae',
      mooAssetVaultAddress: YVWETH_OPTIMISM_VAULT_ADDRESS,
      zapperAddress: OP_QI_ZAPPER,
      underlying: new Token(
        ChainId.OPTIMISM,
        '0x4200000000000000000000000000000000000006',
        18,
        'WETH',
        'Wrapped Ether'
      ),
    }),
    [MOO_ETH_STETH_CRV_VAULT_ADDRESS]: generateThreeStepZapper({
      underlyingPriceSourceAddress: '0x41878779a388585509657CE5Fb95a80050502186',
      perfToken: '0x480798FAC621adD14113ECC82638305c260cEaf1',
      underlying: new Token(
        ChainId.OPTIMISM,
        '0x0892a178c363b4739e5Ac89E9155B9c30214C0c0',
        18,
        'mooCurveWSTETH',
        'Moo Curve wstETH'
      ),
      mooAssetVaultAddress: MOO_ETH_STETH_CRV_VAULT_ADDRESS,
      zapperAddress: OP_THREE_STEP_ZAPPER,
    }),
    [OP_KNC_VAULT_ADDRESS]: generateThreeStepZapper({
      perfToken: '0x80ff0aA765e49D451FF7C7D046f7e8ba732d8bb5',
      mooAssetVaultAddress: OP_KNC_VAULT_ADDRESS,
      underlying: new Token(
        ChainId.ARBITRUM,
        '0xa00E3A3511aAC35cA78530c85007AFCd31753819',
        18,
        'KNC',
        'Kyber Network Crystal (v2)'
      ),
      underlyingPriceSourceAddress: '0xCB24d22aF35986aC1feb8874AdBbDF68f6dC2e96',
      zapperAddress: OP_THREE_STEP_ZAPPER,
    }),
  },
  [ChainId.MATIC]: {
    [STMATIC_MAI_VAULT_ADDRESS]: generateThreeStepZapper({
      underlyingPriceSourceAddress: '0x97371dF4492605486e23Da797fA68e55Fc38a13f',
      perfToken: '0x4c8DFb55D08bD030814cB6fE774420f3C01a5EdB',
      underlying: new Token(
        ChainId.MATIC,
        '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
        18,
        'stMATIC',
        'Staked MATIC (PoS)'
      ),
      mooAssetVaultAddress: STMATIC_MAI_VAULT_ADDRESS,
      zapperAddress: MATIC_THREE_STEP_ZAPPER,
    }),
    [GDAI_VAULT_ADDRESS]: generateThreeStepZapper({
      underlyingPriceSourceAddress: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D',
      perfToken: '0x2DeA91E68FDC5693B63924c5FEE0a28cFb78a801',
      underlying: new Token(
        ChainId.MATIC,
        '0x91993f2101cc758D0dEB7279d41e880F7dEFe827',
        18,
        'gDAI',
        'Gains Network DAI'
      ),
      mooAssetVaultAddress: GDAI_VAULT_ADDRESS,
      zapperAddress: MATIC_THREE_STEP_ZAPPER,
    }),

    [MATICX_MAI_VAULT_ADDRESS]: generateThreeStepZapper({
      underlyingPriceSourceAddress: '0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403',
      perfToken: '0x2acD702F7D35d3D2915663d7f7CbDF2863Ec6E79',
      underlying: new Token(
        ChainId.MATIC,
        '0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6',
        18,
        'MaticX',
        'Liquid Staking Matic (PoS)'
      ),
      mooAssetVaultAddress: MATICX_MAI_VAULT_ADDRESS,
      zapperAddress: MATIC_THREE_STEP_ZAPPER,
    }),

    [MATIC_WSTETH_VAULT_ADDRESS]: generateThreeStepZapper({
      underlyingPriceSourceAddress: '0x10f964234cae09cB6a9854B56FF7D4F38Cda5E6a',
      perfToken: '0xcC03032fBf096F14a2DE8809c79d8b584151212B',
      underlying: new Token(
        ChainId.MATIC,
        '0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD',
        18,
        'wstETH',
        'Wrapped liquid staked Ether 2.0'
      ),
      mooAssetVaultAddress: MATIC_WSTETH_VAULT_ADDRESS,
      zapperAddress: MATIC_THREE_STEP_ZAPPER,
    }),
  },
}

export const CAMZAPPER_ADDRESS = {
  [ChainId.MATIC]: '0xd8d22817D216164D09Ca5909A70bEcA608D65Aa9',
}

export const CAM_META: { [c in ChainId]?: { [s in string]: CamMeta } } = {
  [ChainId.MATIC]: {
    [CAMWMATIC_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
      underlying: new Token(ChainId.MATIC, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC'),
      amTokenAddress: '0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4',
      camTokenAddress: '0x7068Ea5255cb05931EFa8026Bd04b18F3DeB8b0B',
    },
    [CAMWETH_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
      underlying: new Token(ChainId.MATIC, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped Ether'),
      amTokenAddress: '0x28424507fefb6f7f8E9D3860F56504E4e5f5f390',
      camTokenAddress: '0x0470CD31C8FcC42671465880BA81D631F0B76C1D',
    },
    [CAMAAVE_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0x72484B12719E23115761D5DA1646945632979bB6',
      underlying: new Token(ChainId.MATIC, '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', 18, 'AAVE', 'Aave'),
      amTokenAddress: '0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360',
      camTokenAddress: '0xeA4040B21cb68afb94889cB60834b13427CFc4EB',
    },
    [CAMWBTC_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6',
      underlying: new Token(ChainId.MATIC, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 8, 'WBTC', 'Wrapped BTC'),
      amTokenAddress: '0x5c2ed810328349100A66B82b78a1791B101C9D61',
      camTokenAddress: '0xBa6273A78a23169e01317bd0f6338547F869E8Df',
    },
    [CAMDAI_VAULT_ADDRESS]: {
      underlyingPriceSourceAddress: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D',
      underlying: new Token(ChainId.MATIC, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin'),
      amTokenAddress: '0x27F8D03b3a2196956ED754baDc28D73be8830A6e',
      camTokenAddress: '0xE6C23289Ba5A9F0Ef31b8EB36241D5c800889b7b',
    },
  },
}
