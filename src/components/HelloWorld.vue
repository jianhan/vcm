<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <a @click.prevent="login">Login</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    login () {
      console.log(this.$auth.options.loginData.url)
      this.$auth.options.loginData.url = 'oauth/token'
      this.$auth.options.fetchData.url = 'api/user'

      this.$auth.login({
        data: {
          username: 'jianhan@mail.com',
          password: '1984313',
          grant_type: 'password',
          client_id: 2,
          client_secret: 'oZvNaNUDTo0qhhLsrALJdIkPxUw2QD9IvPgHKdh7',
          scope: ''
        },
        success: function () {},
        error: function () {},
        redirect: '/account',
        fetchUser: true
        // etc...
      })

      // this.$http({
      //   method: 'post',
      //   url: 'oauth/token',
      //   data: {
      //     username: 'jianhan@mail.com',
      //     password: '1984313',
      //     grant_type: 'password',
      //     client_id: 2,
      //     client_secret: 'oZvNaNUDTo0qhhLsrALJdIkPxUw2QD9IvPgHKdh7',
      //     scope: ''
      //   },
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
