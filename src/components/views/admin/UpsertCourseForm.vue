<template>
  <b-form @submit.prevent="onSubmit">
    <b-row>
      <b-col>
        <b-form-group label="Name<code>*</code>" label-for="name" description="Enter the name of the course.">
          <b-form-input type="text" v-model="course.name" required placeholder="Enter email"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Slug" label-for="slug" description="URL will displayed on frontend.">
          <b-form-input type="text" v-model="course.slug" disabled></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Visible<code>*</code>">
          <b-form-checkbox v-model="course.visible"
                           value="1"
                           unchecked-value="not_accepted">
            Set Course Visible
          </b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Start Date Time<code>*</code>" label-for="Start Date Time"
                      description="Start date time of the course.">
          <datetime type="datetime"
                    :format="dateTimePickerFormat"
                    input-class="form-control"
                    v-model="course.start"></datetime>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="End Date Time<code>*</code>" label-for="End Date Time"
                      description="End date time of the course.">
          <datetime type="datetime"
                    :format="dateTimePickerFormat"
                    input-class="form-control"
                    v-model="course.end"></datetime>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Description<code>*</code>" label-for="description"
                  description="Description of course will displayed at frontend.">
      <vue-editor v-model="course.description"></vue-editor>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="defaul">Cancel</b-button>
  </b-form>
</template>

<script>
import {http} from '@/auth/http'
import {VueEditor} from 'vue2-editor'
import {dateTimePickerFormat} from '@/constants'

export default {
  name: 'upsert-course-form',
  components: {
    VueEditor
  },
  data () {
    return {
      course: {},
      date: null,
      dateTimePickerFormat: {}
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (!this.$_.isUndefined(id)) {
      http().get('api/courses/' + id)
        .then(r => {

        })
        .catch(e => {

        })
    }
    this.dateTimePickerFormat = dateTimePickerFormat
  }
}
</script>
