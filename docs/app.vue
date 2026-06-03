<script setup lang="ts">
useSeoMeta({
  ogType: "website",
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
