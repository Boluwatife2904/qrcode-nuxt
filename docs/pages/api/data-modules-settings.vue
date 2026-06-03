<script setup lang="ts">
const description = 'Configure data module shapes — rounded, circle, diamond, star, heart, and more. Full API reference for the dataModulesSettings prop.'
usePageSeo('DataModulesSettings', description)
defineOgImage('DocsCover', { title: 'DataModulesSettings', description })
const styles = [
  'square','square-sm','pinched-square','rounded','leaf',
  'vertical-line','horizontal-line','circuit-board',
  'circle','diamond','star','heart','hashtag',
] as const

const active = ref<typeof styles[number]>('rounded')
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>DataModulesSettings</h1>
    <p>
      Controls the appearance of the small data squares that encode the actual QR information.
      These are every module that is <em>not</em> part of the three corner finder patterns.
    </p>

    <h2>Props</h2>

    <DocsPropsTable
      :rows="[
        { name: 'style', type: 'DataModulesStyle', default: '\'square\'', description: 'The shape of each data module.' },
        { name: 'color', type: 'string', default: '\'#000000\'', description: 'Fill color applied when no gradient is set on the parent component.' },
        { name: 'randomSize', type: 'boolean', default: 'false', description: 'Randomize module sizes for a scattered look. Only works with: square, pinched-square, circle, diamond, star, heart, hashtag.' },
        { name: 'size', type: 'number', default: '1', description: 'Fixed size multiplier (0–1). Recommended range: 0.75–1. Only applies when randomSize is false.' },
        { name: 'lineWidth', type: 'number', default: '1 (0.5 for circuit-board)', description: 'Stroke width for connected-shape styles: vertical-line, horizontal-line, rounded (sub-1), circuit-board.' },
      ]"
    />

    <h2>Style gallery</h2>
    <p>Click a style to see it live:</p>

    <div class="style-gallery">
      <button
        v-for="s in styles"
        :key="s"
        class="style-btn"
        :class="{ active: active === s }"
        @click="active = s"
      >
        {{ s }}
      </button>
    </div>

    <div class="style-preview">
      <VueQRCode
        value="https://nuxt.com"
        :size="200"
        level="H"
        :data-modules-settings="{ style: active, color: '#10b981' }"
      />
      <div class="style-code">
        <DocsCodeBlock
          lang="vue"
          :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  :data-modules-settings=&quot;{
    style: '${active}',
    color: '#10b981',
  }&quot;
/>`"
        />
      </div>
    </div>

    <h2>DataModulesStyle values</h2>

    <DocsCodeBlock
      lang="ts"
      :code="`type DataModulesStyle =
  | 'square'
  | 'square-sm'
  | 'pinched-square'
  | 'rounded'
  | 'leaf'
  | 'vertical-line'
  | 'horizontal-line'
  | 'circuit-board'
  | 'circle'
  | 'diamond'
  | 'star'
  | 'heart'
  | 'hashtag'`"
    />

    <div class="callout callout-tip">
      <strong>randomSize</strong> and <strong>size</strong> only take effect for:
      <code>square</code>, <code>pinched-square</code>, <code>circle</code>,
      <code>diamond</code>, <code>star</code>, <code>heart</code>, <code>hashtag</code>.
    </div>

    <div class="callout callout-info">
      <strong>lineWidth</strong> only applies to:
      <code>vertical-line</code>, <code>horizontal-line</code>, <code>rounded</code> (when &lt;1),
      and <code>circuit-board</code>.
    </div>
  </div>
</template>

<style scoped>
.style-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0;
}
.style-btn {
  font-family: var(--font-code);
  font-size: 12px;
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: none;
  color: var(--muted);
  cursor: pointer;
  transition: all .15s;
}
.style-btn:hover { color: var(--text); border-color: var(--subtle); }
.style-btn.active { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

.style-preview {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: center;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  margin: 16px 0;
}
.style-preview :deep(.cb) { margin: 0; }
@media (max-width: 600px) {
  .style-preview { grid-template-columns: 1fr; justify-items: center; }
}
</style>
