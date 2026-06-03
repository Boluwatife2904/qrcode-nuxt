<script setup lang="ts">
const description = 'Try the interactive qrcode-nuxt demo. Experiment with all component props and see live SVG QR code output.'
usePageSeo('Demo', description)
defineOgImage('DocsCover', { title: 'Interactive Demo', description })
import type {
  QrCodeNuxt,
  DataModulesStyle,
  FinderPatternOuterStyle,
  FinderPatternInnerStyle,
} from '../../src/runtime'

const qr = useTemplateRef<QrCodeNuxt>('qr')

const value = ref('https://nuxt.com')
const size = ref(240)
const level = ref<'L' | 'M' | 'Q' | 'H'>('H')
const moduleStyle = ref<DataModulesStyle>('rounded')
const useGradient = ref(true)
const gradientType = ref<'linear' | 'radial'>('linear')
const color1 = ref('#10b981')
const color2 = ref('#3b82f6')
const gradientAngle = ref(135)
const bgColor = ref('#ffffff')
const transparentBg = ref(false)
const outerStyle = ref<FinderPatternOuterStyle>('rounded-lg')
const innerStyle = ref<FinderPatternInnerStyle>('rounded-lg')
const randomSize = ref(false)

const useImage = ref(false)
const imageSrc = ref('')
const imageWidth = ref(40)
const imageHeight = ref(40)
const imageExcavate = ref(true)
const imageOpacity = ref(1)
</script>

