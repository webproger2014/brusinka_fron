<template>
  <div>
    <div class="uk-text-center">
      <div class="fnt-med uk-margin-small-bottom">
        <span v-html="title"></span>
      </div>
      <div class="manager__avatar">
        <img
          :src="avatar"
          alt="Специалист по строительству"
          uk-img
          class="uk-border-circle"
        >
      </div>
      <div class="fnt-med uk-margin-small-top">{{ name }}</div>
      <div class="uk-flex-center uk-grid uk-grid-small uk-margin-small-top uk-margin-small-bottom">
        <span v-if="!statusPhone" class="fs20 fnt-med cl-dark-blue">{{ phone | phoneSecret }}</span>
        <a :href="`tel:=+7${phone}`" v-else class="fs20 fnt-med cl-dark-blue">{{ phone | phoneType }}</a>
        <div class="fr uk-width-auto@s uk-width-1-1 cr-pointer" @click="statusPhone = true" v-if="!statusPhone">
          <span uk-icon="icon:unlock"></span> Показать номер
        </div>
      </div>
      <form @submit.prevent="send">
        <div class="uk-width-1-1 modal-input uk-grid uk-grid-small uk-flex-center uk-margin-remove">
          <div class="uk-width-1-1 uk-margin-bottom uk-padding-remove">
            <div class="uk-position-relative">
              <span class="uk-form-icon">
                <i class="icon-smartphone cl-brown"></i>
              </span>
              <input class="uk-input" type="text" placeholder="Ваш номер:" v-model="inputs.phone">
            </div>
          </div>
          <div class="uk-width-auto uk-padding-remove">
            <button class="btn btn__tpl1 btn__brown uk-text-lowercase uk-width-1-1">жду звонка</button>
          </div>
        </div>
    <!--    <div class="uk-grid uk-grid-collapse uk-flex-center uk-margin-top social-msg">
          <div class="uk-margin-small-right">
            <a href="https://t.me/AntonovBro">
              <img src="https://cdn.vevanta.com/sk/4.png" alt="">
            </a>
          </div>
          <div class="uk-margin-small-right">
            <a href="https://wa.me/79323212510?text=Здравствуйте%2C+у+меня+есть+вопрос">
              <img src="https://cdn.vevanta.com/sk/whatsapp.png" alt="">
            </a>
          </div>
          <div class="">
            <a href="viber://chat?number=79323212510">
              <img src="https://cdn.vevanta.com/sk/viber.png" alt="">
            </a>
          </div>
        </div> -->
        <div class="politica">
        Отправляя заявку, вы соглашаетесь на обработку
        <a :href="politika" target="_blank">персональных данных</a></div>
      </form>
    </div>
  </div>

</template>

<script>
import form from '../mixins/Form.js'
import input from '../filters/Input.js'
import inputMask from "../mixins/inputMask.js";

export default {
  name: 'manager',
  mixins: [form, input, inputMask],
  props: {
    title: {
      type: String,
      default: 'Узнайте с чего начать строительство дома'
    },
    avatar: {
      type: String,
      default: '/img/spec.jpg'
    },
    name: {
      type: String,
      default: 'Владимир Олейников'
    },
    phone: {
      default: '3452596019'
    },
    politika: {
      type: String,
      default: '/politika-konfidencialnosti/'
    },
    form: {
      type: String,
      default: ''
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

<style scoped>
.manager__avatar img {
  max-width: 180px;
}

.social-msg img {
  max-width: 28px
}
</style>
