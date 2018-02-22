<template>
  <div>
    <b-row class="table-row">
      <b-col>
        <b-button :to="{ name: 'UpsertCourse' }" variant="success" size="sm" placement="rightbottom" v-b-tooltip.hover title="Added New Course">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin-courses'
}
</script>
