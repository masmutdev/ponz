import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(request)
    } catch (e) {
      const url = new URL(request.url)

      // fallback ke index.html untuk SPA Vue
      if (!url.pathname.match(/\.\w+$/)) {
        return await getAssetFromKV(new Request(`${url.origin}/index.html`, request))
      }

      return new Response('Not Found', { status: 404 })
    }
  },
}
