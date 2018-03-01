<template>
  <div>
    <flash-message variant="success"></flash-message>
    <vuetable ref="vuetable"
              api-url="http://courses-management.localhost/api/v1/courses"
              :fields="fields"
              :http-options="authHeader"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    <pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" />
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import Pagination from '@/components/pagination'
import authMixin from '@/mixins/auth'
import datatableCallbacks from '@/mixins/datatable-callbacks'

export default {
  name: 'admin-list-courses',
  mixins: [authMixin, datatableCallbacks],
  components: {
    Vuetable,
    Pagination
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
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
