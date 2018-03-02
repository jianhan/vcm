<template>
  <div @click="onClick">
    <div class="inline field">
      <label>Name: </label>
      <span>{{rowData.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'course-details-row',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  }
}
</script>
