import { BigNumber, Contract, Signer } from 'ethers'
import BeefyZapperABI from './abis/BeefyZapper.json'
import QiZappahABI from './abis/QiZappah.json'
import ThreeStepQiZappah from './abis/ThreeStepQiZappah.json'

import {
  CAMAAVE_VAULT_ADDRESS, CAMDAI_VAULT_ADDRESS, CAMWBTC_VAULT_ADDRESS,
  CAMWETH_VAULT_ADDRESS,
  CAMWMATIC_VAULT_ADDRESS,
  ChainId, MOO_BIFI_FTM_VAULT_ADDRESS, MOO_ETH_STETH_CRV_VAULT_ADDRESS,
  MOO_SCREAM_DAI_VAULT_ADDRESS,
  MOO_SCREAM_ETH_VAULT_ADDRESS, MOO_SCREAM_LINK_VAULT_ADDRESS,
  MOO_SCREAM_WBTC_VAULT_ADDRESS,
  MOO_SCREAM_WFTM_VAULT_ADDRESS,
  MOO_WAVAX_VAULT_ADDRESS,
  WFTM_ADDRESS, WSTETH_VAULT_ADDRESS,
  YVDAI_VAULT_ADDRESS,
  YVWBTC_VAULT_ADDRESS, YVWETH_OPTIMISM_VAULT_ADDRESS,
  YVWETH_VAULT_ADDRESS,
  YVWFTM_VAULT_ADDRESS,
  YVYFI_VAULT_ADDRESS
} from './constants'
import { Token } from './entities'
import ZapMeta, {CamMeta, QiZapMeta, QiZapThreeStepMeta, ScalingInfo} from './ZapMeta'

const ftmZapperAddress = '0xE2379CB4c4627E5e9dF459Ce08c2342C696C4c1f'
const avaxZapperAddress = '0x1d0a9E2c445EB8f99767eF289832637921e6F6a5'

export async function beefyZapToVault(
  signer: Signer,
  zapperAddress: string,
  assetAddress: string,
  mooAssetAddress: string,
  mooAssetVaultAddress: string,
  amount: BigNumber,
  vaultIndex: BigNumber
) {
  const zapperContract = new Contract(zapperAddress, BeefyZapperABI, signer)
  return zapperContract.beefyZapToVault(amount, vaultIndex, assetAddress, mooAssetAddress, mooAssetVaultAddress)
}

