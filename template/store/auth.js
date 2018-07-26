import { auth } from '@/plugins/firebase'

export const state = () => ({
  user: null,
  error: null,
  checked: false
})

export const mutations = {
  setUser (state, user) {
    state.checked = true
    state.user = user ? {
      uid: user.uid,
      name: user.displayName
    } : null
  },

  setError (state, error) {
    const messages = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuário não encontrado',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta'
    }
    state.checked = true
    state.error = messages[error] || error || 'Ocorreu um erro desconhecido'
  },

  cleanError (state) {
    state.error = null
  }
}

export const actions = {
  login ({ commit }, data) {
    commit('cleanError')
    auth().setPersistence(auth.Auth.Persistence.SESSION)
      .then(() => {
        auth()
          .signInWithEmailAndPassword(data.username, data.password)
          .catch(err => commit('setError', err.code))
      })
  },

  logout ({ commit }) {
    commit('cleanError')
    auth().signOut()
      .catch(err => commit('setError', err.code))
  }
}
