<script setup lang="ts">
interface NavItem {
  label: string;
  to: string;
  external?: boolean;
}
interface NavSection {
  title: string;
  items: NavItem[];
}

const route = useRoute();

const {
  public: { version },
} = useRuntimeConfig();

const mobileOpen = ref(false);
const isDark = ref(true);

const nav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", to: "/" },
      { label: "Installation", to: "/installation" },
      { label: "Quick Start", to: "/quick-start" },
      { label: "Demo", to: "/demo" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "VueQRCode", to: "/api/props" },
      { label: "DataModulesSettings", to: "/api/data-modules-settings" },
      { label: "FinderPatternOuterSettings", to: "/api/finder-pattern-outer-settings" },
      { label: "FinderPatternInnerSettings", to: "/api/finder-pattern-inner-settings" },
      { label: "GradientSettings", to: "/api/gradient-settings" },
      { label: "ImageSettings", to: "/api/image-settings" },
      { label: "useQrcode", to: "/api/ref-api" },
    ],
  },
  {
    title: "Examples",
    items: [
      { label: "Basic", to: "/examples/basic" },
      { label: "Data Modules", to: "/examples/data-modules" },
      { label: "Finder Patterns", to: "/examples/finder-patterns" },
      { label: "Background", to: "/examples/background" },
      { label: "Image", to: "/examples/image" },
      { label: "Download", to: "/examples/download" },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Report Issue", to: "https://github.com/boluwatife2904/qrcode-nuxt/issues", external: true },
      { label: "Request Feature", to: "https://github.com/boluwatife2904/qrcode-nuxt/discussions", external: true },
    ],
  },
];

const allPages = nav.flatMap((s) => s.items.filter((i) => !i.external));
const currentIndex = computed(() => allPages.findIndex((p) => p.to === route.path));
const prevPage = computed(() => (currentIndex.value > 0 ? allPages[currentIndex.value - 1] : null));
const nextPage = computed(() => (currentIndex.value < allPages.length - 1 ? allPages[currentIndex.value + 1] : null));

const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.add("no-transitions");

  isDark.value = !isDark.value;
  if (isDark.value) {
    html.classList.remove("light");
    localStorage.setItem("qrcode-nuxt-theme", "dark");
  } else {
    html.classList.add("light");
    localStorage.setItem("qrcode-nuxt-theme", "light");
  }

  // Remove after the browser has painted the new theme
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      html.classList.remove("no-transitions");
    }),
  );
};

onMounted(() => {
  const saved = localStorage.getItem("qrcode-nuxt-theme");
  if (saved === "light") {
    isDark.value = false;
    document.documentElement.classList.add("light");
  }
});

watch(
  () => route.path,
  () => {
    mobileOpen.value = false;
  },
);
</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: mobileOpen }">
      <div class="sidebar-scroll">
        <NuxtLink to="/" class="site-logo">
          <img src="/logo.webp" alt="qrcode-nuxt" class="logo-mark" />
          <div>
            <div class="logo-name">qrcode-nuxt</div>
            <div class="logo-sub">v{{ version }}</div>
          </div>
        </NuxtLink>

        <nav class="nav">
          <div v-for="section in nav" :key="section.title" class="nav-group">
            <p class="nav-group-title">{{ section.title }}</p>
            <ul>
              <li v-for="item in section.items" :key="item.to">
                <a
                  v-if="item.external"
                  :href="item.to"
                  target="_blank"
                  rel="noopener"
                  class="nav-link nav-link-external"
                >
                  {{ item.label }}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <NuxtLink v-else :to="item.to" class="nav-link" active-class="active">
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>

    <!-- Overlay -->
    <div class="overlay" :class="{ visible: mobileOpen }" @click="mobileOpen = false" />

    <!-- Main -->
    <div class="body">
      <header class="topbar">
        <button class="menu-btn" aria-label="Toggle navigation" @click="mobileOpen = !mobileOpen">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <div class="topbar-actions">
          <button
            class="theme-btn"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg v-if="isDark" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4" />
              <path
                d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.5 9.5A6 6 0 016.5 2.5a6 6 0 000 11 6 6 0 007-4z"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <a href="https://github.com/Boluwatife2904/qrcode-nuxt" target="_blank" rel="noopener" class="gh-link">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <div class="body-inner">
        <main class="content">
          <slot />

          <footer v-if="prevPage || nextPage" class="page-footer">
            <NuxtLink v-if="prevPage" :to="prevPage.to" class="pager pager-prev">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>
                <em>Previous</em>
                <strong>{{ prevPage.label }}</strong>
              </span>
            </NuxtLink>
            <NuxtLink v-if="nextPage" :to="nextPage.to" class="pager pager-next">
              <span>
                <em>Next</em>
                <strong>{{ nextPage.label }}</strong>
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2l5 5-5 5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NuxtLink>
          </footer>
        </main>

        <aside class="toc-panel">
          <DocsToc />
        </aside>
      </div>
    </div>
  </div>
</template>
