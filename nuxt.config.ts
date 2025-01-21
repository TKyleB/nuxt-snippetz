// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@types': '/<rootDir>/types'
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
    baseURL: 'NUXT_BASE_URL'
  },
  auth: {
    originEnvKey: "NUXT_BASE_URL",
    baseURL: "NUXT_BASE_URL",
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