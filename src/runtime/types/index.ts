import type qrcodegen from '../lib/qrcodegen'

export type Modules = ReturnType<qrcodegen.QrCode['getModules']>
export type Excavation = { x: number; y: number; w: number; h: number }
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined

export type ErrorLevelMap = {
  [index in ErrorCorrectionLevel]: qrcodegen.QrCode.Ecc
}

export type BackgroundSettings = string | GradientSettings

export type GradientSettingsType = 'linear' | 'radial'

export interface GradientSettingsStop {
  offset: string
  color: string
}

export interface GradientSettings {
  type: GradientSettingsType
  stops: GradientSettingsStop[]
  rotation?: number
}

export type DataModulesStyle =
  | 'square'
  | 'square-sm'
  | 'pinched-square'
  | 'rounded'
  | 'leaf'
  | 'vertical-line'
  | 'horizontal-line'
  | 'circuit-board'
  | 'circle'
  | 'diamond'
  | 'star'
  | 'heart'
  | 'hashtag'

export interface DataModulesSettings {
  color?: string
  style?: DataModulesStyle
  randomSize?: boolean
  size?: number
  lineWidth?: number
}

export type FinderPatternOuterStyle =
  | 'square'
  | 'pinched-square'
  | 'rounded-sm'
  | 'rounded'
  | 'rounded-lg'
  | 'circle'
  | 'inpoint-sm'
  | 'inpoint'
  | 'inpoint-lg'
  | 'outpoint-sm'
  | 'outpoint'
  | 'outpoint-lg'
  | 'leaf-sm'
  | 'leaf'
  | 'leaf-lg'

export interface FinderPatternOuterSettings {
  color?: string
  style?: FinderPatternOuterStyle
}

export type FinderPatternInnerStyle =
  | FinderPatternOuterStyle
  | 'diamond'
  | 'star'
  | 'heart'
  | 'hashtag'
  | 'microchip'

export interface FinderPatternInnerSettings {
  color?: string
  style?: FinderPatternInnerStyle
}

export type DownloadFileFormat = 'svg' | 'png' | 'jpeg'

export interface DownloadOptions {
  name?: string
  format?: DownloadFileFormat
  size?: number
}

export interface ImageSettings {
  src: string
  height: number
  width: number
  excavate?: boolean
  x?: number
  y?: number
  opacity?: number
  crossOrigin?: CrossOrigin
}

export interface QrcodeNuxtProps {
  value: string | string[]
  size?: number
  level?: ErrorCorrectionLevel
  marginSize?: number
  minVersion?: number
  boostLevel?: boolean
  background?: BackgroundSettings
  gradient?: GradientSettings
  dataModulesSettings?: DataModulesSettings
  finderPatternOuterSettings?: FinderPatternOuterSettings
  finderPatternInnerSettings?: FinderPatternInnerSettings
  imageSettings?: ImageSettings
  svgProps?: Record<string, unknown>
}

export interface QrCodeNuxt {
  svg: SVGSVGElement | null
  download: (options?: DownloadOptions) => void
}

export interface DataModulesNeighbours {
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
  count: number
}

export interface CalculatedImageSettings {
  x: number
  y: number
  h: number
  w: number
  excavation: Excavation | null
  opacity: number
  crossOrigin: CrossOrigin
}
