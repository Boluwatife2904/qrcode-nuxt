<script setup lang="ts">
usePageSeo(
  "GradientSettings",
  "Apply linear or radial gradients to all QR code elements. Full API reference for the gradient prop and GradientSettings type.",
);
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>GradientSettings</h1>
    <p>
      Used by both the <code>gradient</code> prop (foreground elements) and the <code>background</code> prop (when
      passing an object instead of a color string).
    </p>

    <h2>Props</h2>
    <DocsPropsTable
      :rows="[
        { name: 'type', type: '\'linear\' | \'radial\'', required: true, description: 'Gradient type.' },
        {
          name: 'stops',
          type: 'GradientSettingsStop[]',
          required: true,
          description: 'Array of color stops. Each stop has an offset (e.g. \'0%\') and a color string.',
        },
        {
          name: 'rotation',
          type: 'number',
          description: 'Rotation angle in degrees. Only applies to linear gradients.',
        },
      ]"
    />

    <h2>GradientSettingsStop</h2>
    <DocsPropsTable
      :rows="[
        {
          name: 'offset',
          type: 'string',
          required: true,
          description: 'Position in the gradient, e.g. \'0%\', \'50%\', \'100%\'.',
        },
        { name: 'color', type: 'string', required: true, description: 'Any valid CSS color value.' },
      ]"
    />

    <h2>Linear gradient</h2>
    <div class="ex-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
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
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          level="H"
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

    <h2>Radial gradient</h2>
    <div class="ex-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  :gradient=&quot;{
    type: 'radial',
    stops: [
      { offset: '0%',   color: '#f59e0b' },
      { offset: '100%', color: '#ef4444' },
    ],
  }&quot;
/>`"
      />
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          level="H"
          :gradient="{
            type: 'radial',
            stops: [
              { offset: '0%', color: '#f59e0b' },
              { offset: '100%', color: '#ef4444' },
            ],
          }"
        />
      </div>
    </div>

    <h2>Gradient background</h2>
    <p>Pass a <code>GradientSettings</code> object to the <code>background</code> prop:</p>
    <div class="ex-split">
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  :background=&quot;{
    type: 'linear',
    rotation: 45,
    stops: [
      { offset: '0%',   color: '#fff7ed' },
      { offset: '100%', color: '#eef6ff' },
    ],
  }&quot;
/>`"
      />
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="150"
          level="H"
          :background="{
            type: 'linear',
            rotation: 45,
            stops: [
              { offset: '0%', color: '#fff7ed' },
              { offset: '100%', color: '#eef6ff' },
            ],
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ex-split {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;
  margin: 4px 0 24px;
}
.ex-preview {
  padding: 20px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ex-split :deep(.cb) {
  margin: 0;
}
@media (max-width: 600px) {
  .ex-split {
    grid-template-columns: 1fr;
  }
}
</style>
