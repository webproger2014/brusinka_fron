<template>
  <div class="uk-grid uk-grid-small">
    <div class="uk-padding-small uk-width-3-4@m">
      <div class="fnt-med fs20 fs32@m uk-text-center">
        {{ title }}
      </div>
      <hr/>
      <div>
        <transition-group
        name="fade-custom" mode="out-in"
        >
        <div v-for="(item, index) in questions" :key="index" v-if="panel === index">
          <div
            class="uk-position-relative uk-visible-toggle uk-divght"
            tabindex="-1" :uk-slider="sliderEnable ? 'clsActivated: uk-transition-active; center: false' : false"
            ref="slider"
            >
            <item-radio
                v-if="item.type === 'radio'" :item="item" :sliderEnable="sliderEnable"
                :index="index"
                v-on:next-slide="nextInput"
              ></item-radio>
            <item-checkbox v-else-if="item.type === 'checkbox'" :item="item"></item-checkbox>
            <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin" v-show="sliderEnable"></ul>
          </div>
        </div>
        <div v-show="panel === 'contact'" :key="questions.length">
          <form class="uk-grid-small uk-grid" @submit.prevent="send">
            <div class="uk-width-1-1 uk-text-center fs20@m uk-margin-top uk-margin-bottom fnt-bld">
              Отлично! Укажите Ваше имя и номер телефона для уточнения некоторых моментов
            </div>

            <div class="uk-width-1-1 uk-text-center">
              <div class="uk-width-1-1 uk-width-1-2@m uk-margin-bottom uk-margin-auto">
                <div class="uk-width-1-1 uk-position-relative">
                  <span class="uk-form-icon">
                    <i class="icon-user"></i>
                  </span>
                  <input
                    v-model="inputs.name"
                    class="uk-input uk-form-large"
                    type="text"
                    placeholder="Ваше имя"
                  />
                </div>
              </div>
              <div class="uk-width-1-1 uk-width-1-2@m uk-margin-bottom uk-margin-auto">
                <div class="uk-width-1-1 uk-position-relative">
                  <span class="uk-form-icon">
                    <i class="icon-smartphone"></i>
                  </span>
                  <input
                    v-model="inputs.phone"
                    class="uk-input uk-form-large"
                    type="text"
                    placeholder="Ваш номер телефона"
                  />
                </div>
              </div>

              <div class="uk-width-1-1 uk-width-1-2@m uk-margin-bottom uk-margin-auto">
                <div class="uk-text-right uk-width-1-1 uk-margin-auto">
                  <button class="btn btn__tpl1 btn__green fr uk-width-1-1 uk-text-lowercase"> Заказать звонок </button>
                </div>
                <div class="politica">
                  Отправляя заявку, вы соглашаетесь на обработку<br/>
                  <a href="/wp-content/themes/agentstvo/pubdivc/podivtika.pdf" target="_blank">
                    персональных данных
                  </a>
                </div>
              </div>
            </div>

          </form>
        </div>
      </transition-group>
      </div>

      <div class="uk-margin-top uk-flex uk-flex-between">
        <div v-if="panel !== 0">
          <div class="cr-pointer"  @click="back">
            <i class="uk-margin-small-right icon-arrow-medium-left cl-vevanta"></i> Назад
          </div>
        </div>
        <div v-show="panel !== 'contact'">
          Шаг: {{ panel + 1 }} / {{ questions.length }}
        </div>
        <div class="cr-pointer show-animation uk-flex-right">
          <div class="cr-pointer" @click="next" v-show="panel !== 'contact'">
            <div class="btn btn__tpl1 btn__green" :class="{'disabled': _checkAccesNext()}">
              Далее <i class="uk-margin-small-left icon-arrow-medium-right cl-wh"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-width-expand@m">
      <div class="uk-padding-small uk-background-muted">
        <manager-item
          avatar="/img/spec.jpg"
          name="Владимир Олейников"
          title="Предоставим расчет <br/>в течение 48 часов!"
          phone="3452596019"
          form="Заявка на объект c формы специалиста, Владимир Олейников"
          :source-id="52"
        ></manager-item>
      </div>

    </div>
  </div>
</template>

<script>
import Form from "@/mixins/Form";
import inputMask from "@/mixins/inputMask";
import ItemRadio from "./ItemRadio"
import ItemCheckbox from "./ItemCheckbox"

import ManagerItem from "@/components/ManagerItem"


