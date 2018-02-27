<template>
  <div>
    <flash-message variant="success"></flash-message>
    <vuetable ref="vuetable"
              api-url="http://courses-management.localhost/api/v1/courses"
              :fields="fields"
              :http-options="authHeader"
    ></vuetable>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import authMixin from '@/mixins/auth'

export default {
  name: 'admin-list-courses',
  mixins: [authMixin],
  components: {
    Vuetable
  },
  data () {
    return {
      fields: [
        'name',
        'slug',
        {
          name: 'visible',
          callback: 'formatBoolean'
        },
        'start',
        'end',
        'created_at',
        'updated_at'
      ]
    }
  },
  methods: {
    formatBoolean (val) {
      return val
    }

  }
}
</script>
