<template>
  <div>
    <flash-message variant="success"></flash-message>
    <b-alert :variant="alert.variant"
             dismissible
             :show="hasAlert"
             auto
             @dismissed="dismissAlert">
      {{ alert.message }}
    </b-alert>
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
              :api-url="apiUrl"
              :fields="fields"
              :http-options="authHeader"
              :css="css"
              pagination-path="meta.pagination"
              @vuetable:pagination-data="onPaginationData"
              detail-row-component="course-details-row"
              @vuetable:cell-clicked="onCellClicked"
              :append-params="searchParams"
    >

      <template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <b-button size="sm" variant="info" @click="onClickEdit(props.rowData, props.rowIndex)">
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button size="sm" variant="danger" @click="onClickDelete(props.rowData, props.rowIndex)">
            <i class="fas fa-trash"/>
          </b-button>
        </div>
      </template>
    </vuetable>
    <pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"/>
    <v-dialog/>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import Pagination from '@/components/Pagination'
import authMixin from '@/mixins/Auth'
import datatableCallbacks from '@/mixins/DatatableCallbacks'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import {PASSPORT_API_URL} from '@/.env'
import CourseDetailsRow from './CourseDetailsRow'
import {http} from '@/auth/Http'
import alert from '@/mixins/Alert'
import FilterBar from './CourseListFilterBar'
import VueEvents from 'vue-events'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)
Vue.component('course-details-row', CourseDetailsRow)

export default {
  name: 'admin-list-courses',
  mixins: [authMixin, datatableCallbacks, alert],
  components: {
    Vuetable,
    Pagination,
    VuetablePaginationInfo,
    CourseDetailsRow,
    FilterBar
  },
  computed: {
    apiUrl: () => {
      return PASSPORT_API_URL + 'courses'
    }
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
          name: '__checkbox',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },
        {
          name: 'id',
          title: '#',
          sortField: 'id'
        },
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
          name: '__slot:actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ],
      searchParams: {}
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      // this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onClickEdit (data, index) {
      this.$router.push({name: 'UpsertCourse', params: {id: data.id}})
    },
    onCellClicked (data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onClickDelete (data, index) {
      const confirmVal = confirm('Are you sure to delete the course')
      if (confirmVal) {
        http().delete('courses/' + data.id).then(r => {
          this.setAlert('Course has been deleted', 'success')
          this.$refs.vuetable.refresh()
        }).catch(e => {
          this.setAlert(e.response.data.message, 'danger')
        })
      }
    },
    onFilterSet (query) {
      this.searchParams = {
        'query': query
      }
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    onFilterReset () {
      this.searchParams = {}
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    }
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
  }
}
</script>
