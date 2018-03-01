<template>
  <nav aria-label="Page navigation example" v-show="tablePagination && tablePagination.last_page > 1">
    <ul class="pagination">
      <li class="page-item">
        <a @click="loadPage(1)"
           :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']" class="page-link">
          First
        </a>
      </li>
      <li class="page-item">
        <a @click="loadPage('prev')"
           :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']" class="page-link">
          Previous
        </a>
      </li>
      <template v-if="notEnoughPages">
        <li class="page-item" v-for="n in totalPage" v-bind:key="n">
          <a @click="loadPage(n)"
             :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']"
             class="page-link"
             v-html="n">
          </a>
        </li>
      </template>
      <template v-else>
        <li class="page-item" v-for="n in windowSize" v-bind:key="n">
          <a @click="loadPage(windowStart+n-1)"
             :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']"
             class="page-link"
             v-html="windowStart+n-1">
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'

export default {
  name: 'pagination',
  mixins: [PaginationMixin]
}
</script>
