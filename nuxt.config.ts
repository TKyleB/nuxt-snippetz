// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'images/x-icon', href: 'favicon.png' }]
    }
  },
  alias: {
    '@types': '/<rootDir>/types'
  },
  icon: {
    provider: 'iconify'
  },
  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    'nuxt-monaco-editor',
    'nuxt-shiki'
  ],
  shiki: {
    bundledLangs: ["go", "sql"],
    defaultTheme: "slack-dark"
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    }
  },
  auth: {
    originEnvKey: "NUXT_PUBLIC_API_BASE",
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/users/login', method: 'post' },
        signOut: { path: '/api/users/logout', method: 'post' },
        signUp: { path: '/api/users/register', method: 'post' },
        getSession: { path: '/api/users', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer'
      },
      refresh: {
        endpoint: { path: '/api/users/refresh', method: 'post' },
        refreshOnlyToken: true,
        isEnabled: true,
        token: {
          signInResponseRefreshTokenPointer: '/refresh_token',
          refreshResponseTokenPointer: "/token",

        }
      },
      pages: {
        login: '/login'
      },
      session: {
        dataType: {
          user_id: 'string',
          username: 'string'
        }
      }
    }
  }
})