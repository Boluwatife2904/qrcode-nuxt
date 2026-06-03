<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()
const description = 'Highly customizable SVG QR codes for Vue and Nuxt. Style every pixel: data modules, finder patterns, gradients, image embedding, and SVG/PNG/JPEG export.'

useHead({ titleTemplate: null })
useSeoMeta({
  title: 'qrcode-nuxt',
  description,
  ogTitle: 'qrcode-nuxt',
  ogDescription: description,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'qrcode-nuxt',
  twitterDescription: description,
})
defineOgImage('DocsCover', {
  title: 'qrcode-nuxt',
  description,
})
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <div class="hero">
      <div class="hero-qr">
        <VueQRCode
          value="https://github.com/boluwatife2904/qrcode-nuxt"
          :size="120"
          level="H"
          :margin-size="2"
          :gradient="{ type: 'linear', rotation: 135, stops: [{ offset: '0%', color: '#10b981' }, { offset: '100%', color: '#3b82f6' }] }"
          :data-modules-settings="{ style: 'rounded' }"
          :finder-pattern-outer-settings="{ style: 'rounded-lg' }"
          :finder-pattern-inner-settings="{ style: 'rounded-lg' }"
        />
      </div>

      <div class="hero-label">QRCODE-NUXT</div>
      <h1 class="hero-title">The ultimate customizable<br><span class="grad">QR code generator</span><br>for Vue & Nuxt</h1>
      <p class="hero-sub">
        A full port of the <code>react-qr-code</code> feature set to the Vue ecosystem.
        Style every pixel: data modules, finder patterns, gradients, image embedding,
        and SVG/PNG/JPEG export.
      </p>

      <div class="hero-actions">
        <NuxtLink to="/installation" class="btn btn-primary">Get started</NuxtLink>
        <NuxtLink to="/demo" class="btn btn-ghost">Live demo</NuxtLink>
      </div>

      <div class="hero-install">
        <DocsCodeBlock
          code="pnpm add qrcode-nuxt"
          lang="bash"
        />
      </div>
    </div>

    <!-- Features -->
    <div class="features">
      <div class="feature">
        <div class="feature-icon">✦</div>
        <h3>Highly Customizable</h3>
        <p>13 data module styles, 15 finder pattern styles, per-element color control, and gradient support for every layer.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">◈</div>
        <h3>SVG-Based Rendering</h3>
        <p>Pure SVG output — infinitely scalable, crisp at any resolution, and ready for print or high-DPI screens.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">⬡</div>
        <h3>Nuxt Auto-Imports</h3>
        <p>
          <code>&lt;VueQRCode&gt;</code>, <code>&lt;QrcodeNuxt&gt;</code>, and the
          <code>useQrcode</code> composable are auto-imported with zero config.
        </p>
      </div>
      <div class="feature">
        <div class="feature-icon">⬡</div>
        <h3>Download API</h3>
        <p>Expose a <code>download()</code> method via <code>ref</code> to export your QR code as SVG, PNG, or JPEG at any size.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">◎</div>
        <h3>TypeScript First</h3>
        <p>Fully typed props, composable options, and return values. Intellisense coverage for every setting.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">✦</div>
        <h3>SSR Compatible</h3>
        <p>The SVG renderer works server-side. Download utilities safely gate on <code>document</code> availability.</p>
      </div>
    </div>

    <!-- Quick example -->
    <div class="prose" style="margin-top: 64px;">
      <h2>Quick example</h2>
      <p>Drop the component anywhere in your Nuxt app — no imports required.</p>
      <DocsCodeBlock
        lang="vue"
        filename="app.vue"
        :code="`<template>
  <VueQRCode
    value=&quot;https://nuxt.com&quot;
    :size=&quot;200&quot;
    level=&quot;H&quot;
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
.home { padding-bottom: 80px; }

/* Hero */
.hero {
  padding: 0 0 56px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 64px;
}

.hero-qr {
  display: inline-flex;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--code-bg);
  margin-bottom: 28px;
  box-shadow: 0 0 40px rgba(16,185,129,.08);
}

.hero-label {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  letter-spacing: -.035em;
  line-height: 1.12;
  color: var(--text-heading);
  margin-bottom: 20px;
}

.grad {
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 16px;
  color: var(--hero-sub-color);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: 32px;
}
.hero-sub code {
  font-family: var(--font-code);
  font-size: .85em;
  color: var(--code-color);
  background: var(--inline-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 5px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: all .15s;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-primary {
  background: var(--accent);
  color: #fff;
}
.btn-primary:hover { filter: brightness(1.1); }
.btn-ghost {
  background: none;
  border-color: var(--border);
  color: var(--text);
}
.btn-ghost:hover { border-color: var(--subtle); background: rgba(128,128,128,.08); }

.hero-install :deep(.cb) { margin: 0; }
@media (min-width: 640px) { .hero-install { max-width: 320px; } }

/* Features */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.feature {
  padding: 28px 24px;
  background: var(--bg);
  transition: background .15s;
}
.feature:hover { background: rgba(255,255,255,.02); }

.feature-icon {
  font-size: 18px;
  color: var(--accent);
  margin-bottom: 12px;
  opacity: .7;
}

.feature h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--feature-title);
  margin-bottom: 8px;
}

.feature p {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.65;
}

.feature p code {
  font-family: var(--font-code);
  font-size: .85em;
  color: var(--code-color);
  background: var(--inline-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 4px;
}
</style>
