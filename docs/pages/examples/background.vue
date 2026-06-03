<script setup lang="ts">
const description = 'Control the QR code background — solid color, gradient, or transparent. Live code examples for the background prop.'
usePageSeo('Background', description)
defineOgImage('DocsCover', { title: 'Background', description })
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Background</h1>
    <p>The <code>background</code> prop accepts either a hex color string or a <NuxtLink to="/api/gradient-settings">GradientSettings</NuxtLink> object.</p>

    <h2>Solid color</h2>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          background="#1e1b4b"
          :data-modules-settings="{ color: '#ffffff' }"
          :finder-pattern-outer-settings="{ color: '#ffffff' }"
          :finder-pattern-inner-settings="{ color: '#ffffff' }"
        />
      </div>
      <DocsCodeBlock lang="vue" :code="`<VueQRCode
  background=&quot;#1e1b4b&quot;
  :data-modules-settings=&quot;{ color: '#ffffff' }&quot;
  :finder-pattern-outer-settings=&quot;{ color: '#ffffff' }&quot;
  :finder-pattern-inner-settings=&quot;{ color: '#ffffff' }&quot;
/>`" />
    </div>

    <h2>Transparent background</h2>
    <p>Omit <code>background</code> to get a transparent SVG — great for overlaying on any surface:</p>
    <div class="ex">
      <div class="ex-preview" style="background: linear-gradient(135deg,#1e1b4b,#0f172a);">
        <VueQRCode value="https://nuxt.com" :size="150" :data-modules-settings="{ color: '#e0e7ff' }" />
      </div>
      <DocsCodeBlock lang="vue" :code="`<!-- No background prop → transparent SVG -->
<VueQRCode :data-modules-settings=&quot;{ color: '#e0e7ff' }&quot; />`" />
    </div>

    <h2>Linear gradient background</h2>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          :background="{ type: 'linear', rotation: 45, stops: [{ offset: '0%', color: '#fff7ed' }, { offset: '100%', color: '#eef6ff' }] }"
        />
      </div>
      <DocsCodeBlock lang="vue" :code="`<VueQRCode
  :background=&quot;{
    type: 'linear',
    rotation: 45,
    stops: [
      { offset: '0%',   color: '#fff7ed' },
      { offset: '100%', color: '#eef6ff' },
    ],
  }&quot;
/>`" />
    </div>

    <h2>Background + foreground gradient</h2>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          :background="{ type: 'linear', rotation: 45, stops: [{ offset: '0%', color: '#0f172a' }, { offset: '100%', color: '#1e1b4b' }] }"
          :gradient="{ type: 'linear', rotation: 135, stops: [{ offset: '0%', color: '#10b981' }, { offset: '100%', color: '#3b82f6' }] }"
          :data-modules-settings="{ style: 'rounded' }"
        />
      </div>
      <DocsCodeBlock lang="vue" :code="`<VueQRCode
  :background=&quot;{
    type: 'linear', rotation: 45,
    stops: [
      { offset: '0%',   color: '#0f172a' },
      { offset: '100%', color: '#1e1b4b' },
    ],
  }&quot;
  :gradient=&quot;{
    type: 'linear', rotation: 135,
    stops: [
      { offset: '0%',   color: '#10b981' },
      { offset: '100%', color: '#3b82f6' },
    ],
  }&quot;
  :data-modules-settings=&quot;{ style: 'rounded' }&quot;
/>`" />
    </div>
  </div>
</template>

<style scoped>
.ex { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; margin-bottom: 24px; }
.ex-preview { padding: 24px; border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
.ex :deep(.cb) { margin: 0; }
@media (max-width: 600px) { .ex { grid-template-columns: 1fr; } }
</style>
