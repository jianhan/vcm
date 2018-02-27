<template>
  <div>
    <flash-message variant="success"></flash-message>
    asdf
    <vuetable ref="vuetable"
              api-url="http://courses-management.localhost/api/v1/courses"
              :fields="fields"
              :http-options="authHeader"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <vuetable-pagination ref="pagination"
                         @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import authMixin from '@/mixins/auth'

export default {
  name: 'admin-list-courses',
  mixins: [authMixin],
  components: {
    Vuetable,
    VuetablePagination
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
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
