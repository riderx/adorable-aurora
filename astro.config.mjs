import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { i18n } from 'astro-i18n-aut/integration'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const SRC_DIR = fileURLToPath(new URL('./src/', import.meta.url))

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  build: {
    compressHTML: false,
    inlineStylesheets: 'auto',
  },
  i18n: {
    locales: ['de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'zh'],
    defaultLocale: 'en',
    routing: {
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    resolve: {
      alias: [
        { find: /^\/src\//, replacement: SRC_DIR },
        { find: /^@\//, replacement: SRC_DIR },
      ],
    },
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        outdir: './src/paraglide',
        project: './project.inlang',
        disableAsyncLocalStorage: true,
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/content/docs/**/*.{md,mdx}',
            dest: '',
            rename: (fileName, _, fullPath) => {
              const relativePath = fullPath.replace(/\\/g, '/').split('src/content/docs/')[1]
              const pathWithoutExt = relativePath.replace(/\.(md|mdx)$/, '')
              const segments = pathWithoutExt.split('/')

              if (fileName === 'index') {
                if (segments.length === 1) {
                  return 'index.md'
                }

                segments.pop()
                return `${segments.join('/')}.md`
              }

              return `${pathWithoutExt}.md`
            },
          },
        ],
      }),
    ],
  },
  integrations: [
    i18n({
      locales: {
        de: 'de-DE',
        en: 'en-US',
        es: 'es-ES',
        fr: 'fr-FR',
        id: 'id-ID',
        it: 'it-IT',
        ja: 'ja-JP',
        ko: 'ko-KR',
        zh: 'zh-CN',
      },
      defaultLocale: 'en',
      redirectDefaultLocale: true,
    }),
    sitemap(),
    starlight({
      title: 'Astro Starlight Tailwind Issue',
      prerender: false,
      disable404Route: true,
      markdown: { headingLinks: true },
      customCss: ['./src/css/docs.css'],
      expressiveCode: { themes: ['github-dark'] },
      editLink: { baseUrl: 'https://github.com/example/repro/edit/main/' },
      components: {
        Head: './src/components/doc/Head.astro',
        LanguageSelect: './src/components/doc/LanguageSelect.astro',
        PageTitle: './src/components/doc/PageTitle.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/example/repro' },
      ],
      sidebar: [
        {
          label: 'Docs',
          items: [
            { slug: 'docs' },
            { slug: 'docs/getting-started' },
          ],
        },
      ],
    }),
  ],
})
