import colors from 'vuetify/es5/util/colors'


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'messma_app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1 shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Messma: mess' },
      { hid: 'author', name: 'author', content: 'Afnan Shakeel <afnanshakeel@gmail.com>' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue.modal', mode: 'client' },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint

    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/universal-storage'
  ],

  axios: {
    baseURL: 'http://localhost:8000'
  },
  
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    charset: 'utf-8',
    name: 'Messma',
    description: 'Messma: mess',
    author: 'Afnan Shakeel <afnanshakeel@gmail.com>',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    icon:{
      fileName: "icon.png",
    },
    manifest: {
      lang: 'en'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3
            }
        }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 8002,
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
