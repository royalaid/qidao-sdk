import { BigNumber, CallOverrides, Signer } from 'ethers'
import { Token } from './entities'

export interface ScalingDetails {
  scaleVia: 'mul' | 'div'
  scalingFactor: number
}

export interface ScalingInfo {
  priceScalingFactor?: ScalingDetails
  liquidationScalingFactor?: ScalingDetails
}

export default interface ZapMeta {
  vaultType: 'YEARN' | 'BEEFY'
  underlying: Token
  underlyingPriceSourceAddress: string
  mooAssetAddress: string
  zapperAddress: string
  zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
  zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
  collateralScaling?: ScalingInfo
  underlyingScaling?: ScalingInfo
}

export interface CamMeta {
  underlying: Token
  underlyingPriceSourceAddress: string
  amTokenAddress: string
  camTokenAddress: string
}

export interface QiZapThreeStepMeta {
  underlying: Token
  underlyingPriceSourceAddress: string
  perfToken: string
  zapperAddress: string
  zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
  zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
}

export interface QiZapMeta {
  underlying: Token
  underlyingPriceSourceAddress: string
  mooAssetAddress: string
  perfToken: string
  zapperAddress: string
  zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
  zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer, override?: CallOverrides) => any
}

export type QiZapGainsMeta = Omit<QiZapMeta, 'underlying' | 'mooAssetAddress'> & {
  depositToken: Token
  withdrawToken: Token
}
