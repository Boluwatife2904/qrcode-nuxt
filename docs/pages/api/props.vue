<script setup lang="ts">
usePageSeo(
  "VueQRCode Props",
  "Full reference for every VueQRCode prop — size, level, gradient, dataModulesSettings, finderPatternSettings, imageSettings, and more.",
);
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>VueQRCode</h1>
    <p>
      The <code>&lt;VueQRCode&gt;</code> component renders a fully customizable SVG QR code. It exposes a
      <code>download()</code> method via template ref.
    </p>

    <h2>Props</h2>

    <DocsPropsTable
      :rows="[
        {
          name: 'value',
          type: 'string | string[]',
          required: true,
          description: 'The data to encode. Pass an array to create a multi-segment QR code.',
        },
        {
          name: 'size',
          type: 'number',
          default: '128',
          description: 'The rendered width and height of the SVG in pixels.',
        },
        {
          name: 'level',
          type: '\'L\' | \'M\' | \'Q\' | \'H\'',
          default: '\'M\'',
          description: 'Error correction level. L=7%, M=15%, Q=25%, H=30% damage tolerance.',
        },
        {
          name: 'marginSize',
          type: 'number',
          default: '4',
          description: 'Number of quiet-zone modules surrounding the code. 4 is the QR spec minimum.',
        },
        {
          name: 'minVersion',
          type: 'number',
          default: '1',
          description: 'Minimum QR version (1–40). Higher versions store more data.',
        },
        {
          name: 'boostLevel',
          type: 'boolean',
          default: 'true',
          description:
            'Allow the encoder to raise the error correction level when it fits without increasing the version.',
        },
        {
          name: 'background',
          type: 'string | GradientSettings',
          default: '\'#FFFFFF\'',
          description: 'Background fill. Omit for transparent.',
        },
        {
          name: 'gradient',
          type: 'GradientSettings',
          description:
            'Gradient applied to all foreground elements (data modules and finder patterns). See GradientSettings.',
        },
        {
          name: 'dataModulesSettings',
          type: 'DataModulesSettings',
          description: 'Controls the style, color, and size of data modules. See DataModulesSettings.',
        },
        {
          name: 'finderPatternOuterSettings',
          type: 'FinderPatternOuterSettings',
          description: 'Controls the outer ring of the three corner finder patterns. See FinderPatternOuterSettings.',
        },
        {
          name: 'finderPatternInnerSettings',
          type: 'FinderPatternInnerSettings',
          description: 'Controls the inner dot of the three corner finder patterns. See FinderPatternInnerSettings.',
        },
        {
          name: 'imageSettings',
          type: 'ImageSettings',
          description: 'Embeds an image (e.g. a logo) inside the QR code. See ImageSettings.',
        },
        {
          name: 'svgProps',
          type: 'Record<string, unknown>',
          description: 'Additional attributes forwarded to the root <svg> element.',
        },
      ]"
    />

    <h2>Template ref / expose</h2>
    <p>The component exposes two members via <code>defineExpose</code>:</p>

    <DocsPropsTable
      :rows="[
        { name: 'svg', type: 'SVGSVGElement | null', description: 'Direct reference to the rendered SVG DOM node.' },
        {
          name: 'download',
          type: '(options?: DownloadOptions) => void',
          description: 'Trigger a file download. Supports SVG, PNG, and JPEG output.',
        },
      ]"
    />

    <h2>Usage</h2>

    <DocsCodeBlock
      lang="vue"
      :code="`<script setup lang=&quot;ts&quot;>
import type { QrCodeNuxt } from 'qrcode-nuxt/runtime'

const qr = useTemplateRef<QrCodeNuxt>('qr')
</script>

<template>
  <VueQRCode
    ref=&quot;qr&quot;
    value=&quot;https://nuxt.com&quot;
    :size=&quot;200&quot;
    level=&quot;H&quot;
    :margin-size=&quot;4&quot;
    :gradient=&quot;{
      type: 'linear',
      rotation: 135,
      stops: [
        { offset: '0%',   color: '#10b981' },
        { offset: '100%', color: '#3b82f6' },
      ],
    }&quot;
    :data-modules-settings=&quot;{ style: 'rounded' }&quot;
    :finder-pattern-outer-settings=&quot;{ style: 'rounded-lg' }&quot;
    :finder-pattern-inner-settings=&quot;{ style: 'microchip' }&quot;
  />

  <button @click=&quot;qr?.download({ format: 'png', size: 800 })&quot;>
    Download PNG
  </button>
</template>`"
    />

    <h2>DownloadOptions</h2>

    <DocsPropsTable
      :rows="[
        {
          name: 'format',
          type: '\'svg\' | \'png\' | \'jpeg\'',
          default: '\'svg\'',
          description: 'Output file format.',
        },
        {
          name: 'size',
          type: 'number',
          default: '500',
          description: 'Output file size in pixels (for raster formats).',
        },
        {
          name: 'name',
          type: 'string',
          default: '\'qrcode-nuxt\'',
          description: 'Output filename (without extension).',
        },
      ]"
    />

    <div class="callout callout-info">
      The <code>download</code> function is client-only. It checks for <code>typeof document !== 'undefined'</code>
      before running so it is safe to call on SSR builds.
    </div>
  </div>
</template>
