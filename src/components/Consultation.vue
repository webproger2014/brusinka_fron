<template>
  <div>
    <form class="consultation-form" @submit.prevent="send">
      <div class="uk-grid" uk-grid>
        <div class="uk-width-1-1 uk-width-2-3@m">
          <div class="uk-grid-small" uk-grid>
            <div class="uk-width-1-1 cl-dark fs28@l fnt-bld">{{ title }}</div>
            <div class="uk-width-1-1@s uk-width-1-2@m uk-margin-auto-vertical">
              {{ subtitle }}
            </div>
            <div class="uk-width-1-1@s uk-width-1-2@m">
              <a class="cl-dark fs28@l fnt-semi" href="tel:+73452596041">7 (3452) 59-60-41</a>
            </div>
            <div class="uk-width-1-1@s uk-width-1-2@m">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon">
                  <i class="icon-user cl-vevanta"></i>
                </span>
                <input
                  class="uk-input"
                  type="text"
                  placeholder="Ваше имя"
                  v-model="inputs.name"
                />
              </div>
            </div>
            <div class="uk-width-1-1@s uk-width-1-2@m">
              <div class="uk-inline uk-width-1-1">
                <span class="uk-form-icon">
                  <i class="icon-smartphone cl-vevanta"></i>
                </span>
                <input
                  class="uk-input"
                  type="text"
                  placeholder="Ваш телефон"
                  v-model="inputs.phone"
                />
              </div>
            </div>
            <div class="uk-width-1-1@s uk-width-1-3@m">
              <div class="politica">
                Отправляя заявку, вы соглашаетесь на обработку
                <a :href="politika" target="_blank">персональных данных</a>
              </div>
            </div>

            <div class="uk-width-1-1@s uk-width-expand@m uk-grid uk-grid-small uk-flex-right uk-flex-middle">
             <div class="uk-grid uk-grid-collapse">
               <div class="uk-margin-small-right">
                 <a href="https://t.me/+79088771000">
                   <img src="https://cdn.vevanta.com/sk/4.png" alt="">
                 </a>
               </div>
               <div class="uk-margin-small-right">
                 <a href="https://wa.me/79088771000?text=Здравствуйте%2C+у+меня+есть+вопрос">
                   <img src="https://cdn.vevanta.com/sk/whatsapp.png" alt="">
                 </a>
               </div>
               <div class="">
                 <a href="viber://chat?number=79088771000">
                   <img src="https://cdn.vevanta.com/sk/viber.png" alt="">
                 </a>
               </div>
              </div>
              <div>
                <button class="btn btn__tpl1 btn__brown">
                  получить консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-width-1-3 uk-text-center uk-visible@m">
          <img
            class="uk-border-circle uk-margin-small-top"
            :src="avatar"
            alt=""
            uk-img
          />
          <div class="fnt-semi uk-margin-small-top">
            {{ name }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import form from "../mixins/Form.js";
import input from "../filters/Input.js";
import inputMask from "../mixins/inputMask";

export default {
  name: "consultation",
  mixins: [form, input, inputMask],
  props: {
    title: {
      type: String,
      default: "Перезвоним в течение 5-ти минут",
    },
    name: {
      type: String,
      default: "Дмитрий Антонов",
    },
    subtitle: {
      type: String,
      default: "Оставьте заявку или звоните нам по телефону:",
    },
    politika: {
      type: String,
      default: "/politika-konfidencialnosti/",
    },
    staffId: {
      type: Number,
    },
    managerId: {
      type: Number,
    },
    classId: {
      type: Number,
    },
    sourceId: {
      type: Number,
    },
    avatar: {
      type: String,
      default: '/img/spec.jpg'
    }
  },

  methods: {
    send() {
      this.formName = this.title;

      if (this.staffId !== undefined) {
        this.dataRequest.staffId = this.staffId;
      }

      if (this.managerId !== undefined) {
        this.dataRequest.managerId = this.managerId;
      }

      if (this.classId !== undefined) {
        this.dataRequest.classId = this.classId;
      }

      if (this.sourceId !== undefined) {
        lead.sourceId = this.sourceId;
      }

      this.sendForm();
    },
  },
};
</script>

<style lang="css" scoped>
.consultation-form {
  box-shadow: 0 0 42px rgba(0, 0, 0, 0.14);
  background-color: #fff;
  padding: 30px 34px;
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>
