<template>
  <b-container fluid>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">C</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
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

    <b-row>
      <b-col>
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { clearAuthData } from '@/auth/auth.ts'

export default {
  name: 'layouts-admin',
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    logout () {
      clearAuthData()
      this.flash({ message: 'You have been logged out', variant: 'success' })
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
