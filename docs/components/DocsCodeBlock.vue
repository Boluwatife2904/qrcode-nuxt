<script setup lang="ts">
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("vue", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);

interface Props {
  code: string;
  lang?: string;
  filename?: string;
}

const props = defineProps<Props>();

const copied = ref(false);

const copy = async () => {
  await navigator.clipboard.writeText(props.code.trim());
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const escHtml = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const highlighted = computed(() => {
  const raw = props.code.trim();
  const lang = props.lang || "ts";
  const supported = ["ts", "typescript", "vue", "bash", "sh"];
  if (!supported.includes(lang)) return escHtml(raw);
  return hljs.highlight(raw, { language: lang }).value;
});
</script>

<template>
  <div class="cb">
    <div class="cb-head">
      <span class="cb-lang">{{ filename || lang || "code" }}</span>
      <button class="cb-copy" :class="{ done: copied }" @click="copy">
        <svg v-if="!copied" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.2" />
          <path d="M1 8.5V2a1 1 0 011-1h6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
        </svg>
        <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 6.5l3 3 6-6"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <pre class="cb-pre"><code class="hljs" v-html="highlighted" /></pre>
  </div>
</template>

<style scoped>
.cb {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 20px 0;
  font-size: 13.5px;
}

.cb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid var(--border);
}

.cb-lang {
  font-family: var(--font-code);
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
  letter-spacing: 0.03em;
}

.cb-copy {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-ui);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 4px;
  transition:
    color 0.15s,
    background 0.15s;
}
.cb-copy:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.07);
}
.cb-copy.done {
  color: var(--accent);
}

.cb-pre {
  padding: 20px;
  overflow-x: auto;
  line-height: 1.7;
  margin: 0;
}

code {
  font-family: var(--font-code);
  font-size: 13.5px;
  display: block;
  background: none !important;
  padding: 0 !important;
}
</style>

<!-- hljs token colours are in assets/css/docs.css -->
