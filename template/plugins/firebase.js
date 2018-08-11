import firebase from 'firebase/app'
{{#firebaseFirestore}}
import 'firebase/firestore'
{{/firebaseFirestore}}
{{#firebaseAuth}}
import 'firebase/auth'
{{/firebaseAuth}}

if (!firebase.apps.length) {
  firebase.initializeApp({
    // firebase config data
  })
}
{{#firebaseFirestore}}
export const firestore = firebase.firestore()

const firestoreSettings = { timestampsInSnapshots: true }
firestore.settings(firestoreSettings)
{{/firebaseFirestore}}
{{#firebaseAuth}}

export const auth = firebase.auth()
export const authPersistence = firebase.auth.Auth.Persistence
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export default function ({ store }) {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      return resolve(store.commit('auth/setUser', user))
    })
  })
}{{/firebaseAuth}}
