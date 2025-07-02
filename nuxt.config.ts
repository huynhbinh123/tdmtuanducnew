export default defineNuxtConfig({
  compatibilityDate: "2025-03-13",
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    externals: {
      inline: ["unhead"], // ép unhead vào bundle thay vì để external
    },
  },
  telemetry: true,
  server: {
    port: process.env.NUXT_PORT || 3000,
  },

  ssr: true,
  devtools: {
    enabled: false,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: process.env.NUXT_APP_DESCRIPTION,
      titleTemplate: "%s | " + process.env.NUXT_APP_NAME,
      htmlAttrs: {
        lang: process.env.NUXT_APP_LANG || "en",
      },
    },
  },

  routeRules: {
    "/vnwa/**": { ssr: false, swr: true },
    "/vnwa/**/**": { ssr: false, swr: true },
    "/vnwa/**/**/***": { ssr: false, swr: true },
    "auth/verify": { ssr: false, swr: true },
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "nuxt-security",
    "nuxt-tiptap-editor",
    "@nuxtjs/seo",
    "nuxt-og-image",
    "@nuxtjs/sitemap",
  ],
  site: {
    url: process.env.NUXT_FRONTEND_URL,
    name: process.env.NUXT_APP_NAME,
  },
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    exclude: ["/auth/**", "/vnwa/**"],
    sources: ["/api/__sitemap__/urls"],
  },
  i18n: {
    defaultLocale: process.env.NUXT_APP_LANG || "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "vi", name: "Tiếng Việt", file: "vi.json" },
    ],
    strategy: "prefix_and_default",

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
    customRoutes: "config",
    pages: {
      cart: {
        en: "/cart",
        vi: "/gio-hang",
      },
      register: {
        en: "/register",
        vi: "/dang-ky",
      },
      login: {
        en: "/login",
        vi: "/dang-nhap",
      },
      forgot: {
        en: "/forgot",
        vi: "/quen-mat-khau",
      },
      checkOut: {
        en: "/check-out",
        vi: "/thanh-toan",
      },
      blog: {
        en: "/blog",
        vi: "/bai-viet",
      },
      "blog-slug": {
        en: "/blog/[slug]",
        vi: "/bai-viet/[slug]",
      },
      "blog-category-slug": {
        en: "/blog/category/[slug]",
        vi: "/bai-viet/the-loai/[slug]",
      },
    },
  },

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  ui: {
    // colorMode: false
    theme: {
      colors: [
        "primary",
        "vnwa",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
  image: {
    domains: ["vnwa.vinawebapp.com"], // Thêm domain của bạn vào đây
    format: ["webp", "jpeg", "png"],
    providers: {
      storage: {
        name: "storage", // optional value to overrider provider name
        provider: "~/providers/storage-provider.ts", // Path to custom provider
        options: {
          baseURL: process.env.NUXT_BACKEND_URL + "/storage/",
        },
      },
    },
    provider: "storage",
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
    },
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      crossOriginOpenerPolicy: "same-origin-allow-popups",
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://*",
          process.env.NUXT_BACKEND_URL,
        ],
      },
    },
  },

  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "UTC",
  },

  typescript: {
    strict: false,
  },
  runtimeConfig: {
    apiLocal: process.env.NUXT_BACKEND_URL,
    public: {
      appLang: process.env.NUXT_FRONTEND_LANG || "en",
      appUrl: process.env.NUXT_FRONTEND_URL,
      apiUrl: process.env.NUXT_BACKEND_URL + "/api/v1",
      apiBase: process.env.NUXT_BACKEND_URL,
      apiPrefix: "/api/v1",
      storageBase: process.env.NUXT_BACKEND_URL + "/storage/",
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
});
