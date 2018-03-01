<template>
  <div>
    <flash-message variant="success"></flash-message>
    <vuetable ref="vuetable"
              api-url="http://courses-management.localhost/api/v1/courses"
              :fields="fields"
              :http-options="authHeader"
              :css="css"
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
      css: {
        ascendingIcon: 'fas fa-long-arrow-alt-up',
        descendingIcon: 'fas fa-long-arrow-alt-down',
        tableClass: 'table'
      },
      fields: [
        {
          name: 'name',
          title: 'Name',
          sortField: 'name'
        },
        {
          name: 'slug',
          title: 'Slug',
          sortField: 'slug'
        },
        {
          name: 'visible',
          title: 'Visible',
          sortField: 'visible',
          callback: 'formatBoolean'
        },
        {
          name: 'start',
          title: 'Start',
          sortField: 'start',
          callback: 'formatDate'
        },
        {
          name: 'end',
          title: 'End',
          sortField: 'end',
          callback: 'formatDate'
        },
        {
          name: 'updated_at',
          title: 'Last Updated',
          sortField: 'updated_at',
          callback: 'formatDate'
        },
        {
          name: 'created_at',
          title: 'Created',
          sortField: 'created_at',
          callback: 'formatDate'
        }
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
