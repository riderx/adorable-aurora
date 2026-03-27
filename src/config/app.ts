import { appDescription } from '@/constants/index'

const brand = 'Capgo'
const blogTitle = `${brand} | Capacitor Blog`
const blogDescription = 'The best articles to enhance your Capacitor app. Learn how to build a modern app with Capacitor.'

function baseDomainForBranch(branch = ''): string {
  if (branch === 'local') return '127.0.0.1:4321'
  return 'example.com'
}

function getUrl(branch = ''): string {
  if (branch === 'local') return `http://${baseDomainForBranch(branch)}`
  return `https://${baseDomainForBranch(branch)}`
}

function getApiUrl(branch = ''): string {
  if (branch === 'local') return 'http://127.0.0.1:8787'
  return 'https://api.example.com'
}

export function baseDomain(branch = ''): string {
  return baseDomainForBranch(branch)
}

export interface RuntimeConfig {
  public: {
    brand: string
    blog_title: string
    blog_description: string
    blog_keywords: string
    baseUrl: string
    baseApiUrl: string
  }
}

export function useRuntimeConfig(): RuntimeConfig {
  const branch = import.meta.env.BRANCH || ''

  return {
    public: {
      brand,
      blog_title: blogTitle,
      blog_description: blogDescription,
      blog_keywords: 'Astro, Starlight, Tailwind CSS, Cloudflare, Capacitor',
      baseUrl: getUrl(branch),
      baseApiUrl: getApiUrl(branch),
    },
  }
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: brand,
  description: appDescription,
  url: getUrl(import.meta.env.BRANCH || ''),
}