<template>
  <div>
    <div class="page-label">Getting Started</div>
    <div class="prose" style="margin-bottom: 32px;">
      <h1>Demo</h1>
      <p>Interactively configure every aspect of your QR code. All changes reflect live.</p>
    </div>

    <div class="demo-layout">
      <!-- Controls -->
      <div class="controls">
        <div class="ctrl-section">
          <h3 class="ctrl-title">Content</h3>
          <label class="ctrl-label">
            Value
            <input v-model="value" type="text" class="ctrl-input" placeholder="URL or text..." />
          </label>
          <div class="ctrl-row">
            <label class="ctrl-label ctrl-label--sm">
              Size (px)
              <input v-model.number="size" type="number" min="64" max="512" step="8" class="ctrl-input" />
            </label>
            <label class="ctrl-label ctrl-label--sm">
              Error correction
              <select v-model="level" class="ctrl-input">
                <option value="L">L – Low (7%)</option>
                <option value="M">M – Medium (15%)</option>
                <option value="Q">Q – Quartile (25%)</option>
                <option value="H">H – High (30%)</option>
              </select>
            </label>
          </div>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Data Modules</h3>
          <label class="ctrl-label">
            Style
            <select v-model="moduleStyle" class="ctrl-input">
              <option value="square">Square</option>
              <option value="square-sm">Square SM</option>
              <option value="pinched-square">Pinched Square</option>
              <option value="rounded">Rounded</option>
              <option value="circle">Circle</option>
              <option value="diamond">Diamond</option>
              <option value="star">Star</option>
              <option value="heart">Heart</option>
              <option value="leaf">Leaf</option>
              <option value="hashtag">Hashtag</option>
              <option value="vertical-line">Vertical Line</option>
              <option value="horizontal-line">Horizontal Line</option>
              <option value="circuit-board">Circuit Board</option>
            </select>
          </label>
          <label class="ctrl-check">
            <input v-model="randomSize" type="checkbox" />
            Random size (where supported)
          </label>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Finder Patterns</h3>
          <div class="ctrl-row">
            <label class="ctrl-label ctrl-label--sm">
              Outer style
              <select v-model="outerStyle" class="ctrl-input">
                <option value="square">Square</option>
                <option value="pinched-square">Pinched Square</option>
                <option value="rounded-sm">Rounded SM</option>
                <option value="rounded">Rounded</option>
                <option value="rounded-lg">Rounded LG</option>
                <option value="circle">Circle</option>
                <option value="inpoint-sm">Inpoint SM</option>
                <option value="inpoint">Inpoint</option>
                <option value="inpoint-lg">Inpoint LG</option>
                <option value="outpoint-sm">Outpoint SM</option>
                <option value="outpoint">Outpoint</option>
                <option value="outpoint-lg">Outpoint LG</option>
                <option value="leaf-sm">Leaf SM</option>
                <option value="leaf">Leaf</option>
                <option value="leaf-lg">Leaf LG</option>
              </select>
            </label>
            <label class="ctrl-label ctrl-label--sm">
              Inner style
              <select v-model="innerStyle" class="ctrl-input">
                <option value="square">Square</option>
                <option value="pinched-square">Pinched Square</option>
                <option value="rounded-sm">Rounded SM</option>
                <option value="rounded">Rounded</option>
                <option value="rounded-lg">Rounded LG</option>
                <option value="circle">Circle</option>
                <option value="inpoint-sm">Inpoint SM</option>
                <option value="inpoint">Inpoint</option>
                <option value="inpoint-lg">Inpoint LG</option>
                <option value="outpoint-sm">Outpoint SM</option>
                <option value="outpoint">Outpoint</option>
                <option value="outpoint-lg">Outpoint LG</option>
                <option value="leaf-sm">Leaf SM</option>
                <option value="leaf">Leaf</option>
                <option value="leaf-lg">Leaf LG</option>
                <option value="diamond">Diamond</option>
                <option value="star">Star</option>
                <option value="heart">Heart</option>
                <option value="hashtag">Hashtag</option>
                <option value="microchip">Microchip</option>
              </select>
            </label>
          </div>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Gradient</h3>
          <label class="ctrl-check">
            <input v-model="useGradient" type="checkbox" />
            Enable gradient
          </label>
          <template v-if="useGradient">
            <div class="ctrl-row">
              <label class="ctrl-label ctrl-label--sm">
                Type
                <select v-model="gradientType" class="ctrl-input">
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </label>
              <label v-if="gradientType === 'linear'" class="ctrl-label ctrl-label--sm">
                Angle
                <input v-model.number="gradientAngle" type="number" min="0" max="360" class="ctrl-input" />
              </label>
            </div>
            <div class="ctrl-row">
              <label class="ctrl-label ctrl-label--sm">
                Color 1
                <input v-model="color1" type="color" class="ctrl-color" />
              </label>
              <label class="ctrl-label ctrl-label--sm">
                Color 2
                <input v-model="color2" type="color" class="ctrl-color" />
              </label>
            </div>
          </template>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Background</h3>
          <label class="ctrl-check">
            <input v-model="transparentBg" type="checkbox" />
            Transparent
          </label>
          <label v-if="!transparentBg" class="ctrl-label">
            Color
            <input v-model="bgColor" type="color" class="ctrl-color" />
          </label>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Image</h3>
          <label class="ctrl-check">
            <input v-model="useImage" type="checkbox" />
            Embed image
          </label>
          <template v-if="useImage">
            <label class="ctrl-label">
              URL
              <input v-model="imageSrc" type="text" class="ctrl-input" placeholder="https://..." />
            </label>
            <div class="ctrl-row">
              <label class="ctrl-label ctrl-label--sm">
                Width
                <input v-model.number="imageWidth" type="number" min="10" max="120" class="ctrl-input" />
              </label>
              <label class="ctrl-label ctrl-label--sm">
                Height
                <input v-model.number="imageHeight" type="number" min="10" max="120" class="ctrl-input" />
              </label>
            </div>
            <div class="ctrl-row">
              <label class="ctrl-label ctrl-label--sm">
                Opacity
                <input v-model.number="imageOpacity" type="range" min="0" max="1" step="0.05" class="ctrl-input ctrl-range" />
              </label>
            </div>
            <label class="ctrl-check">
              <input v-model="imageExcavate" type="checkbox" />
              Excavate modules
            </label>
          </template>
        </div>

        <div class="ctrl-section">
          <h3 class="ctrl-title">Export</h3>
          <div class="export-btns">
            <button class="export-btn" @click="qr?.download({ format: 'svg', size: 800 })">SVG</button>
            <button class="export-btn" @click="qr?.download({ format: 'png', size: 800 })">PNG</button>
            <button class="export-btn" @click="qr?.download({ format: 'jpeg', size: 800 })">JPEG</button>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="preview">
        <VueQRCode
          ref="qr"
          :value="value || 'qrcode-nuxt'"
          :size="Math.min(size, 400)"
          :level="level"
          :background="transparentBg ? undefined : bgColor"
          :gradient="useGradient ? {
            type: gradientType,
            rotation: gradientAngle,
            stops: [
              { offset: '0%', color: color1 },
              { offset: '100%', color: color2 },
            ],
          } : undefined"
          :data-modules-settings="{
            style: moduleStyle,
            randomSize: randomSize,
          }"
          :finder-pattern-outer-settings="{ style: outerStyle }"
          :finder-pattern-inner-settings="{ style: innerStyle }"
          :image-settings="useImage && imageSrc ? {
            src: imageSrc,
            width: imageWidth,
            height: imageHeight,
            excavate: imageExcavate,
            opacity: imageOpacity,
          } : undefined"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 28px;
  align-items: start;
}

/* Controls */
.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ctrl-section {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ctrl-title {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0;
}

.ctrl-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #8a9ab0;
}
.ctrl-label--sm { flex: 1; }

.ctrl-row {
  display: flex;
  gap: 10px;
}

.ctrl-input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 13px;
  padding: 7px 10px;
  width: 100%;
  outline: none;
  transition: border-color .15s;
  -webkit-appearance: none;
}
.ctrl-input:focus { border-color: var(--accent); }
.ctrl-input option { background: #1a1d24; }
.ctrl-range { padding: 10px 4px; border: none; background: none; accent-color: var(--accent); cursor: pointer; }

.ctrl-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #8a9ab0;
  cursor: pointer;
}
.ctrl-check input { accent-color: var(--accent); width: 15px; height: 15px; cursor: pointer; }

.ctrl-color {
  width: 100%;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 2px;
  background: var(--bg);
  cursor: pointer;
}

.export-btns {
  display: flex;
  gap: 8px;
}
.export-btn {
  flex: 1;
  padding: 8px 10px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
}
.export-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

/* Preview */
.preview {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 40px;
}

@media (max-width: 720px) {
  .demo-layout { grid-template-columns: 1fr; }
  .preview { position: static; min-height: 280px; }
}
</style>