export default {
  mixins: [inputMask, Form],
  components: {
    ItemRadio,
    ItemCheckbox,
    ManagerItem
  },
  props: {
    title: {
      default: 'Рассчитайте стоимость вашего дома',
    },
    podivtika: {
      type: String,
      default: "/wp-content/themes/agentstvo/pubdivc/podivtika.pdf",
    },
  },
  data() {
    return {
      sliderEnable: false,
      panel: 0,
      nextDisable: false,
      backDisable: true,
      stateForm: 0,
      questions: [
        {
          title: 'Сколько будет этажей?',
          type: 'radio',
          model: '',
          items: [
            {name: 'Одноэтажный дом', img: '/img/item1.jpg'},
            {name: 'Дом с мансардой', img:'/img/item2.jpg'},
            {name: 'Двухэтажный дом', img: '/img/item3.jpg'},
            {name: 'Дом с цокольным этажом', img: '/img/cokol.jpg'},
          ]
        },
        {
          title: 'Какая квадратура дома',
          model: 0,
          type: 'radio',
          items: [
            {name: 'до 100 кв.м'},
            {name: 'от 100 кв.м до 150 кв.м'},
            {name: 'от 150 кв.м до 250 кв.м'},
            {name: 'от 250 кв.м до 500 кв.м'},
            {name: 'от 500 кв.м'},
          ]
        },
        {
          title: 'У вас есть земельный участок?',
          type: 'radio',
          model: 0,
          items: [
            {name: 'Да'},
            {name: 'Нет'},
            {name: 'На стадии оформления'},
            {name: 'Нужна помощь'},
          ]
        },
        {
          title: 'Когда планируете строиться',
          type: 'radio',
          model: 0,
          items: [
            {name: 'В этом сезоне'},
            {name: 'В течении года'},
            {name: 'Через год и более'},
          ]
        },
        {
          title: 'Какой материал несущих стен',
          type: 'radio',
          model: 0,
          items: [
            {name: 'Кирпич', img: '/img/item4.jpg'},
            {name: 'Керамзитоблок', img: '/img/item5.jpg'},
            {name: 'Керамический блок', img:'/img/item6.jpg'},
            {name: 'Газобетон', img:'/img/item7.jpg'},
          ]
        },
        {
          title: 'Куда отправить расчёт?',
          type: 'radio',
          model: 0,
          items: [
            {name: 'Viber', img: '/img/viber.jpg'},
            {name: 'Whatsapp', img: '/img/whatsapp.jpg'},
            {name: 'Смс', img:'/img/sms.jpg'},
            {name: 'Звонок', img:'/img/call.jpg'},
          ]
        },
      ],
    };
  },

  created() {
    this.formName = 'Строительный калькулятор'
  },

  mounted() {
    this.sliderToggle();
    window.addEventListener('resize', () => {
      this.sliderToggle()
    })
  },

  methods: {
    sliderToggle() {
      if (window.innerWidth <= 640) {
        this.sliderEnable = true
      } else {
        this.sliderEnable = false
        let sliderWrapper = document.getElementById('sliderWrapper')
        sliderWrapper.style.transform = 'unset'
      }
    },

    send() {
      this.inputs.phone = this.formatPhone;
      if (!this.inputs.phone || this.inputs.phone.length < 10) {
        alert("Номер телефона обязателен!");
        return;
      }

      this.questions.forEach(item => {
        if (Array.isArray(item)) {
          item.model.forEach(req => {
            this.msg += `${req} <br/>`
          })
        } else {
          this.msg += `${item.model} <br/>`
        }
      })

      this.leadTarget = 'send-quiz'

      this.sendForm();
    },

    back() {
      if (this.panel === 'contact') {
        this.panel = this.questions.length - 1
      } else if (this.panel) {
        this.panel--
      }
    },

    _checkAccesNext() {
      let rs = false


      if (this.questions[this.panel]) {
        if (Array.isArray(this.questions[this.panel].model)) {
          if (!this.questions[this.panel].model.length) {
            rs = true
          }
        } else if (!this.questions[this.panel].model) {
          rs = true
        }
      }

      return rs
    },

    nextInput() {
      if (this.panel < (this.questions.length - 1)) {
        this.panel++
      } else {
        this.panel = 'contact'
        this.nextDisable = true
      }
    },
    next() {
      if (!this._checkAccesNext()) {
        if (this.panel < (this.questions.length - 1)) {
          this.panel++
        } else {
          this.panel = 'contact'
          this.nextDisable = true
        }
      }
    }
  }
};
</script>

<style>
.disabled {
  cursor: not-allowed;
}

.btn_primary {
  background-color: #009688;
  color: #fff;
}
.check-box input {
  position: absolute;
  opacity: 0;
}
.check-box label {
  position: relative;
  width: 100%;
  box-shadow: 0 0 24px #3a3a3a1a;
  border-radius: 10px;
  padding: 10px;
  font-family: Gilroy-SemiBold;
  cursor: pointer;
  transition: 0.4s;
}
.check-box input + label:hover {
  -webkit-box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
}
.check-box input:checked + label {
  border: 1px #00bab6 solid;
}

.check-box input:checked + label .radio_circle {
  border-color: #6dc9c7;
}

.check-box input:checked + label .radio_circle::after {
  content: "";
  display: block;
  margin: auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #5cbdb9;
}
.block-tab {
  position: relative;
}
.divne-grey {
  height: 2px;
  width: 100%;
  position: absolute;
  top: 26px;
  background-color: #f3f2ee;
}
.point {
  padding: 6px 10px;
  border-radius: 6px;
}
.point > .circle {
  border-radius: 50%;
  border: 2px #009688 solid;
  width: 40px;
  height: 40px;
  margin: 4px auto;
  padding: 8px;
  display: block;
  background-color: #fff;
}
.uk-subnav-pill > .uk-active > a {
  background: transparent;
  position: relative;
  color: #333 !important;
}
.uk-subnav-pill > .uk-active > a:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 36px;
  height: 12px;
  background-color: #5cbdb9;
}

.uk-subnav {
  position: relative;
}

.txt-none {
  text-transform: none;
}
.fade-custom-enter-active {
  transition: opacity 0.4s;
}
.fade-custom-enter {
  opacity: 0;
}

.label_pl {
  padding-left: 30px;
}

.radio_circle {
  display: flex;
  position: absolute;
  left: 10px;
  top: 20px;
  width: 18px;
  height: 18px;
  border: 2px solid #333;
  border-radius: 50%;
}

.radio_circle__right {
  right: 20px;
  left: auto;
}

</style>
