export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    try {
      return await env.ASSETS.fetch(request)
    } catch (e) {
      // Jika bukan permintaan untuk file statis, arahkan ke index.html
      if (!url.pathname.match(/\.\w+$/)) {
        return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request))
      }
      return new Response('Not found', { status: 404 })
    }
  },
}
