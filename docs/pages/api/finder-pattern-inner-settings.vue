<script setup lang="ts">
const description = 'Configure the inner dot of the three corner finder patterns. Full API reference for the finderPatternInnerSettings prop.'
usePageSeo('FinderPatternInnerSettings', description)
defineOgImage('DocsCover', { title: 'FinderPatternInnerSettings', description })
const styles = [
  'square','pinched-square','rounded-sm','rounded','rounded-lg','circle',
  'inpoint-sm','inpoint','inpoint-lg','outpoint-sm','outpoint','outpoint-lg',
  'leaf-sm','leaf','leaf-lg','diamond','star','heart','hashtag','microchip',
] as const
const active = ref<typeof styles[number]>('microchip')
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>FinderPatternInnerSettings</h1>
    <p>Controls the inner dot (the filled center square) of the three corner finder patterns.</p>

    <h2>Props</h2>
    <DocsPropsTable
      :rows="[
        { name: 'style', type: 'FinderPatternInnerStyle', default: '\'square\'', description: 'Shape of the inner finder pattern dot.' },
        { name: 'color', type: 'string', default: '\'#000000\'', description: 'Fill color when no parent gradient is set.' },
      ]"
    />

    <div class="callout callout-tip">
      Inner patterns support all outer styles <em>plus</em>:
      <code>diamond</code>, <code>star</code>, <code>heart</code>, <code>hashtag</code>, <code>microchip</code>.
    </div>

    <h2>Style gallery</h2>
    <div class="style-gallery">
      <button v-for="s in styles" :key="s" class="style-btn" :class="{ active: active === s }" @click="active = s">{{ s }}</button>
    </div>
    <div class="style-preview">
      <VueQRCode
        value="https://nuxt.com"
        :size="180"
        level="H"
        :finder-pattern-inner-settings="{ style: active, color: '#10b981' }"
      />
      <DocsCodeBlock lang="vue" :code="`<VueQRCode
  :finder-pattern-inner-settings=&quot;{
    style: '${active}',
    color: '#10b981',
  }&quot;
/>`" />
    </div>
  </div>
</template>

<style scoped>
.style-gallery { display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0; }
.style-btn { font-family: var(--font-code); font-size: 12px; padding: 5px 10px; border: 1px solid var(--border); border-radius: 4px; background: none; color: var(--muted); cursor: pointer; transition: all .15s; }
.style-btn:hover { color: var(--text); border-color: var(--subtle); }
.style-btn.active { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }
.style-preview { display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin: 16px 0; }
.style-preview :deep(.cb) { margin: 0; }
@media (max-width: 600px) {
  h1 { overflow-wrap: break-word; word-break: break-word; }
  .style-preview { grid-template-columns: 1fr; justify-items: center; }
}
</style>
