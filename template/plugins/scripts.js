import Vue from 'vue'

// Pega todos os componentes da pasta 'components' e os registra globalmente
const files = require.context('@/components', false)
files.keys().forEach(key => {
  Vue.component(key.replace(/(^\.\/)|(\.(ts|js|vue)$)/g, ''), files(key).default)
})
