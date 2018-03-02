<template>
  <div @click="onClick">
    <div class="inline field">
      <span v-html="rowData.description"/>
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
    }
  }
}
</script>
