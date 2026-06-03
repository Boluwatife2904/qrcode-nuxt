<script setup lang="ts">
const description = 'Simple QR code examples using qrcode-nuxt — value, size, error correction level, and margin. A great starting point.'
usePageSeo('Basic Examples', description)
defineOgImage('DocsCover', { title: 'Basic Examples', description })
import type { ErrorCorrectionLevel } from '../../../src/runtime'

const levels: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Basic</h1>
    <p>The simplest usage patterns to get you started.</p>

    <h2>Default</h2>
    <div class="ex"><div class="ex-preview"><VueQRCode value="https://nuxt.com" :size="150" /></div>
    <DocsCodeBlock lang="vue" :code="`<VueQRCode value=&quot;https://nuxt.com&quot; />`" /></div>

    <h2>Custom size</h2>
    <div class="ex"><div class="ex-preview"><VueQRCode value="https://nuxt.com" :size="200" /></div>
    <DocsCodeBlock lang="vue" :code="`<VueQRCode value=&quot;https://nuxt.com&quot; :size=&quot;200&quot; />`" /></div>

    <h2>Error correction levels</h2>
    <p>Higher levels make the QR code denser but more resilient to damage.</p>
    <div class="level-grid">
      <div v-for="l in levels" :key="l" class="level-item">
        <VueQRCode :value="`Level ${l}`" :size="110" :level="l" />
        <code>level="{{ l }}"</code>
      </div>
    </div>

    <h2>Custom background</h2>
    <div class="ex"><div class="ex-preview" style="background:#111;"><VueQRCode value="https://nuxt.com" :size="150" background="#1a1a2e" :data-modules-settings="{ color: '#e0e0e0' }" /></div>
    <DocsCodeBlock lang="vue" :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  background=&quot;#1a1a2e&quot;
  :data-modules-settings=&quot;{ color: '#e0e0e0' }&quot;
/>`" /></div>

    <h2>Multi-segment value</h2>
    <p>Pass an array to encode multiple QR segments, which can reduce the total data size.</p>
    <div class="ex"><div class="ex-preview"><VueQRCode :value="['https://', 'nuxt.com']" :size="150" /></div>
    <DocsCodeBlock lang="vue" :code="`<VueQRCode :value=&quot;['https://', 'nuxt.com']&quot; />`" /></div>

    <h2>Using the alias</h2>
    <p><code>&lt;QrcodeNuxt&gt;</code> is an identical alias — use either name:</p>
    <DocsCodeBlock lang="vue" :code="`<QrcodeNuxt value=&quot;https://nuxt.com&quot; :size=&quot;200&quot; />`" />
  </div>
</template>

<style scoped>
.ex { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; margin-bottom: 8px; }
.ex-preview { padding: 20px; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
.ex :deep(.cb) { margin: 0; }
.level-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0 32px; }
.level-item { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 20px 12px; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); }
.level-item code { font-family: var(--font-code); font-size: 12px; color: #7dd3fc; }
@media (max-width: 600px) { .ex { grid-template-columns: 1fr; } .level-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
