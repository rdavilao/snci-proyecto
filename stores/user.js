import { doc, setDoc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage'
import {
  initAuth,
  logIn,
  createUser,
  logOut,
  emailReset,
  emailVerification,
  getFireSt,
  getStor,
} from '~/services/fireinit'

const db = getFireSt()
const colRef = 'users'
const storage = getStor()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    authInit: false,
    afterLogin: '/', // where to go after login completes
    error: '', // last auth error message
    errorCode: {
      'invalid-email': 'Invalid e-mail',
      'user-disabled': 'User account is disabled',
      'user-not-found': 'User not found, try to sign up instead',
      'wrong-password': 'Wrong password',
      'email-already-in-use': 'Email already in use, try to sign in instead',
    },
  }),
  getters: {
    uid: (state) => (state.user ? state.user.uid : ''),
    logged: (state) => state.user !== null,
    email: (state) => (state.user ? state.user.email : ''),
    name: (state) => (state.user ? state.userInfo.name : ''),
  },
  actions: {
    async setUser(userLog) {
      const docRef = doc(db, 'users', userLog.uid)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const photoRef = ref(
        storage,
        userLog.uid + '/' + 'img/' + userData.photoName
      )
      const photoURL = await getDownloadURL(photoRef)
      const user = {
        ...userLog,
        firstName: userData.firstName ? userData.firstName : 'error',
        lastname: userData.lastName ? userData.lastName : '',
        photoName: userData.photoName ? userData.photoName : '',
        photoUrl: photoURL ? photoURL : '',
        usefulLikes: userData.usefulLikes ? userData.usefulLikes : 0,
      }
      this.user = user
    },
    setAfterLogin(url) {
      this.afterLogin = url
    },
    clearError() {
      this.error = ''
    },
    async signUserUp({ email, password, firstName, lastName, photo }) {
      var photoName = photo.name
      await this._doAction(createUser(email, password)).then((userCredentials) => {
        const storageRef = ref(storage, userCredentials.uid + '/img/' + photoName)
        uploadBytes(storageRef, photo).then(() => {})
        setDoc(doc(db, colRef, userCredentials.uid), {
          email,
          firstName,
          lastName,
          photoName,
          usefulLikes: 0,
        })
      })
      return this.user
    },
    async signUserIn({ email, password }) {
      await this._doAction(logIn(email, password))
      return this.user
    },
    async resetPasswordWithEmail(email) {
      await this._doAction(emailReset(email))
    },
    async sendVerificationEmail() {
      await this._doAction(emailVerification())
    },
    async logout() {
      await this._doAction(logOut())
    },
    initAuth() {
      if (!this.authInit) {
        this.authInit = true
        initAuth((user) => {
          if (user) {
            const userLog = {
              email: user.email,
              uid: user.uid,
              emailVerified: user.emailVerified,
            }
            this.setUser(userLog)
          } else this.user = null
        })
      }
      return this.authInit
    },
    async _doAction(promise) {
      // internal function to capture auth errors
      try {
        this.clearError()
        return await promise
      } catch (error) {
        const code = error.code.substring(5)
        this.error = this.errorCode[code] ? this.errorCode[code] : code
        return null
      }
    },
  },
})
