<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group label="Name" label-for="name" description="Enter the name of the course">
      <b-form-input type="text" v-model="course.name" required placeholder="Enter email">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Slug" label-for="slug" description="URL will displayed on frontend">
      <b-form-input type="text" v-model="course.slug" disabled>
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="defaul">Cancel</b-button>
  </b-form>
</template>

<script>
import _ from 'lodash'
import {http} from '@/auth/http'

export default {
  name: 'upsert-course',
  data () {
    return {
      course: {}
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (!_.isUndefined(id)) {
      http().get('api/courses/' + id)
        .then(r => {

        })
        .catch(e => {

        })
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>
