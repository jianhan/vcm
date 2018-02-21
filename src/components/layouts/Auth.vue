<template>
  <b-container>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'Login'}">Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
      <b-col md="6" offset-md="3" sm="12" style="padding: 10px">
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'layouts-auth'
}
</script>
