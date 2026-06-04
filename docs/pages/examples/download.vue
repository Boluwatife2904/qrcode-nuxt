<script setup lang="ts">
usePageSeo(
  "Download",
  "Export your QR code as SVG, PNG, or JPEG. Live examples for the download() ref method with custom size and filename options.",
);
import type { QrCodeNuxt } from "../../../src/runtime";

const qr = useTemplateRef<QrCodeNuxt>("qr");
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Download</h1>
    <p>
      Use a template ref to access the <code>download()</code> method, which supports SVG, PNG, and JPEG output at any
      target size.
    </p>

    <h2>Live example</h2>
    <div class="demo">
      <div class="demo-preview">
        <VueQRCode
          ref="qr"
          value="https://nuxt.com"
          :size="200"
          level="H"
          :gradient="{
            type: 'linear',
            rotation: 135,
            stops: [
              { offset: '0%', color: '#10b981' },
              { offset: '100%', color: '#3b82f6' },
            ],
          }"
          :data-modules-settings="{ style: 'rounded' }"
          :finder-pattern-outer-settings="{ style: 'rounded-lg' }"
          :finder-pattern-inner-settings="{ style: 'microchip' }"
        />
      </div>
      <div class="demo-actions">
        <p class="demo-label">Export as:</p>
        <div class="demo-btns">
          <button class="dl-btn" @click="qr?.download({ format: 'svg', size: 800, name: 'qrcode' })">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v8M4 6l3 3 3-3M2 11h10"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            SVG
          </button>
          <button class="dl-btn" @click="qr?.download({ format: 'png', size: 800, name: 'qrcode' })">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v8M4 6l3 3 3-3M2 11h10"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            PNG
          </button>
          <button class="dl-btn" @click="qr?.download({ format: 'jpeg', size: 800, name: 'qrcode' })">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v8M4 6l3 3 3-3M2 11h10"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            JPEG
          </button>
        </div>
      </div>
    </div>

    <h2>Code</h2>
    <DocsCodeBlock
      lang="vue"
      :code="`<script setup lang=&quot;ts&quot;>
import type { QrCodeNuxt } from 'qrcode-nuxt/runtime'

const qr = useTemplateRef<QrCodeNuxt>('qr')
</script>

<template>
  <VueQRCode ref=&quot;qr&quot; value=&quot;https://nuxt.com&quot; level=&quot;H&quot; />

  <!-- SVG — vector, infinite resolution -->
  <button @click=&quot;qr?.download({ format: 'svg', size: 800 })&quot;>SVG</button>

  <!-- PNG — raster at 800×800px -->
  <button @click=&quot;qr?.download({ format: 'png', size: 800 })&quot;>PNG</button>

  <!-- Custom name -->
  <button @click=&quot;qr?.download({ format: 'png', size: 1200, name: 'my-qr' })&quot;>
    High-res PNG
  </button>
</template>`"
    />

    <h2>DownloadOptions reference</h2>
    <DocsPropsTable
      :rows="[
        {
          name: 'format',
          type: '\'svg\' | \'png\' | \'jpeg\'',
          default: '\'svg\'',
          description: 'Output file format. SVG is vector; PNG and JPEG are raster.',
        },
        {
          name: 'size',
          type: 'number',
          default: '500',
          description: 'Output dimension in pixels (raster formats). SVG ignores this.',
        },
        { name: 'name', type: 'string', default: '\'qrcode-nuxt\'', description: 'Filename without extension.' },
      ]"
    />

    <div class="callout callout-info">
      SVG downloads preserve your gradients and styles perfectly at any print size. PNG/JPEG are useful when the
      receiving platform does not support SVG.
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  gap: 32px;
  align-items: center;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 32px;
  margin: 24px 0;
  flex-wrap: wrap;
}
.demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-end;
}
.demo-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 4px;
}
.demo-btns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.dl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 100px;
}
.dl-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}
</style>
