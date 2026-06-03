<script setup lang="ts">
const description = 'Embed a logo or image inside the QR code. Full API reference for the imageSettings prop and ImageSettings type.'
usePageSeo('ImageSettings', description)
defineOgImage('DocsCover', { title: 'ImageSettings', description })
</script>

<template>
  <div class="prose">
    <div class="page-label">API Reference</div>
    <h1>ImageSettings</h1>
    <p>
      Embed an image (e.g. a brand logo) inside the QR code.
      Use <code>level="H"</code> for the highest error-correction tolerance when embedding images.
    </p>

    <h2>Props</h2>
    <DocsPropsTable
      :rows="[
        { name: 'src', type: 'string', required: true, description: 'URL or data URI of the image to embed.' },
        { name: 'width', type: 'number', required: true, description: 'Rendered width of the image in QR module units.' },
        { name: 'height', type: 'number', required: true, description: 'Rendered height of the image in QR module units.' },
        { name: 'excavate', type: 'boolean', default: 'false', description: 'Clear the QR modules behind the image to prevent visual noise.' },
        { name: 'x', type: 'number', description: 'Horizontal offset in module units from the left edge. Defaults to center.' },
        { name: 'y', type: 'number', description: 'Vertical offset in module units from the top edge. Defaults to center.' },
        { name: 'opacity', type: 'number', default: '1', description: 'Image opacity (0–1).' },
        { name: 'crossOrigin', type: '\'anonymous\' | \'use-credentials\' | \'\'', description: 'crossOrigin attribute for raster export of cross-origin images.' },
      ]"
    />

    <h2>Usage</h2>
    <DocsCodeBlock lang="vue" :code="`<VueQRCode
  value=&quot;https://nuxt.com&quot;
  level=&quot;H&quot;
  :image-settings=&quot;{
    src: '/logo.svg',
    width: 40,
    height: 40,
    excavate: true,
  }&quot;
/>`" />

    <div class="callout callout-warn">
      Always use <code>level=&quot;H&quot;</code> when embedding images. The image covers part of the
      QR code, so high error correction is needed for reliable scanning.
    </div>

    <div class="callout callout-info">
      For raster downloads (<code>png</code>/<code>jpeg</code>) of QR codes with cross-origin images,
      set <code>crossOrigin: 'anonymous'</code> and ensure the image server sends the correct CORS headers.
    </div>
  </div>
</template>
