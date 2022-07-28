<template>
  <div :class="parentClasses">
    <div :class="nameClasses" @click="openModal">
      {{ name }}
    </div>
  </div>
</template>
<script>
import { ANALITICA } from '@/web/config'

export default {
  name: 'ButtonModal',
  props: {
    settingsModal: {
      default: () => {
        return {
          title: '',
          caption: '',
          img: '',
          modalButton: '',
        }
      }
    },
    targetBtn: {
      type: String,
      default: 'zakaz-zvonka'
    },
    targetForm: {
      type: String,
      default: ''
    },
    nameClasses: {
      type: String,
      default: 'btn btn__tpl1 btn__brown fr uk-text-lowercase'
    },
    parentClasses: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Заказать звонок'
    },
    formName:  {
      type: String,
      default: 'Заказать звонок'
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

      if (typeof ym === 'function') {
        ym(ANALITICA.yaId,'reachGoal', this.targetBtn)
      }

      if (this.targetForm) {
        lead.leadTarget = this.targetForm
      }


      this.$root.$refs.modalDefault.openModal(lead, this.settingsModal)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
