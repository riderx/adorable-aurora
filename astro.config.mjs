import cloudflare from '@astrojs/cloudflare'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    routing: {
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'Astro Starlight CSS Leak Repro',
      prerender: false,
      disable404Route: true,
      sidebar: [
        {
          label: 'Docs',
          items: [{ slug: 'docs' }],
        },
      ],
    }),
  ],
})
