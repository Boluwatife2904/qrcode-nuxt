<script setup lang="ts">
const description = 'Get up and running with qrcode-nuxt in seconds — install via npm, pnpm, or yarn and register the Nuxt module.'
usePageSeo('Installation', description)
defineOgImage('DocsCover', { title: 'Installation', description })
const managers = [
  { name: 'pnpm', cmd: 'pnpm add qrcode-nuxt' },
  { name: 'npm',  cmd: 'npm i qrcode-nuxt' },
  { name: 'yarn', cmd: 'yarn add qrcode-nuxt' },
  { name: 'bun',  cmd: 'bun add qrcode-nuxt' },
]
</script>

<template>
  <div class="prose">
    <div class="page-label">Getting Started</div>
    <h1>Installation</h1>
    <p>
      Setting up <code>qrcode-nuxt</code> is quick and easy.
      Install it using your preferred package manager:
    </p>

    <div v-for="pm in managers" :key="pm.name">
      <DocsCodeBlock :code="pm.cmd" lang="bash" :filename="pm.name" />
    </div>

    <h2>Nuxt setup</h2>
    <p>
      Add <code>qrcode-nuxt</code> to the <code>modules</code> array in your <code>nuxt.config.ts</code>:
    </p>

    <DocsCodeBlock
      lang="ts"
      filename="nuxt.config.ts"
      :code="`export default defineNuxtConfig({
  modules: ['qrcode-nuxt'],
})`"
    />

    <p>
      That's it. The module auto-registers <code>&lt;VueQRCode&gt;</code>,
      <code>&lt;QrcodeNuxt&gt;</code>, and the <code>useQrcode</code> composable —
      no explicit imports needed anywhere in your app.
    </p>

    <div class="callout callout-tip">
      Both <code>&lt;VueQRCode&gt;</code> and <code>&lt;QrcodeNuxt&gt;</code> are identical aliases.
      Use whichever fits your naming conventions.
    </div>

    <h2>Vue (without Nuxt)</h2>
    <p>
      Import the component directly from the runtime entry point:
    </p>

    <DocsCodeBlock
      lang="vue"
      filename="MyComponent.vue"
      :code="`<script setup lang=&quot;ts&quot;>
import { VueQRCode } from 'qrcode-nuxt/runtime'
</script>

<template>
  <VueQRCode value=&quot;https://vuejs.org&quot; />
</template>`"
    />

    <h2>Module options</h2>
    <p>
      The module accepts optional configuration in <code>nuxt.config.ts</code>:
    </p>

    <DocsCodeBlock
      lang="ts"
      filename="nuxt.config.ts"
      :code="`export default defineNuxtConfig({
  modules: ['qrcode-nuxt'],

  qrcodeNuxt: {
    // Rename the auto-imported component (or set false to disable)
    componentName: 'VueQRCode',

    // Also register <QrcodeNuxt /> as an alias
    registerAlias: true,
})`"
    />

    <DocsPropsTable
      :rows="[
        { name: 'componentName', type: 'string | false', default: '\'VueQRCode\'', description: 'Name used for the auto-imported component. Set to false to disable registration.' },
        { name: 'registerAlias', type: 'boolean', default: 'true', description: 'Also register the component as <QrcodeNuxt />.' },
      ]"
    />

    <h2>Peer dependencies</h2>
    <p>
      <code>qrcode-nuxt</code> has no runtime dependencies beyond Vue and Nuxt themselves:
    </p>

    <DocsCodeBlock
      lang="bash"
      :code="`nuxt   >= 3.0.0 || 4.0.0
vue    >= 3.5.0`"
    />
  </div>
</template>
