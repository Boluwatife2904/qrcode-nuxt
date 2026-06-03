<p align="center">
  <!-- Replace the src below with your banner image URL -->
  <img src="https://res.cloudinary.com/juwon-tech/image/upload/v1780525293/Screenshot_2026-06-03_at_23.12.59_zgypnr.png" alt="qrcode-nuxt" width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/qrcode-nuxt">
    <img src="https://img.shields.io/npm/v/qrcode-nuxt?color=10b981&label=npm&logo=npm&logoColor=white" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/qrcode-nuxt">
    <img src="https://img.shields.io/npm/dm/qrcode-nuxt?color=10b981&logo=npm&logoColor=white" alt="npm downloads" />
  </a>
  <a href="https://github.com/Boluwatife2904/qrcode-nuxt/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/qrcode-nuxt?color=10b981" alt="license" />
  </a>
  <a href="https://nuxt.com">
    <img src="https://img.shields.io/badge/Nuxt-3%20%2F%204-10b981?logo=nuxt.js&logoColor=white" alt="Nuxt 3 / 4" />
  </a>
  <a href="https://vuejs.org">
    <img src="https://img.shields.io/badge/Vue-3.5%2B-10b981?logo=vue.js&logoColor=white" alt="Vue 3.5+" />
  </a>
</p>

<p align="center">
  A highly customizable SVG QR code generator for Vue and Nuxt.<br />
  Style every pixel — data modules, finder patterns, gradients, image embedding, and SVG/PNG/JPEG export.
</p>

<p align="center">
  <a href="https://qrcode-nuxt.sanusi.dev">Documentation</a> ·
  <a href="https://qrcode-nuxt.sanusi.dev/demo">Live Demo</a> ·
  <a href="https://github.com/Boluwatife2904/qrcode-nuxt/issues">Report Bug</a> ·
  <a href="https://github.com/Boluwatife2904/qrcode-nuxt/discussions">Request Feature</a>
</p>

---

## ✦ Features

- **13 data module styles** — square, rounded, circle, heart, star, diamond, circuit-board, and more
- **15 finder pattern styles** — square, rounded, inpoint, outpoint, leaf, and more, independently for inner and outer rings
- **Gradient support** — linear and radial gradients across all QR elements
- **Image embedding** — embed logos or icons with optional excavation
- **Download API** — export as SVG, PNG, or JPEG at any resolution via a component ref
- **Multi-segment values** — encode multiple data segments in a single QR code
- **SSR ready** — SVG renders server-side; download utilities safely gate on `document`
- **Nuxt auto-imports** — `<VueQRCode />`, `<QrcodeNuxt />`, and `useQrcode` with zero config
- **TypeScript first** — fully typed props, composable options, and return values

---

## Installation

```bash
# pnpm
pnpm add qrcode-nuxt

# npm
npm install qrcode-nuxt

# yarn
yarn add qrcode-nuxt

# bun
bun add qrcode-nuxt
```

---

## Usage

### Nuxt module

Register the module in your `nuxt.config.ts` — the component and composable are auto-imported everywhere:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['qrcode-nuxt'],
})
```

```vue
<template>
  <VueQRCode value="https://nuxt.com" />
</template>
```

### Vue (without Nuxt)

```vue
<script setup lang="ts">
import { VueQRCode } from 'qrcode-nuxt/runtime'
</script>

<template>
  <VueQRCode value="https://vuejs.org" />
</template>
```

---

## Examples

### Gradient

```vue
<template>
  <VueQRCode
    value="https://nuxt.com"
    level="H"
    :gradient="{
      type: 'linear',
      rotation: 135,
      stops: [
        { offset: '0%',   color: '#10b981' },
        { offset: '100%', color: '#3b82f6' },
      ],
    }"
  />
</template>
```

### Custom data modules

```vue
<template>
  <VueQRCode
    value="https://nuxt.com"
    :data-modules-settings="{ style: 'rounded', color: '#10b981' }"
  />
</template>
```

### Image embedding

```vue
<template>
  <VueQRCode
    value="https://nuxt.com"
    level="H"
    :image-settings="{
      src: '/logo.png',
      width: 40,
      height: 40,
      excavate: true,
    }"
  />
</template>
```

### Download API

Expose the component via a template ref to call `download()`:

```vue
<script setup lang="ts">
import type { QrCodeNuxt } from 'qrcode-nuxt/runtime'

const qr = useTemplateRef<QrCodeNuxt>('qr')
</script>

<template>
  <VueQRCode ref="qr" value="https://nuxt.com" level="H" />
  <button @click="qr?.download({ format: 'png', size: 800 })">Download PNG</button>
</template>
```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| string[]` | **Required** | Data to encode. Pass an array for multi-segment QR codes. |
| `size` | `number` | `128` | Rendered width and height in pixels. |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error correction level. H allows up to 30% damage. |
| `marginSize` | `number` | `4` | Quiet-zone modules around the code (QR spec minimum is 4). |
| `minVersion` | `number` | `1` | Minimum QR version (1–40). Higher versions store more data. |
| `boostLevel` | `boolean` | `true` | Raise error correction when it fits without increasing version. |
| `background` | `string \| GradientSettings` | `'#FFFFFF'` | Background fill. Omit or set `undefined` for transparent. |
| `gradient` | `GradientSettings` | `undefined` | Gradient applied to all foreground elements. |
| `dataModulesSettings` | `DataModulesSettings` | `undefined` | Style and color of the small data squares. |
| `finderPatternOuterSettings` | `FinderPatternOuterSettings` | `undefined` | Outer ring of the three corner finder patterns. |
| `finderPatternInnerSettings` | `FinderPatternInnerSettings` | `undefined` | Inner dot of the three corner finder patterns. |
| `imageSettings` | `ImageSettings` | `undefined` | Embeds an image (e.g. a logo) inside the QR code. |
| `svgProps` | `Record<string, unknown>` | `undefined` | Additional attributes forwarded to the root `<svg>` element. |

---

## Supported styles

**Data modules**

`square` · `square-sm` · `pinched-square` · `rounded` · `leaf` · `vertical-line` · `horizontal-line` · `circuit-board` · `circle` · `diamond` · `star` · `heart` · `hashtag`

**Outer finder patterns**

`square` · `pinched-square` · `rounded-sm` · `rounded` · `rounded-lg` · `circle` · `inpoint-sm` · `inpoint` · `inpoint-lg` · `outpoint-sm` · `outpoint` · `outpoint-lg` · `leaf-sm` · `leaf` · `leaf-lg`

**Inner finder patterns**

All outer styles plus `diamond` · `star` · `heart` · `hashtag` · `microchip`

---

## Download options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `'svg' \| 'png' \| 'jpeg'` | `'svg'` | Output file format. |
| `size` | `number` | `500` | Output size in pixels (raster formats). Ignored for SVG. |
| `name` | `string` | `'qrcode-nuxt'` | Filename without extension. |

---

## Development

```bash
# Install dependencies
pnpm install

# Start the docs dev server
pnpm dev

# Build the module
pnpm build
```

---

## Credits

The QR encoder is the MIT-licensed [TypeScript QR Code generator](https://github.com/nayuki/QR-Code-generator) by Project Nayuki. This library ports the public feature set of [@lglab/react-qr-code](https://github.com/LGLabGreg/react-qr-code) to the Vue / Nuxt ecosystem.

---

## License

[MIT](./LICENSE)
