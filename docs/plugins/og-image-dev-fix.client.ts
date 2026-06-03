// nuxt-og-image forces hasServerRuntime=true in dev mode, which makes the client
// use /_og/r/{path}.png resolver URLs. For the root path "/", this collapses to
// /_og/r.png which the server route (/_og/r/**) doesn't match.
// Override to false so the client generates direct /_og/s/... URLs instead,
// which are served by the dev server on-demand just fine.
export default defineNuxtPlugin(() => {
  if (import.meta.dev) {
    const config = useRuntimeConfig()
    const ogConfig = config.public['nuxt-og-image'] as Record<string, unknown>
    if (ogConfig) {
      ogConfig.hasServerRuntime = false
    }
  }
})
