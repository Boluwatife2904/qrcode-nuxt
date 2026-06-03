<script setup lang="ts">
const description = 'Explore all finder pattern styles — rounded, sharp, dots, microchip, and more. Live examples for inner and outer finder pattern settings.'
usePageSeo('Finder Patterns', description)
defineOgImage('DocsCover', { title: 'Finder Patterns', description })
const outerStyles = ['square','pinched-square','rounded-sm','rounded','rounded-lg','circle','inpoint','outpoint','leaf'] as const
const innerStyles = ['square','rounded','rounded-lg','circle','microchip','diamond','star','heart'] as const
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Finder Patterns</h1>
    <p>
      The three square corner markers that help scanners orient the QR code.
      Outer and inner patterns can each be styled independently.
    </p>

    <h2>Outer styles</h2>
    <div class="grid">
      <div v-for="s in outerStyles" :key="s" class="card">
        <div class="card-preview">
          <VueQRCode
            value="QR"
            :size="110"
            level="H"
            :finder-pattern-outer-settings="{ style: s, color: '#10b981' }"
          />
        </div>
        <code class="card-label">{{ s }}</code>
      </div>
    </div>

    <h2>Inner styles</h2>
    <div class="grid">
      <div v-for="s in innerStyles" :key="s" class="card">
        <div class="card-preview">
          <VueQRCode
            value="QR"
            :size="110"
            level="H"
            :finder-pattern-inner-settings="{ style: s, color: '#3b82f6' }"
          />
        </div>
        <code class="card-label">{{ s }}</code>
      </div>
    </div>

    <h2>Combined customization</h2>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="180"
          level="H"
          :finder-pattern-outer-settings="{ style: 'leaf', color: '#10b981' }"
          :finder-pattern-inner-settings="{ style: 'microchip', color: '#3b82f6' }"
          :data-modules-settings="{ style: 'rounded', color: '#6b7585' }"
        />
      </div>
      <DocsCodeBlock lang="vue" :code="`<VueQRCode
  :finder-pattern-outer-settings=&quot;{
    style: 'leaf',
    color: '#10b981',
  }&quot;
  :finder-pattern-inner-settings=&quot;{
    style: 'microchip',
    color: '#3b82f6',
  }&quot;
  :data-modules-settings=&quot;{
    style: 'rounded',
    color: '#6b7585',
  }&quot;
/>`" />
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin: 16px 0 32px; }
.card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 8px; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); }
.card-preview { display: flex; align-items: center; justify-content: center; }
.card-label { font-family: var(--font-code); font-size: 11px; color: var(--muted); text-align: center; }
.ex { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; }
.ex-preview { padding: 24px; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
.ex :deep(.cb) { margin: 0; }
@media (max-width: 600px) { .ex { grid-template-columns: 1fr; } }
</style>
