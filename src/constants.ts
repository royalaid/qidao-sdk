import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    MATIC = 137,
    MATIC_TESTNET = 80001,
    FANTOM = 250,
    FANTOM_TESTNET = 4002,
    XDAI = 100,
    BSC = 56,
    BSC_TESTNET = 97,
    ARBITRUM = 42161,
    MOONBASE = 1287,
    AVALANCHE = 43114,
    FUJI = 43113,
    HECO = 128,
    HECO_TESTNET = 256,
    HARMONY = 1666600000,
    HARMONY_TESTNET = 1666700000,
    MOONRIVER = 1285,
    CRONOS = 25,
    OPTIMISM = 10,
    SYSCOIN = 57,
    METIS = 1088,
    MOONBEAM = 1284,
    MILKOMEDA = 2001,
    KAVA = 2222,
    IOTEX = 4689,
    KLAYTN = 8217,
    CELO = 42220,
    AURORA = 1313161554,
    BOBA = 288,
    CUBE = 1818
}

export enum TradeType {
    EXACT_INPUT,
    EXACT_OUTPUT
}

export enum Rounding {
    ROUND_DOWN,
    ROUND_HALF_UP,
    ROUND_UP
}

export const INIT_CODE_HASH: string = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'
export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
    uint8 = 'uint8',
    uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
    [SolidityType.uint8]: JSBI.BigInt('0xff'),
    [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
