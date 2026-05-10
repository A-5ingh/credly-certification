import https from 'node:https'
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

const credlyDevProxy = {
  name: 'credly-dev-proxy',
  configureServer(server: any) {
    server.middlewares.use('/api/credly', async (req: any, res: any, next: any) => {
      if (!req.url) {
        return next()
      }

      const targetUrl = `https://www.credly.com${req.url}`
      console.log('[Credly Proxy] Proxying request to:', targetUrl)

      try {
        const response = await fetch(targetUrl, {
          method: req.method,
          headers: {
            'user-agent': 'Mozilla/5.0 (compatible; Credly Showcase App)',
          },
          redirect: 'follow',
          agent: new https.Agent({ rejectUnauthorized: false }),
        })

        console.log('[Credly Proxy] Response status:', response.status)
        res.statusCode = response.status
        response.headers.forEach((value, name) => {
          const lower = name.toLowerCase()
          if (lower === 'transfer-encoding' || lower === 'content-encoding' || lower === 'content-length') return
          res.setHeader(name, value)
        })

        const buffer = await response.arrayBuffer()
        res.setHeader('Content-Length', String(buffer.byteLength))
        res.end(Buffer.from(buffer))
      } catch (error: any) {
        console.error('[Credly Proxy] Error proxying to', targetUrl, ':', error.message)
        res.statusCode = 502
        res.end('Credly proxy error')
      }
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    credlyDevProxy as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  server: {
    port: 5000,
  },
});
