<template>
  <b-card title="Card title" sub-title="Card subtitle">
    <p class="card-text">
      Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
    </p>
    <upsert-course-form></upsert-course-form>
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
      course: {},
      date: null,
      dateTimePickerFormat: {}
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
