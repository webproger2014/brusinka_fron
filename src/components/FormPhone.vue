<template>
  <div>
      <form @submit.prevent="send" class="uk-flex uk-flex-wrap">
        <div class="uk-position-relative consultation-form__input uk-width-auto@m uk-width-1-1">
          <span class="uk-form-icon">
            <i class="icon-smartphone cl-vevanta"></i>
          </span>
          <input type="text" placeholder="Ваш телефон" class="uk-input uk-form-large" v-model="inputs.phone">
        </div>
        <button class="btn btn__tpl3 btn__large btn__brown uk-text-lowercase fnt-med uk-width-auto@m uk-width-1-1">{{ buttonName }}</button>
      </form>
      <div class="politica">
        Отправляя заявку, вы соглашаетесь на обработку
        <a :href="politika" target="_blank">персональных данных</a>
      </div>
    </div>
  </div>

</template>

<script>
import form from '../mixins/Form.js'
import input from '../filters/Input.js'

export default {
  name: 'manager',
  mixins: [form, input],
  props: {
    politika: {
      type: String,
      default: '/wp-content/themes/agentstvo/public/politika.pdf'
    },
    form:  {
      default: 'Форма',
      type: String,
    },
    buttonName:  {
      default: 'Отправить',
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
  data() {
    return {
      statusPhone: false,
    }
  },

  methods: {
    send() {
      this.formName =  this.form

      if (this.staffId !== undefined) {
        this.dataRequest.staffId = this.staffId
      }

      if (this.managerId !== undefined) {
        this.dataRequest.managerId = this.managerId
      }

      if (this.classId !== undefined) {
        this.dataRequest.classId = this.classId
      }

      if (this.sourceId !== undefined) {
        this.dataRequest.sourceId = this.sourceId
      }

      this.sendForm()
    },
  },

}
</script>

<style media="screen">
@media screen and (max-width: 960px) {
  button {
    margin-top: 15px;
  }
}
</style>
