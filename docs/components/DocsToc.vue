<script setup lang="ts">
const route = useRoute();

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const headings = ref<TocItem[]>([]);
const activeId = ref("");

// Prevents the scroll listener from clobbering activeId during a programmatic scroll.
let scrollLocked = false;
let unlockTimer: ReturnType<typeof setTimeout> | null = null;

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");

const scanHeadings = (): void => {
  const prose = document.querySelector(".prose");
  if (!prose) {
    headings.value = [];
    return;
  }
  const els = Array.from(prose.querySelectorAll("h2, h3"));
  headings.value = els.map((el) => {
    if (!el.id) el.id = slugify(el.textContent || "");
    return {
      id: el.id,
      text: el.textContent?.trim() || "",
      level: el.tagName === "H3" ? 3 : 2,
    } as TocItem;
  });
  if (headings.value.length) updateActive();
};

const updateActive = (): void => {
  if (scrollLocked) return;

  // A heading activates only once it has crossed just under the sticky topbar (52px).
  // The 4px buffer prevents a heading that is barely peeking under the topbar from
  // activating while the user is still reading the previous section.
  const TRIGGER = 56;

  // Force the last heading when the user has scrolled as far as they can go.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    activeId.value = headings.value.at(-1)?.id ?? "";
    return;
  }

  // Walk all headings and keep the last one whose top has crossed the trigger line.
  let current = "";
  for (const { id } of headings.value) {
    const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
    if (top <= TRIGGER) current = id;
  }

  if (current) {
    activeId.value = current;
  } else {
    // Nothing has crossed yet (top of page). Activate the first heading only
    // once it enters the viewport so there is no premature highlight.
    const firstTop = document.getElementById(headings.value[0]?.id ?? "")?.getBoundingClientRect().top ?? Infinity;
    activeId.value = firstTop < window.innerHeight ? (headings.value[0]?.id ?? "") : "";
  }
};

const scrollTo = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;

  // Lock the scroll listener immediately and set the correct active state.
  // Without this, the listener would fire on every scroll frame and march
  // through every heading the view passes on the way to the destination.
  if (unlockTimer) clearTimeout(unlockTimer);
  activeId.value = id;
  scrollLocked = true;

  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });

  const unlock = () => {
    scrollLocked = false;
    unlockTimer = null;
  };

  // scrollend fires when smooth scrolling finishes (Chrome 114+, FF 109+, Safari 17.4+).
  window.addEventListener("scrollend", unlock, { once: true });
  // Fallback for browsers that don't support scrollend.
  unlockTimer = setTimeout(unlock, 1000);
};

const refresh = async (): Promise<void> => {
  headings.value = [];
  activeId.value = "";
  await nextTick();
  await nextTick();
  scanHeadings();
};

onMounted(() => {
  scanHeadings();
  window.addEventListener("scroll", updateActive, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActive);
  if (unlockTimer) clearTimeout(unlockTimer);
});

watch(() => route.path, refresh);
</script>

<template>
  <nav v-if="headings.length" class="toc" aria-label="On this page">
    <p class="toc-title">On this page</p>
    <ul class="toc-list">
      <li v-for="h in headings" :key="h.id">
        <a
          :href="`#${h.id}`"
          :class="['toc-link', h.level === 3 && 'toc-h3', activeId === h.id && 'active']"
          @click.prevent="scrollTo(h.id)"
          >{{ h.text }}</a
        >
      </li>
    </ul>
  </nav>
</template>
