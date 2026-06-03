<script setup lang="ts">
import { computed, useAttrs, useId, useTemplateRef } from 'vue'
import {
  DEFAULT_BGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
  BG_GRADIENT_ID,
  DEFAULT_FILENAME,
  GRADIENT_ID,
} from '../constants'
import { useQrcode } from '../composables/useQrcode'
import type { DownloadOptions, QrcodeNuxtProps } from '../types'
import { downloadRaster, downloadSVG } from '../utils/download'
import { excavateModules } from '../utils/qr-code'
import {
  createDataModulesDescriptor,
  createFinderPatternInnerDescriptors,
  createFinderPatternOuterDescriptors,
} from '../utils/render'
import { calculateGradientVectors } from '../utils/svg'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<QrcodeNuxtProps>(), {
  size: DEFAULT_SIZE,
  level: DEFAULT_LEVEL,
  minVersion: DEFAULT_MINVERSION,
  background: DEFAULT_BGCOLOR,
})

const attrs = useAttrs()
const svgRef = useTemplateRef<SVGSVGElement>('svgRef')
const id = useId().replace(/[^A-Za-z0-9_-]/g, '')
const gradientId = `${GRADIENT_ID}-${id}`
const bgGradientId = `${BG_GRADIENT_ID}-${id}`

const { cells, margin, numCells, calculatedImageSettings } = useQrcode({
  value: computed(() => props.value),
  level: computed(() => props.level),
  minVersion: computed(() => props.minVersion),
  marginSize: computed(() => props.marginSize),
  imageSettings: computed(() => props.imageSettings),
  size: computed(() => props.size),
  boostLevel: computed(() => props.boostLevel),
})

const modules = computed(() => {
  const excavation = calculatedImageSettings.value?.excavation
  return excavation ? excavateModules(cells.value, excavation) : cells.value
})

const valueSeed = computed(() =>
  Array.isArray(props.value) ? props.value.join('\u001f') : props.value,
)

const svgAttributes = computed(() => {
  const merged = {
    height: props.size,
    width: props.size,
    viewBox: `0 0 ${numCells.value} ${numCells.value}`,
    role: 'img',
    'aria-label':
      (attrs['aria-label'] as string | undefined) ||
      (props.svgProps?.['aria-label'] as string | undefined) ||
      'QR Code',
    ...props.svgProps,
    ...attrs,
  }

  return merged
})

const gradientVectors = computed(() => calculateGradientVectors(props.gradient?.rotation || 0))
const backgroundGradientVectors = computed(() => {
  if (!props.background || typeof props.background === 'string') return null
  return calculateGradientVectors(props.background.rotation || 0)
})

const backgroundPath = computed(() => `M0,0 h${numCells.value}v${numCells.value}H0z`)
const backgroundFill = computed(() => {
  if (!props.background) return null
  return typeof props.background === 'string'
    ? props.background
    : `url(#${bgGradientId})`
})

const outerFinderPatterns = computed(() =>
  createFinderPatternOuterDescriptors({
    modules: modules.value,
    margin: margin.value,
    settings: props.finderPatternOuterSettings,
    gradient: props.gradient,
    gradientId,
  }),
)

const innerFinderPatterns = computed(() =>
  createFinderPatternInnerDescriptors({
    modules: modules.value,
    margin: margin.value,
    settings: props.finderPatternInnerSettings,
    gradient: props.gradient,
    gradientId,
  }),
)

const dataModules = computed(() =>
  createDataModulesDescriptor({
    modules: modules.value,
    margin: margin.value,
    settings: props.dataModulesSettings,
    gradient: props.gradient,
    gradientId,
    valueSeed: valueSeed.value,
  }),
)

const imageAttributes = computed(() => {
  if (!props.imageSettings || !calculatedImageSettings.value) return null

  return {
    href: props.imageSettings.src,
    height: calculatedImageSettings.value.h,
    width: calculatedImageSettings.value.w,
    x: calculatedImageSettings.value.x + margin.value,
    y: calculatedImageSettings.value.y + margin.value,
    preserveAspectRatio: 'none',
    opacity: calculatedImageSettings.value.opacity,
    crossorigin: calculatedImageSettings.value.crossOrigin,
  }
})

