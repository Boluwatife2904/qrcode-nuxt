<script setup lang="ts">
usePageSeo(
  "Data Modules",
  "Explore all 13 data module shapes — rounded squares, circles, hearts, circuit boards, and more. Live examples for every style.",
);
import type { DataModulesSettings } from "../../../src/runtime";

interface Example {
  title: string;
  settings: DataModulesSettings;
  code: string;
}

const examples: Example[] = [
  {
    title: "Rounded",
    settings: { style: "rounded", color: "#10b981" },
    code: `{ style: 'rounded', color: '#10b981' }`,
  },
  { title: "Circle", settings: { style: "circle", color: "#3b82f6" }, code: `{ style: 'circle', color: '#3b82f6' }` },
  {
    title: "Diamond",
    settings: { style: "diamond", color: "#8b5cf6" },
    code: `{ style: 'diamond', color: '#8b5cf6' }`,
  },
  { title: "Star", settings: { style: "star", color: "#f59e0b" }, code: `{ style: 'star', color: '#f59e0b' }` },
  { title: "Heart", settings: { style: "heart", color: "#ef4444" }, code: `{ style: 'heart', color: '#ef4444' }` },
  { title: "Leaf", settings: { style: "leaf", color: "#22c55e" }, code: `{ style: 'leaf', color: '#22c55e' }` },
  {
    title: "Circuit Board",
    settings: { style: "circuit-board", color: "#06b6d4", lineWidth: 0.42 },
    code: `{ style: 'circuit-board', color: '#06b6d4', lineWidth: 0.42 }`,
  },
  {
    title: "Hashtag",
    settings: { style: "hashtag", color: "#a855f7" },
    code: `{ style: 'hashtag', color: '#a855f7' }`,
  },
  {
    title: "Square-sm",
    settings: { style: "square-sm", color: "#64748b" },
    code: `{ style: 'square-sm', color: '#64748b' }`,
  },
  {
    title: "Random sizes",
    settings: { style: "circle", color: "#10b981", randomSize: true },
    code: `{ style: 'circle', color: '#10b981', randomSize: true }`,
  },
  {
    title: "Custom size 0.7",
    settings: { style: "square", color: "#f97316", size: 0.7 },
    code: `{ style: 'square', color: '#f97316', size: 0.7 }`,
  },
  {
    title: "Vertical line",
    settings: { style: "vertical-line", color: "#0ea5e9", lineWidth: 0.5 },
    code: `{ style: 'vertical-line', color: '#0ea5e9', lineWidth: 0.5 }`,
  },
];
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Data Modules</h1>
    <p>The small squares that encode your data. Below are all supported styles with color and size variations.</p>

    <div class="grid">
      <div v-for="example in examples" :key="example.title" class="card">
        <div class="card-preview">
          <VueQRCode value="https://nuxt.com" :size="140" level="H" :data-modules-settings="example.settings" />
        </div>
        <div class="card-body">
          <p class="card-title">{{ example.title }}</p>
          <DocsCodeBlock lang="ts" :code="`dataModulesSettings: ${example.code}`" />
        </div>
      </div>
    </div>

    <h2>With gradient</h2>
    <p>
      When a <code>gradient</code> prop is set on the parent, it takes precedence over
      <code>dataModulesSettings.color</code>:
    </p>

    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="160"
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
        />
      </div>
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  :gradient=&quot;{
    type: 'linear',
    rotation: 135,
    stops: [
      { offset: '0%',   color: '#10b981' },
      { offset: '100%', color: '#3b82f6' },
    ],
  }&quot;
  :data-modules-settings=&quot;{ style: 'rounded' }&quot;
/>`"
      />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.card {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.card-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}
.card-body {
  border-top: 1px solid var(--border);
  padding: 14px;
}
.card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}
.card-body :deep(.cb) {
  margin: 0;
}
.ex {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
.ex-preview {
  padding: 24px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ex :deep(.cb) {
  margin: 0;
}
@media (max-width: 600px) {
  .ex {
    grid-template-columns: 1fr;
  }
}
</style>
