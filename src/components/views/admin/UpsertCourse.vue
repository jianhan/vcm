<template>
  <b-card :title="title">
      <upsert-course-form :title.sync="title"></upsert-course-form>
    </b-card>
</template>

<script>
import UpsertCourseForm from './UpsertCourseForm'

export default {
  name: 'upsert-course',
  components: {
    UpsertCourseForm
  },
  data () {
    return {
      title: 'Create Course'
    }
  }
}
</script>
