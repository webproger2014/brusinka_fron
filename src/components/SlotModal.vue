<template lang="html">
  <div @click="openModal">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'ButtonModal',
  props: {
    formName:  {
      default: 'Модальное окно',
      type: String,
    },
    staffId: {
      type: Number
    },
    managerId: {
      type: Number
    },
    classId: {
      type: Number,
    },
    sourceId: {
      type: Number
    }
  },

  methods: {
    openModal() {

      let lead = {
        formName: this.formName,
      }

      if (this.staffId !== undefined) {
        lead.staffId = this.staffId
      }

      if (this.managerId !== undefined) {
        lead.managerId = this.managerId
      }

      if (this.classId !== undefined) {
        lead.classId = this.classId
      }

      if (this.sourceId !== undefined) {
        lead.sourceId = this.sourceId
      }

      this.$root.$refs.modalDefault.openModal(lead)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
