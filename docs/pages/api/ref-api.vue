<script setup lang="ts">
usePageSeo(
  "useQrcode & Ref API",
  "The useQrcode composable gives raw access to QR matrix data. Use the component ref to call download() for SVG, PNG, and JPEG export.",
);
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>useQrcode</h1>
    <p>
      The <code>useQrcode</code> composable is the reactive core that powers <code>&lt;VueQRCode&gt;</code>. Use it
      directly when you need raw access to QR matrix data for custom rendering.
    </p>

    <div class="callout callout-tip">
      In Nuxt apps, <code>useQrcode</code> is auto-imported. In plain Vue, import it from
      <code>qrcode-nuxt/runtime</code>.
    </div>

    <h2>Options</h2>
    <DocsPropsTable
      :rows="[
        {
          name: 'value',
          type: 'MaybeRefOrGetter&lt;string | string[]&gt;',
          required: true,
          description: 'The data to encode. Reactive — wrap in computed() to update the QR code automatically.',
        },
        {
          name: 'level',
          type: 'MaybeRefOrGetter&lt;ErrorCorrectionLevel&gt;',
          required: true,
          description: 'Error correction level: L, M, Q, or H.',
        },
        {
          name: 'minVersion',
          type: 'MaybeRefOrGetter&lt;number&gt;',
          required: true,
          description: 'Minimum QR version (1–40).',
        },
        {
          name: 'size',
          type: 'MaybeRefOrGetter&lt;number&gt;',
          required: true,
          description: 'Rendered size in pixels (used to calculate image settings).',
        },
        {
          name: 'marginSize',
          type: 'MaybeRefOrGetter&lt;number | undefined&gt;',
          description: 'Quiet-zone modules. Defaults to 4.',
        },
        {
          name: 'imageSettings',
          type: 'MaybeRefOrGetter&lt;ImageSettings | undefined&gt;',
          description: 'Image embedding config.',
        },
        {
          name: 'boostLevel',
          type: 'MaybeRefOrGetter&lt;boolean | undefined&gt;',
          description: 'Allow encoder to boost error correction.',
        },
      ]"
    />

    <h2>Return values</h2>
    <DocsPropsTable
      :rows="[
        { name: 'qrcode', type: 'ComputedRef&lt;QrCode&gt;', description: 'The raw qrcodegen QrCode object.' },
        {
          name: 'cells',
          type: 'ComputedRef&lt;Modules&gt;',
          description: 'The 2D boolean grid of QR modules (rows × columns).',
        },
        { name: 'margin', type: 'ComputedRef&lt;number&gt;', description: 'The resolved margin in modules.' },
        {
          name: 'numCells',
          type: 'ComputedRef&lt;number&gt;',
          description: 'Total grid size including margins (cells.length + margin * 2).',
        },
        {
          name: 'calculatedImageSettings',
          type: 'ComputedRef&lt;CalculatedImageSettings | null&gt;',
          description: 'Resolved image position and excavation data.',
        },
      ]"
    />

    <h2>Usage</h2>
    <DocsCodeBlock
      lang="vue"
      :code="`<script setup lang=&quot;ts&quot;>
import { computed, ref } from 'vue'

const value = ref('https://nuxt.com')

// useQrcode is auto-imported in Nuxt
const { cells, numCells, margin } = useQrcode({
  value: computed(() => value.value),
  level: 'H',
  minVersion: 1,
  size: 200,
})
</script>

<template>
  <svg
    :viewBox=&quot;\`0 0 \${numCells} \${numCells}\`&quot;
    width=&quot;200&quot;
    height=&quot;200&quot;
  >
    <template v-for=&quot;(row, y) in cells&quot; :key=&quot;y&quot;>
      <template v-for=&quot;(cell, x) in row&quot; :key=&quot;x&quot;>
        <rect
          v-if=&quot;cell&quot;
          :x=&quot;x + margin&quot;
          :y=&quot;y + margin&quot;
          width=&quot;1&quot;
          height=&quot;1&quot;
          fill=&quot;black&quot;
        />
      </template>
    </template>
  </svg>
</template>`"
    />

    <h2>QrCodeNuxt</h2>
    <p>The type exposed by the <code>&lt;VueQRCode&gt;</code> component ref:</p>
    <DocsCodeBlock
      lang="ts"
      :code="`interface QrCodeNuxt {
  svg: SVGSVGElement | null
  download: (options?: DownloadOptions) => void
}`"
    />
  </div>
</template>
