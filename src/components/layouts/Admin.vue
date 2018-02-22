<template>
  <b-container fluid>
    <b-navbar toggleable="md" type="dark" variant="primary" style="margin-bottom: 10px">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">C</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" v-if="menus !== null">
        <b-navbar-nav>
          <b-nav-item :to="{ name: menu.routeName }" v-for="menu in menus" v-bind:key="menu.name">
            <i v-if="menu.icon != ''" :class="menu.icon"></i>
            {{ menu.title }}
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { clearAuthData, initStore } from '@/auth/auth'
import { generateMenuList } from '@/router/menu'
import routes from '@/router/routes'

export default {
  name: 'layouts-admin',
  data () {
    return {
      menus: null
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    logout () {
      clearAuthData()
      this.flash({ message: 'You have been logged out', variant: 'success' })
      this.$router.push({name: 'Login'})
    }
  },
  mounted () {
    initStore()
    this.menus = generateMenuList(routes)
  }
}
</script>
