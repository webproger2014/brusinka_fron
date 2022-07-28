<template>
  <div></div>
</template>

<script>
export default {
  name: 'ObjectHelper',
  props: {
    id: {
      type: Number,
      required: true,
    }
  },

  created() {
    this.addView()
  },

  methods: {
    addView() {
      this.$axios.post('objects/add_view', {
        id: this.id
      })
    }
  }
}
</script>
