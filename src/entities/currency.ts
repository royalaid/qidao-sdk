// noinspection JSNonASCIINames,NonAsciiCharacters

import JSBI from 'jsbi'

import { ChainId, SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  public static readonly ETHER: Currency = new Currency(18, 'ETH', 'Ether')

  public static readonly BNB: Currency = new Currency(18, 'BNB', 'Binance Coin')

  public static readonly FTM: Currency = new Currency(18, 'FTM', 'Fantom')

  public static readonly MATIC: Currency = new Currency(18, 'MATIC', 'Matic')

  public static readonly XDAI: Currency = new Currency(18, 'XDAI', 'xDai')

  public static readonly GLMR: Currency = new Currency(18, 'GLMR', 'Glimmer')

  public static readonly AVAX: Currency = new Currency(18, 'AVAX', 'Avalanche')

  public static readonly HT: Currency = new Currency(18, 'HT', 'Heco Token')

  public static readonly ONE: Currency = new Currency(18, 'ONE', 'Harmony')

  public static readonly MOVR: Currency = new Currency(18, 'MOVR', 'Moonriver')

  public static readonly CRO: Currency = new Currency(18, 'CRO', 'Cronos')

  public static readonly SYSCOIN: Currency = new Currency(18, 'WSYS', 'Wrapped Syscoin')

  public static readonly METIS: Currency = new Currency(18, 'METIS', 'Wrapped Metis')

  public static readonly MOONBEAM: Currency = new Currency(18, 'WGLMR', 'Wrapped GLMR')

  public static readonly MILKOMEDA: Currency = new Currency(18, 'WADA', 'Wrapped ADA')

  public static readonly KAVA: Currency = new Currency(18, 'WKAVA', 'Wrapped Kava')

  public static readonly IOTEX: Currency = new Currency(18, 'WIOTX', 'Wrapped IoTeX')

  public static readonly KLAYTN: Currency = new Currency(18, 'WKLAY', 'Wrapped Klaytn')

  public static readonly CELO: Currency = new Currency(18, 'WCELO', 'Wrapped Celo')

  public static readonly AURORA: Currency = new Currency(18, 'WETH', 'Wrapped Ether')

  public static readonly BOBA: Currency = new Currency(18, 'WETH', 'Wrapped Ether')

  public static readonly CUBE: Currency = new Currency(18, 'WCUBE', 'Wrapped Cube')

  public static readonly CANTO: Currency = new Currency(18, 'WCANTO', 'Wrapped Canto')

  public static readonly NATIVE = {
    [ChainId.MAINNET]: Currency.ETHER,
    [ChainId.GÖRLI]: Currency.ETHER,
    [ChainId.KOVAN]: Currency.ETHER,
    [ChainId.FANTOM]: Currency.FTM,
    [ChainId.FANTOM_TESTNET]: Currency.FTM,
    [ChainId.MATIC]: Currency.MATIC,
    [ChainId.MATIC_TESTNET]: Currency.MATIC,
    [ChainId.XDAI]: Currency.XDAI,
    [ChainId.BSC]: Currency.BNB,
    [ChainId.BSC_TESTNET]: Currency.BNB,
    [ChainId.ARBITRUM]: Currency.ETHER,
    [ChainId.MOONBASE]: Currency.GLMR,
    [ChainId.AVALANCHE]: Currency.AVAX,
    [ChainId.FUJI]: Currency.AVAX,
    [ChainId.HECO]: Currency.HT,
    [ChainId.HECO_TESTNET]: Currency.HT,
    [ChainId.HARMONY]: Currency.ONE,
    [ChainId.HARMONY_TESTNET]: Currency.ONE,
    [ChainId.CRONOS]: Currency.CRO,
    [ChainId.MOONRIVER]: Currency.MOVR,
    [ChainId.OPTIMISM]: Currency.ETHER,
    [ChainId.SYSCOIN]: Currency.SYSCOIN,
    [ChainId.METIS]: Currency.METIS,
    [ChainId.MOONBEAM]: Currency.MOONBEAM,
    [ChainId.MILKOMEDA]: Currency.MILKOMEDA,
    [ChainId.KAVA]: Currency.KAVA,
    [ChainId.IOTEX]: Currency.IOTEX,
    [ChainId.KLAYTN]: Currency.KLAYTN,
    [ChainId.CELO]: Currency.CELO,
    [ChainId.AURORA]: Currency.AURORA,
    [ChainId.BOBA]: Currency.BOBA,
    [ChainId.CUBE]: Currency.CUBE,
    [ChainId.CANTO]: Currency.CANTO,
  }

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  public static getNativeCurrency(chainId?: ChainId) {
    if (!chainId) {
      throw Error(`No chainId ${chainId}`)
    }

    if (!(chainId in Currency.NATIVE)) {
      throw Error(`No native currency defined for chainId ${chainId}`)
    }
    return Currency.NATIVE[chainId]
  }

  public static getNativeCurrencySymbol(chainId?: ChainId) {
    const nativeCurrency = this.getNativeCurrency(chainId)
    return nativeCurrency.symbol
  }

  public static getNativeCurrencyName(chainId?: ChainId) {
    const nativeCurrency = this.getNativeCurrency(chainId)
    return nativeCurrency.name
  }

  public getSymbol(chainId?: ChainId) {
    if (!chainId) {
      return this?.symbol
    }

    if (this?.symbol === 'ETH') {
      return Currency.getNativeCurrencySymbol(chainId)
    }

    // if (this?.symbol === 'WETH') {
    //   return `W${Currency.getNativeCurrencySymbol(chainId)}`
    // }

    return this?.symbol
  }

  public getName(chainId?: ChainId) {
    if (!chainId) {
      return this?.name
    }

    if (this?.name === 'Ether') {
      return Currency.getNativeCurrencyName(chainId)
    }

    return this?.name
  }
}

const ETHER = Currency.ETHER

export { ETHER }
