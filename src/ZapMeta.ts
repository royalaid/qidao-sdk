import { BigNumber, Signer } from 'ethers'
import {Token} from "./entities";

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
    mooAssetAddress: string,
    zapperAddress: string
    zapInFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer) => any
    zapOutFunction: (amount: BigNumber, vaultIndex: BigNumber, signer: Signer) => any
    collateralScaling?: ScalingInfo
    underlyingScaling?: ScalingInfo
}

export interface CamMeta {
    underlying: Token
    underlyingPriceSourceAddress: string
    amTokenAddress: string
    camTokenAddress: string
}
