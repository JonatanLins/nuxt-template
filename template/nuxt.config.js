module.exports = {
  head: {
    title: '{{ name }}',
    htmlAttrs: { lang: 'pt-br' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{ escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    {{#vuetify}}
    { src: '@/plugins/vuetify.js' },
    {{/vuetify}}
    {{#firebase}}
    { src: '@/plugins/firebase.js' },
    {{/firebase}}
    { src: '@/plugins/scripts.js' }
  ],
  css: [
    {{#vuetify}}
    '@/assets/style/app.styl'
    {{else}}
    '@/assets/style/main.scss'
    {{/vuetify}}
  ],
  mode: 'spa',
  loading: { color: '#3B8070' },
  {{#firebaseAuth}}
  router: { middleware: 'checkAuth' },
  {{/firebaseAuth}}
  build: {
    vendor: [
      {{#vuetify}}
      '@/plugins/vuetify.js',
      {{/vuetify}}
      {{#firebase}}
      '@/plugins/firebase.js',
      {{/firebase}}
      '@/plugins/icons.js'
    ],
    extractCSS: true,
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [
              /es6-promise|\.(?!(?:js|json)$).{1,5}$/i,
              /^vue-awesome/
            ]
          })
        ]
      }
    }
  }
}
