// nuxt-og-image generates /_og/r.png for the root path ("/") because
// joinURL("_og/r", "/") collapses the trailing slash, but the resolve route
// handler requires at least one path segment after /r. Rewrite to /_og/r/.png
// so the handler receives the request and correctly extracts "/" as the target.
export default defineEventHandler((event) => {
  if (event.path === '/_og/r.png') {
    event.node.req.url = '/_og/r/.png'
  }
})
