<script setup lang="ts">
usePageSeo(
  "Quick Start",
  "Start rendering customizable QR codes with a single line of markup. No imports needed — the component is auto-available in every Nuxt page.",
);
</script>

<template>
  <div class="prose">
    <div class="page-label">Getting Started</div>
    <h1>Quick Start</h1>
    <p>
      Once installed, you can render a QR code with a single line of markup. No imports needed in Nuxt — the component
      is automatically available everywhere.
    </p>

    <h2>Minimal example</h2>

    <div class="demo-split">
      <DocsCodeBlock
        lang="vue"
        filename="app.vue"
        :code="`<template>
  <VueQRCode value=&quot;https://nuxt.com&quot; />
</template>`"
      />
      <div class="demo-preview">
        <VueQRCode value="https://nuxt.com" :size="120" />
      </div>
    </div>

    <h2>With error correction</h2>
    <p>
      Use the <code>level</code> prop to control error correction. <code>H</code> allows up to 30% of the code to be
      damaged or covered (e.g. by a logo):
    </p>

    <div class="demo-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  level=&quot;H&quot;
  :size=&quot;160&quot;
/>`"
      />
      <div class="demo-preview">
        <VueQRCode value="https://nuxt.com" level="H" :size="120" />
      </div>
    </div>

    <h2>Styling with a gradient</h2>
    <p>Pass a <code>gradient</code> object to apply a linear or radial gradient across all QR code elements:</p>

    <div class="demo-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  level=&quot;H&quot;
  :gradient=&quot;{
    type: 'linear',
    rotation: 135,
    stops: [
      { offset: '0%',   color: '#10b981' },
      { offset: '100%', color: '#3b82f6' },
    ],
  }&quot;
/>`"
      />
      <div class="demo-preview">
        <VueQRCode
          value="https://nuxt.com"
          level="H"
          :size="120"
          :gradient="{
            type: 'linear',
            rotation: 135,
            stops: [
              { offset: '0%', color: '#10b981' },
              { offset: '100%', color: '#3b82f6' },
            ],
          }"
        />
      </div>
    </div>

    <h2>Custom module style</h2>
    <p>Use <code>dataModulesSettings</code> to change the shape of the small data squares:</p>

    <div class="demo-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  :data-modules-settings=&quot;{
    style: 'rounded',
    color: '#10b981',
  }&quot;
/>`"
      />
      <div class="demo-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="120"
          :data-modules-settings="{ style: 'rounded', color: '#10b981' }"
        />
      </div>
    </div>

    <h2>Downloading the QR code</h2>
    <p>Expose the component with a template ref to access the <code>download()</code> method:</p>

    <DocsCodeBlock
      lang="vue"
      :code="`<script setup lang=&quot;ts&quot;>
import type { QrCodeNuxt } from 'qrcode-nuxt/runtime'

const qr = useTemplateRef<QrCodeNuxt>('qr')
</script>

<template>
  <VueQRCode ref=&quot;qr&quot; value=&quot;https://nuxt.com&quot; level=&quot;H&quot; />
  <button @click=&quot;qr?.download({ format: 'png', size: 800 })&quot;>
    Download PNG
  </button>
</template>`"
    />

    <div class="callout callout-info">
      See the <NuxtLink to="/api/ref-api">useQrcode &amp; Ref API</NuxtLink> page for the full download options
      reference.
    </div>

    <h2>Next steps</h2>
    <ul>
      <li><NuxtLink to="/demo">Try the interactive demo →</NuxtLink></li>
      <li><NuxtLink to="/api/props">Browse all component props →</NuxtLink></li>
      <li><NuxtLink to="/examples/data-modules">Explore data module styles →</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
.demo-split {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;
  margin: 20px 0;
}
.demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  min-width: 160px;
}
@media (max-width: 600px) {
  .demo-split {
    grid-template-columns: 1fr;
  }
  .demo-preview {
    justify-content: center;
  }
}
</style>
