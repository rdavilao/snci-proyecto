<template>
  <v-app>
    <v-navigation-drawer theme="dark" v-model="drawer" rail expand-on-hover>
      <v-list-item v-if="logged" nav :prepend-avatar="user.photoUrl"> Bienvenido {{ user.firstName }}</v-list-item>
      <v-list-item v-else="logged" nav prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"> Bienvenido
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <div v-for="(item, i) in items">
          <v-list-item v-if="item.needLogged == logged || item.needLogged == 'none'" :key="i" :to="item.to"
            :title="item.title" :prepend-icon="item.icon" exact>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="logged" icon @click.stop="doLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else icon to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState, storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    return {
      userStore,
      user,
    }
  },
  data: () => ({
    drawer: false,
    title: 'UniUnite',
    items: [
      {
        icon: 'mdi-home',
        title: 'Home',
        needLogged: true,
        to: '/',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Login',
        needLogged: false,
        to: '/login',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Sign Up',
        needLogged: false,
        to: '/register',
      },
    ],
  }),
  computed: {
    ...mapState(useUserStore, ['logged']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    async doLogout() {
      await this.logout()
      await this.$router.push('/login')
    }
  }
}
</script>
