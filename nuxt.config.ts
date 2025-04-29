const FRONTEND_URL = "http://localhost:3000";
const BACKEND_URL = "http://127.0.0.1:8000";

export default defineNuxtConfig({
  compatibilityDate: '2025-03-13',

  future: {
    compatibilityVersion: 4,
  },
  telemetry: true,
  ssr: false,
  devtools: {
    enabled: false,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Home',
      titleTemplate: '%s | SEO CMS',
      htmlAttrs: {
        lang: 'en',
      },
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
    'nuxt-tiptap-editor',
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
    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' ,
      alwaysRedirect: true
    }
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
