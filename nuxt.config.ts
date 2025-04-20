const FRONTEND_URL = "http://localhost:3000";
const BACKEND_URL = "http://127.0.0.1:8000";

export default defineNuxtConfig({
  compatibilityDate: '2025-03-13',

  future: {
    compatibilityVersion: 4,
  },
  telemetry: true,
  ssr: true,
  devtools: {
    enabled: false,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Home',
      titleTemplate: '%s | Vinawebapp.com',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Vinawebapp.com | Makeup & More' },
        { property: 'og:description', content: "Unlock your potential at Vinawebapp.com, Vietnam's premier Makeup Artist School. Elevate your artistry, embrace beauty, and master the craft." },
        { property: 'og:image', content: FRONTEND_URL + "/meta_image.png" },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Vinawebapp.com | Makeup & More' },
        { name: 'twitter:description', content: "Unlock your potential at Vinawebapp.com, Vietnam's premier Makeup Artist School. Elevate your artistry, embrace beauty, and master the craft." },
        { name: 'twitter:image', content: FRONTEND_URL + "/meta_image.png" },
      ],


    },
  },

  routeRules: {
    'auth/verify': { ssr: false }
  },

  css: ['~/assets/css/main.css'],


  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-security',
    '@nuxtjs/google-fonts',
    'v-gsap-nuxt',
    'nuxt-tiptap-editor',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',


  ],
  site: {
    url: FRONTEND_URL,
    name: 'Vinawebapp.com'
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      strategy: 'prefix_except_default',
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' ,
      alwaysRedirect: true
    }
  },
  sitemap: {
    exclude: ['/vnwa/**', '/account/**', '/auth/**'],
  },
  robots: {
    disallow: ['/vnwa'],
  },
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
  ui: {
    // colorMode: false
    theme: {
      colors: ['primary', 'vnwa', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }
  },
  image: {
    domains: ['vnwa.thuonglee.vinawebapp.com'], // Thêm domain của bạn vào đây
    format: ['webp', 'jpeg', 'png'],
    providers: {
      storage: {
        name: 'storage', // optional value to overrider provider name
        provider: '~/providers/storage-provider.ts', // Path to custom provider
        options: {
          baseURL: BACKEND_URL + '/vnwa-image/'
        }
      }
    },
    provider: 'storage',
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280
    }

  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://*", BACKEND_URL],
      },
    },
  },

  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: "UTC",
  },

  typescript: {
    strict: false,
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      'Bodoni Moda': [100],
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  },

  runtimeConfig: {
    apiLocal: BACKEND_URL,
    public: {
      appUrl: FRONTEND_URL,
      apiUrl: BACKEND_URL + '/api/v1',
      apiBase: BACKEND_URL,
      apiPrefix: '/api/v1',
      storageBase: BACKEND_URL + '/vnwa-image/',
      providers: {
        google: {
          name: "Google",
          icon: "",
          color: "neutral",
          variant: "soft",
        },
      },
    },
  },
})
