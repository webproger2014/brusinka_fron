<template>
  <div class="uk-box-shadow-medium uk-margin-top uk-margin-bottom">
    <form class="uk-padding uk-grid" @submit.prevent="send">
      <div class="form__img uk-width-auto">
        <img :data-src="img" alt="" uk-img>
      </div>
      <div class="uk-width-expand@l">
        <div class="uk-inline uk-text-center">
          <div class="fs20 fs28@m fnt-bld">{{ title }}</div>
          <div class="fs16 fs20@m fnt-med">{{ subtitle }}</div>
          <div class="uk-grid uk-grid-small uk-flex-center uk-margin-medium-top uk-child-width-1-2@l">
            <div class="uk-margin-small-bottom">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon">
                  <i class="icon-user">
                  </i>
                </span>
                <input class="uk-input uk-form-large" type="text" placeholder="Ваше имя" v-model="inputs.name">
              </div>
            </div>
            <div class="uk-margin-small-bottom">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon">
                  <i class="icon-smartphone">
                  </i>
                </span>
                <input class="uk-input uk-form-large" type="text" placeholder="Ваш телефон" v-model="inputs.phone">
              </div>
            </div>
            <div class="uk-margin-small-bottom uk-width-1-1">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon">
                  <i class="icon-comment">
                  </i>
                </span>
                <input class="uk-input uk-form-large" type="text" placeholder="Комментарий" v-model="inputs.comment">
              </div>
            </div>
          </div>

          <div class="politica uk-text-left">
            Отправляя заявку, вы соглашаетесь на обработку
            <a :href="politika" target="_blank">персональных данных</a>
          </div>

          <div class="uk-margin-small-top">
            <button type="submit" class="btn btn__tpl3 btn__large btn__green uk-text-lowercase fnt-med uk-width-auto@m uk-width-1-1">
               {{ buttonName }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import form from '../mixins/Form.js'
import input from '../filters/Input.js'

  export default {
    name: 'form2',
    mixins: [form, input],
    props: {
      title: {
        type: String,
        default: 'Записаться на просмотр'
      },
      subtitle: {
        type: String,
        default: 'Проведем для вас бесплатную экскурсию',
      },
      politika: {
        type: String,
        default: '/wp-content/themes/agentstvo/public/politika.pdf'
      },
      img: {
        default: 'https://vevanta.ru/wp-content/themes/agentstvo/assets/images/lp/auto.png',
        type: String
      },
      form:  {
        default: 'Записаться на просмотр',
        type: String,
      },
      buttonName:  {
        default: 'Записаться на просмотр',
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

<style lang="css" scoped>
  .form__img {
    padding: 0;
  }
</style>
