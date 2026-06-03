import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { ERROR_LEVEL_MAP } from '../constants'
import qrcodegen from '../lib/qrcodegen'
import type { ErrorCorrectionLevel, ImageSettings } from '../types'
import { getImageSettings, getMarginSize } from '../utils/qr-code'

export interface UseQrcodeOptions {
  value: MaybeRefOrGetter<string | string[]>
  level: MaybeRefOrGetter<ErrorCorrectionLevel>
  minVersion: MaybeRefOrGetter<number>
  marginSize?: MaybeRefOrGetter<number | undefined>
  imageSettings?: MaybeRefOrGetter<ImageSettings | undefined>
  size: MaybeRefOrGetter<number>
  boostLevel?: MaybeRefOrGetter<boolean | undefined>
}

export const useQrcode = (options: UseQrcodeOptions) => {
  const qrcode = computed(() => {
    const value = toValue(options.value)
    const values = Array.isArray(value) ? value : [value]
    const segments = values.reduce<qrcodegen.QrSegment[]>((accum, currentValue) => {
      accum.push(...qrcodegen.QrSegment.makeSegments(currentValue))
      return accum
    }, [])

    return qrcodegen.QrCode.encodeSegments(
      segments,
      ERROR_LEVEL_MAP[toValue(options.level)],
      toValue(options.minVersion),
      undefined,
      undefined,
      toValue(options.boostLevel),
    )
  })

  const cells = computed(() => qrcode.value.getModules())
  const margin = computed(() => getMarginSize(toValue(options.marginSize)))
  const numCells = computed(() => cells.value.length + margin.value * 2)
  const calculatedImageSettings = computed(() =>
    getImageSettings(
      cells.value,
      toValue(options.size),
      margin.value,
      toValue(options.imageSettings),
    ),
  )

  return {
    qrcode,
    cells,
    margin,
    numCells,
    calculatedImageSettings,
  }
}
