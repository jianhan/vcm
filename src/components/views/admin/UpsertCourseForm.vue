<template>
  <b-form @submit.prevent="upsertCourse">
    <template v-if="loading">
      <b-row>
        <b-col></b-col>
        <b-col>
          <radar-spinner
            :animation-duration="2000"
            :size="60"
            color="#ff1d5e"
          />
        </b-col>
        <b-col></b-col>
      </b-row>
    </template>
    <template v-else>
      <b-row v-if="hasAlert">
        <b-col>
          <b-alert :variant="alert.variant"
                   dismissible
                   :show="hasAlert"
                   @dismissed="dismissAlert">
            {{ alert.message }}
            <validation-errors :validationErrors="vErrors"></validation-errors>
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Name<code>*</code>" label-for="name" description="Enter the name of the course.">
            <b-form-input type="text" v-model="course.name" required placeholder="Enter name of course"></b-form-input>
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
          <b-form-group label="Visible">
            <input type="checkbox" aria-label="Checkbox for following text input" v-model="course.visible" value="1">
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
      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" :to="{name: 'ListCourses'}">Cancel</b-button>
    </template>
  </b-form>
</template>

<script>
import {http, errorMsg} from '@/auth/http'
import {VueEditor} from 'vue2-editor'
import alertMixin from '@/mixins/alert'
import validationErrorsMixin from '@/mixins/validation-errors'
import validationErrors from '@/components/validation-errors'
import slugify from 'slugify'
import {DateTime} from 'luxon'
import {RadarSpinner} from 'epic-spinners'

export default {
  name: 'upsert-course-form',
  mixins: [alertMixin, validationErrorsMixin],
  components: {
    VueEditor,
    validationErrors,
    RadarSpinner
  },
  props: {
    'title': String
  },
  data () {
    return {
      course: {
        visible: 1
      },
      dateTimePickerFormat: {},
      loading: false
    }
  },
  watch: {
    'course.name' (newVal) {
      this.course.slug = slugify(newVal, {
        replacement: '-',
        lower: true
      })
    }
  },
  mounted () {
    if (!this.$_.isUndefined(this.$route.params.id)) {
      this.loading = true
      http().get('/courses/' + this.$route.params.id)
        .then(r => {
          this.course = r.data.data
          this.$emit('update:title', 'Edit Course')
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    }
    this.dateTimePickerFormat = DateTime.DATETIME_MED
  },
  methods: {
    upsertCourse () {
      this.loading = true
      this.dismissAlert()
      let httpRsp = null
      if (this.$_.isUndefined(this.course.id)) {
        httpRsp = http().post('courses', {
          ...this.course
        })
      } else {
        httpRsp = http().put('courses/' + this.course.id, {
          ...this.course
        })
      }
      httpRsp.then(r => {
        this.loading = false
        this.flash({message: 'Course has been updated', variant: 'success'})
        this.$router.push({name: 'ListCourses'})
      }).catch(e => {
        this.loading = false
        if (e.response.data.status_code !== 422) {
          this.setAlert(errorMsg(e, true), 'danger')
        } else {
          this.setAlert('Validation errors, please check your input', 'danger')
          this.setVErrors(e.response.data.errors)
        }
      })
    }
  }
}
</script>
