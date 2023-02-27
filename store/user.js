import { initAuth, logOut, logIn, createUser, emailReset, emailVerification } from '~/services/fireinit'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
    emailVerified: false,
  },
  afterLogin: '/users', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
  listeningAuth: false,
})

export const getters = {
  logged: (state, getters, rootState) => state.user.uid !== null,
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.displayName = user.displayName
      state.user.email = user.email
      state.user.uid = user.uid
      state.user.emailVerified = user.emailVerified
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.email = ''
      state.user.emailVerified = false
    }
  },
  setListeningAuth(state, listening) {
    state.listeningAuth = listening
  },
  setAfterLogin(state, url) {
    state.afterLogin = url
  },
}

export const actions = {
  initAuth({ state, commit, dispatch }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      initAuth((user) => {
        commit('setUser', user)
      })
    }
  },
  async logout({ commit, dispatch }) {
    await logOut()
  },
  async signUserUp({ state, commit, dispatch }, { email, password }) {
    await createUser(email, password)
    return state.user
  },
  async signUserIn({ commit, state, dispatch }, { email, password }) {
    await logIn(email, password)
    return state.user
  },
  async resetPasswordWithEmail({ commit }, email) {
    await emailReset(email)
  },
  async sendVerificationEmail({ state, dispatch }) {
    return await emailVerification()
  },
}
