<script setup lang="ts">
usePageSeo(
  "Image",
  "Embed a logo or image inside your QR code using the imageSettings prop. Live examples with excavation, size, and position controls.",
);
</script>

<template>
  <div class="prose">
    <div class="page-label">Examples</div>
    <h1>Image</h1>
    <p>
      Embed any image (logo, icon, watermark) inside the QR code using the
      <code>imageSettings</code> prop. Always pair with <code>level="H"</code>.
    </p>

    <div class="callout callout-warn">
      Use <code>level="H"</code> when embedding images — the higher error correction compensates for the obscured
      modules.
    </div>

    <h2>Basic image embed</h2>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="180"
          level="H"
          :image-settings="{ src: 'https://nuxt.com/icon.png', width: 40, height: 40, excavate: true }"
        />
      </div>
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  level=&quot;H&quot;
  :image-settings=&quot;{
    src: '/logo.png',
    width: 40,
    height: 40,
    excavate: true,
  }&quot;
/>`"
      />
    </div>

    <h2>Without excavation</h2>
    <p>Set <code>excavate: false</code> to overlay the image without clearing the QR modules behind it:</p>
    <div class="ex">
      <div class="ex-preview">
        <VueQRCode
          value="https://nuxt.com"
          :size="180"
          level="H"
          :image-settings="{ src: 'https://nuxt.com/icon.png', width: 40, height: 40, excavate: false, opacity: 0.8 }"
        />
      </div>
      <DocsCodeBlock
        lang="vue"
        :code="`<VueQRCode
  level=&quot;H&quot;
  :image-settings=&quot;{
    src: '/logo.png',
    width: 40,
    height: 40,
    excavate: false,
    opacity: 0.8,
  }&quot;
/>`"
      />
    </div>

    <h2>Custom position</h2>
    <p>Use <code>x</code> and <code>y</code> to offset the image from the default center position:</p>
    <DocsCodeBlock
      lang="vue"
      :code="`<VueQRCode
  level=&quot;H&quot;
  :image-settings=&quot;{
    src: '/logo.png',
    width: 30,
    height: 30,
    x: 5,
    y: 5,
    excavate: true,
  }&quot;
/>`"
    />

    <div class="callout callout-info">
      <code>x</code> and <code>y</code> are in <em>QR module units</em>, not pixels. The number of modules depends on
      the QR version (data density).
    </div>
  </div>
</template>

<style scoped>
.ex {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
}
.ex-preview {
  padding: 24px;
  background: #fff;
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
