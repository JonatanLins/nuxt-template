import { auth, authPersistence, googleProvider } from '@/plugins/firebase'

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
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'O e-mail digitado já está em uso',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/weak-password': 'A senha digitada é fraca demais'
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
    auth.setPersistence(authPersistence.LOCAL)
      .then(() => {
        auth.signInWithEmailAndPassword(data.username, data.password)
          .catch(err => commit('setError', err.code))
      })
  },

  logout ({ commit }) {
    commit('cleanError')
    auth.signOut()
      .catch(err => commit('setError', err.code))
  },

  register ({ commit }, data) {
    commit('cleanError')
    auth.createUserWithEmailAndPassword(data.username, data.password)
      .then(({ user }) => {
        user.updateProfile({ displayName: data.displayName })
          .catch(err => commit('setError', err.code))
      })
      .catch(err => commit('setError', err.code))
  },

  googleLogin ({ commit }) {
    auth.signInWithRedirect(googleProvider)
      .catch(err => commit('setError', err.code))
  }
}