const download = ({
  name: fileName = DEFAULT_FILENAME,
  format: fileFormat = 'svg',
  size: fileSize = 500,
}: DownloadOptions = {}) => {
  if (fileFormat === 'svg') {
    downloadSVG({ svg: svgRef.value, fileSize, fileName })
    return
  }

  downloadRaster({
    svg: svgRef.value,
    fileSize,
    fileName,
    fileFormat,
    imageSettings: props.imageSettings,
    calculatedImageSettings: calculatedImageSettings.value,
    size: props.size,
    numCells: numCells.value,
    margin: margin.value,
  })
}

defineExpose({
  svg: svgRef,
  download,
})
</script>

<template>
  <svg ref="svgRef" v-bind="svgAttributes">
    <defs v-if="props.gradient">
      <linearGradient
        v-if="props.gradient.type === 'linear'"
        :id="gradientId"
        gradientUnits="userSpaceOnUse"
        v-bind="gradientVectors"
      >
        <stop
          v-for="(stop, index) in props.gradient.stops"
          :key="`gradient-${index}`"
          :offset="stop.offset"
          :stop-color="stop.color"
        />
      </linearGradient>
      <radialGradient
        v-else
        :id="gradientId"
        gradientUnits="userSpaceOnUse"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop
          v-for="(stop, index) in props.gradient.stops"
          :key="`gradient-${index}`"
          :offset="stop.offset"
          :stop-color="stop.color"
        />
      </radialGradient>
    </defs>

    <defs v-if="props.background && typeof props.background !== 'string'">
      <linearGradient
        v-if="props.background.type === 'linear'"
        :id="bgGradientId"
        gradientUnits="userSpaceOnUse"
        v-bind="backgroundGradientVectors"
      >
        <stop
          v-for="(stop, index) in props.background.stops"
          :key="`bg-gradient-${index}`"
          :offset="stop.offset"
          :stop-color="stop.color"
        />
      </linearGradient>
      <radialGradient
        v-else
        :id="bgGradientId"
        gradientUnits="userSpaceOnUse"
        cx="50%"
        cy="50%"
        r="50%"
      >
        <stop
          v-for="(stop, index) in props.background.stops"
          :key="`bg-gradient-${index}`"
          :offset="stop.offset"
          :stop-color="stop.color"
        />
      </radialGradient>
    </defs>

    <path
      v-if="backgroundFill"
      :fill="backgroundFill"
      :d="backgroundPath"
      data-testid="background"
    />

    <template v-for="(element, index) in outerFinderPatterns" :key="`outer-${index}`">
      <path
        v-if="element.type === 'path'"
        :fill="element.fill"
        :d="element.d"
        :style="element.style"
        data-testid="finder-patterns-outer"
      />
      <rect
        v-else
        :x="element.x"
        :y="element.y"
        :width="element.width"
        :height="element.height"
        :fill="element.fill"
        :rx="element.rx"
        :style="element.style"
        data-testid="finder-patterns-outer"
      />
    </template>

    <template v-for="(element, index) in innerFinderPatterns" :key="`inner-${index}`">
      <path
        v-if="element.type === 'path'"
        :fill="element.fill"
        :d="element.d"
        :style="element.style"
        data-testid="finder-patterns-inner"
      />
      <rect
        v-else
        :x="element.x"
        :y="element.y"
        :width="element.width"
        :height="element.height"
        :fill="element.fill"
        :rx="element.rx"
        :style="element.style"
        data-testid="finder-patterns-inner"
      />
    </template>

    <path
      :fill="dataModules.fill"
      :d="dataModules.d"
      :shape-rendering="dataModules.shapeRendering"
      data-testid="data-modules"
    />

    <image v-if="imageAttributes" v-bind="imageAttributes" />
  </svg>
</template>
