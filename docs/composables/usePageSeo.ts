export const usePageSeo = (title: string, description: string) => {
  const { public: { siteUrl } } = useRuntimeConfig()
  const route = useRoute()

  useSeoMeta({
    title,
    description,
    ogTitle: `${title} | qrcode-nuxt`,
    ogDescription: description,
    ogUrl: `${siteUrl}${route.path}`,
    twitterTitle: `${title} | qrcode-nuxt`,
    twitterDescription: description,
  })
}