export async function beefyZapFromVault(
  signer: Signer,
  zapperAddress: string,
  assetAddress: string,
  mooAssetAddress: string,
  mooAssetVaultAddress: string,
  amount: BigNumber,
  vaultIndex: BigNumber
) {
  const zapperContract = new Contract(zapperAddress, BeefyZapperABI, signer)
  return zapperContract.beefyZapFromVault(amount, vaultIndex, assetAddress, mooAssetAddress, mooAssetVaultAddress, {
    gasLimit: 3500000,
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
    zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer) =>
      beefyZapToVault(
        signer,
        zapperAddress, // Zapper Address
        underlying.address, // Underlying token
        mooAssetAddress, // Receipt token
        mooAssetVaultAddress, // MAI Vault address
        amount,
        vaultIndex
      ),
    zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer) =>
      beefyZapFromVault(
        signer,
        zapperAddress, // Zapper Address
        underlying.address, // Underlying token
        mooAssetAddress, // Receipt token
        mooAssetVaultAddress, // MAI Vault address
        amount,
        vaultIndex
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
      underlying: new Token(ChainId.FANTOM, '0x321162cd933e2be498cd2267a90534a804051b11', 8, 'WBTC', 'Wrapped Bitcoin'),
      underlyingPriceSourceAddress: '0x8e94C22142F4A64b99022ccDd994f4e9EC86E4B4',
      collateralScaling: { priceScalingFactor: { scalingFactor: 1e10, scaleVia: 'mul' } },
      underlyingScaling: { liquidationScalingFactor: { scalingFactor: 1e10, scaleVia: 'div' } },
      mooAssetAddress: '0xd817a100ab8a29fe3dbd925c2eb489d67f758da9',
      mooAssetVaultAddress: YVWBTC_VAULT_ADDRESS,
    }),
    [YVYFI_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x29b0da86e484e1c0029b56e817912d778ac0ec69', 18, 'YFI', 'Yearn.finance'),
      underlyingPriceSourceAddress: '0x9d5c6db3bf2904d9277a7b82698a588a05a0679a',
      mooAssetAddress: '0x2C850cceD00ce2b14AA9D658b7Cad5dF659493Db',
      mooAssetVaultAddress: YVYFI_VAULT_ADDRESS,
    }),
    [YVWETH_VAULT_ADDRESS]: beefyZapperInfo({
      vaultType: 'YEARN',
      zapperAddress: ftmZapperAddress,
      underlying: new Token(ChainId.FANTOM, '0x74b23882a30290451a17c44f4f05243b6b58c76d', 18, 'WETH', 'Wrapped Ether'),
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

const OP_THREE_STEP_ZAPPER = '0x1D864EDCA89b99580C46CEC4091103D7fb85aDCF';
export const PERF_TOKEN_ZAP_META: { [c in ChainId]?: { [s in string]: QiZapMeta | QiZapThreeStepMeta } } = {
  [ChainId.OPTIMISM]:
    {
      [WSTETH_VAULT_ADDRESS]: {
        underlyingPriceSourceAddress: '0x41878779a388585509657CE5Fb95a80050502186',
        perfToken: '0x77965B3282DFdeB258B7ad77e833ad7Ee508B878',
        underlying: new Token(ChainId.OPTIMISM, '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb', 18, 'wstETH', 'Wrapped liquid staked Ether 2.0'),
        zapperAddress: OP_THREE_STEP_ZAPPER,
        zapInFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = OP_THREE_STEP_ZAPPER
          const perfToken = '0x77965B3282DFdeB258B7ad77e833ad7Ee508B878'
          const assetAddress = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb'
          const mooAssetVaultAddress = WSTETH_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
          return zapperContract.beefyZapToVault(amount, vaultIndex, assetAddress, perfToken, mooAssetVaultAddress, {
              gasLimit: 3500000,
            })
        },
        zapOutFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = OP_THREE_STEP_ZAPPER
          const assetAddress = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb'
          const perfToken = '0x77965B3282DFdeB258B7ad77e833ad7Ee508B878'
          const mooAssetVaultAddress = WSTETH_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
          return zapperContract.beefyZapFromVault(amount, vaultIndex, assetAddress, perfToken,  mooAssetVaultAddress, {
            gasLimit: 3500000,
          })
        },
      },
      [YVWETH_OPTIMISM_VAULT_ADDRESS]: {
        underlyingPriceSourceAddress: '0x13e3ee699d1909e989722e753853ae30b17e08c5',
        underlying: new Token(ChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
        mooAssetAddress: '0x5B977577Eb8a480f63e11FC615D6753adB8652Ae',
        perfToken: '0x881Dace37C6fa4a5364Bf4806D0e9F8DAD8098e8',
        zapperAddress: '0xB0aed7923f7fBEAf5bb2caa4A049A51d638Be2c9',
        zapInFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = '0xB0aed7923f7fBEAf5bb2caa4A049A51d638Be2c9'
          const assetAddress = '0x4200000000000000000000000000000000000006'
          const mooAssetAddress = '0x5B977577Eb8a480f63e11FC615D6753adB8652Ae'
          const perfToken = '0x881Dace37C6fa4a5364Bf4806D0e9F8DAD8098e8'
          const mooAssetVaultAddress = YVWETH_OPTIMISM_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, QiZappahABI, signer)
          return zapperContract.beefyZapToVault(amount, vaultIndex, assetAddress,
            mooAssetAddress, perfToken, mooAssetVaultAddress, {
            gasLimit: 3500000,
          })
        },
        zapOutFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = '0xB0aed7923f7fBEAf5bb2caa4A049A51d638Be2c9'
          const assetAddress = '0x4200000000000000000000000000000000000006'
          const mooAssetAddress = '0x5B977577Eb8a480f63e11FC615D6753adB8652Ae'
          const perfToken = '0x881Dace37C6fa4a5364Bf4806D0e9F8DAD8098e8'
          const mooAssetVaultAddress = YVWETH_OPTIMISM_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, QiZappahABI, signer)
          return zapperContract.beefyZapFromVault(amount, vaultIndex, assetAddress,
            mooAssetAddress, perfToken, mooAssetVaultAddress, {
              gasLimit: 3500000,
            })
        },
      },
      [MOO_ETH_STETH_CRV_VAULT_ADDRESS]: {
        underlyingPriceSourceAddress: '0x41878779a388585509657CE5Fb95a80050502186',
        perfToken: '0x0A53AB9005B495398E9e4aEF29ab32E34A777AF0',
        underlying: new Token(ChainId.OPTIMISM, '0x0892a178c363b4739e5Ac89E9155B9c30214C0c0', 18, 'mooCurveWSTETH', 'Moo Curve wstETH'),
        zapperAddress: OP_THREE_STEP_ZAPPER,
        zapInFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = OP_THREE_STEP_ZAPPER
          const perfToken = '0x0A53AB9005B495398E9e4aEF29ab32E34A777AF0'
          const assetAddress = '0x0892a178c363b4739e5Ac89E9155B9c30214C0c0'
          const mooAssetVaultAddress = MOO_ETH_STETH_CRV_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
          return zapperContract.beefyZapToVault(amount, vaultIndex, assetAddress, perfToken, mooAssetVaultAddress, {
              gasLimit: 3500000,
            })
        },
        zapOutFunction: (
          amount: BigNumber,
          vaultIndex: BigNumber,
          signer: Signer,
        ) => {
          const zapperAddress = OP_THREE_STEP_ZAPPER
          const assetAddress = '0x0892a178c363b4739e5Ac89E9155B9c30214C0c0'
          const perfToken = '0x0A53AB9005B495398E9e4aEF29ab32E34A777AF0'
          const mooAssetVaultAddress = MOO_ETH_STETH_CRV_VAULT_ADDRESS
          const zapperContract = new Contract(zapperAddress, ThreeStepQiZappah, signer)
          return zapperContract.beefyZapFromVault(amount, vaultIndex, assetAddress, perfToken,  mooAssetVaultAddress, {
            gasLimit: 3500000,
          })
        },
      }
    }
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
