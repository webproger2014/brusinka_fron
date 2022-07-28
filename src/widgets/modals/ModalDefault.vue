<template>
  <div id="modal-default" uk-modal ref="modalDefault" class="uk-flex-top">
    <div class="uk-modal-dialog modalDef uk-margin-auto-vertical uk-modal-body uk-padding-remove uk-width-5-6 uk-width-1-3@s uk-width-1-5@l">
      <button class="uk-modal-close-outside" type="button" uk-close></button>
      <img :src="settings.img ? settings.img : ''" alt="">
      <div class="uk-padding-small uk-text-center">
        <div class="fs12 fs16@s uk-text-uppercase fnt-bld">{{settings.title ? settings.title : title }}</div>
        <div class="uk-margin-small-top fs12 fs16@s">{{settings.caption ? settings.caption : caption }}</div>
        <form @submit.prevent="sendForm">
          <div class="uk-grid">
            <div class="uk-width-1-1 modal-input uk-margin-top">
              <div class="uk-position-relative">
                <i class="icon-user uk-form-icon"></i>
                <input class="uk-input" type="text" placeholder="Ваше имя:" v-model="inputs.name">
              </div>
            </div>
            <div class="uk-width-1-1 modal-input uk-margin-small-top">
              <div class="uk-position-relative">
                <i class="icon-smartphone uk-form-icon"></i>
                <input class="uk-input" type="text" placeholder="Ваш телефон:" v-model="inputs.phone">
              </div>
            </div>
          </div>
          <div class="politica">
            Отправляя заявку, вы соглашаетесь на обработку
            <a :href="politika" target="_blank">персональных данных</a>
          </div>
          <p class="uk-text-center uk-margin-remove">
            <button class="btn btn__tpl1 btn__brown fr uk-text-lowercase">{{settings.modalButton ? settings.modalButton : 'отправить' }}</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/mixins/Form.js'

export default {
  name: 'modal',
  mixins: [Form ],
  props: {
    politika: {
      type: String,
      default: '/politika-konfidencialnosti/'
    },
  },
  data(){
    return{
      settings: {},
      title: 'Заказать звонок',
      caption: 'Мы свяжемся с Вами в течении 3-ех минут',
    }
  },
  methods: {
    openModal(lead = {}, settings, msg = '') {
      this.settings = settings

      if (lead.classId) {
        this.classId = lead.classId
      }

      if (lead.formName) {
        this.formName = lead.formName
      }

      if (lead.staffId !== undefined) {
        this.dataRequest.staffId = lead.staffId
      }

      if (lead.managerId !== undefined) {
        this.dataRequest.managerId = lead.managerId
      }

      if (lead.classId !== undefined) {
        this.dataRequest.classId = lead.classId
      }

      if (lead.sourceId !== undefined) {
        this.dataRequest.sourceId = lead.sourceId
      }

      if (lead.leadTarget) {
        this.leadTarget = lead.leadTarget
      }

      if (msg) {
        this.msg = msg
      }
      UIkit.modal(this.$refs.modalDefault).show();
    }
  }
}
</script>
<style scoped>
 .modalDef {
   max-width: 400px!important;
 }
</style>
