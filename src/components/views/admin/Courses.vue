<template>
  <div>
    <b-nav>
      <b-nav-item :to="{ name: 'Courses' }">Courses</b-nav-item>
      <b-nav-item :to="{ name: 'UpsertCourse' }">Add</b-nav-item>
    </b-nav>
    <flash-message variant="success"></flash-message>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin-courses'
}
</script>
