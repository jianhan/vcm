<template>
  <div class="filter-bar ui basic segment grid">
    <div class="ui form">
      <div class="inline field">
        <label>Search for:</label>
        <input type="text" v-model="query" class="three wide column" @keyup.enter="doFilter" placeholder="name, nickname, or email">
        <button class="ui primary button" @click="doFilter">Go</button>
        <button class="ui button" @click="resetFilter">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.query)
    },
    resetFilter () {
      this.query = ''
      this.$events.fire('filter-reset')
    }
  }
}
</script>
