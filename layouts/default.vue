<template>
  <v-app>
    <v-navigation-drawer theme="dark" v-model="drawer" rail expand-on-hover>
      <v-list-item v-if="logged" nav prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"> Bienvenido
        Daniel</v-list-item>
      <v-list-item v-else="logged" nav prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"> Bienvenido
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <div v-for="(item, i) in items" >
          <v-list-item v-if="item.needLogged == logged" :key="i" :to="item.to" :title="item.title" :prepend-icon="item.icon" 
            exact>
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
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  data: () => ({
    drawer: false,
    title: 'UniUnite',
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        needLogged: false,
        to: '/',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        needLogged: true,
        to: '/inspire',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Users',
        needLogged: true,
        to: '/users',
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
      await this.$router.push('/')
    }
  }
}
</script>
