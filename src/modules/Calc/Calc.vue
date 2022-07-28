<template>
  <div>
    <div class="fnt-bld cl-black fs32@m fs26@s fs20" v-html="title"></div>

    <div class="questions__wrapper uk-padding uk-margin-top">
      <div class="uk-grid uk-grid small uk-flex-between">
        <div class="cldark fnt-med" v-html="subtitle">af</div>
        <div class="fs18@m cldark fnt-bld uk-margin-top">
            <i class="icon-phone cl-vevanta"></i>  +7 (3452) 59-60-19
          <div class="line uk-width-1-1"></div>
        </div>

      </div>

      <div class="uk-margin-medium-top questions__items" ref="questionItems">
        <template v-for="(item, index) in questions.items">
        <div class="question__data"  :class="{'question__active': slide === index}">
          <div class="fnt-bld fs26@m fs18">
            <span class="cl-vevanta" v-if="index < (questions.items.length - 2)">{{ index + 1 }}. </span>
            <span class="cldark">{{ item.title }}</span>
          </div>

          <div class="uk-margin-medium-top" >
            <questions-radio v-if="item.type === 'radio'" :item="item" @next="next" :index="index"></questions-radio>
            <questions-checkbox v-else-if="item.type === 'check'" :item="item" :index="index"></questions-checkbox>
            <questions-end v-else-if="item.type === 'end'" @send="send" v-model="phone"></questions-end>
          </div>
        </div>
      </template>




        <div class="questions__footer uk-margin-large-top uk-margin-bottom uk-grid uk-grid-small">
          <div class="pagination uk-flex uk-width-expand@s">
              <div
                class="uk-position-relative uk-visible-toggle uk-light"
                tabindex="-1"
                uk-slider="finite: true"
                ref="sliderPagination"
              >
                <ul class="uk-slider-items">
                  <li v-for="(item, index) in questions.items" :key="index">
                    <div class="pagination__item uk-flex uk-flex-middle" :class="{active: index <= slide}">
                      <div class="pagination__line"></div>

                      <div class="cl-grey fs34 pagination__number fnt-bld" v-if="index < (questions.items.length - 2)">{{ index + 1 }}</div>
                      <div class="cl-grey fs34 pagination__number fnt-bld" v-else-if="index === (questions.items.length - 2)">
                        <i class="icon-calc-line"></i>
                      </div>
                      <div class="cl-grey fs34 pagination__number fnt-bld" v-else-if="index === (questions.items.length - 1)">
                        <i class="icon-smile-line"></i>
                      </div>

                    </div>
                  </li>
                </ul>
              </div>

          </div>
          <div>
            <div class="btn btn__tpl1 btn__grey fr uk-margin-right" :class="{'disabled': !slide}" @click="back">
              <i class="icon-arrow-medium-left fs12"></i>
            </div>
            <div class="btn btn__tpl1 btn__green fr" :class="{'disabled': !questions.items[slide].model}" @click="nextButton">
              Далее <i class="uk-margin-left icon-arrow-medium-right fs12"></i>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
import UIkit from 'uikit'
import QuestionsRadio from './views-calc/QuestionsRadio'
import QuestionsCheckbox from './views-calc/QuestionsCheckbox'
import QuestionsEnd from './views-calc/QuestionsEnd'
import form from '@/mixins/Form.js'
import input from '@/filters/Input.js'

  export default {
    components: {QuestionsRadio, QuestionsCheckbox, QuestionsEnd},
    mixins: [form, input],
    props: {
      title: {
        default: 'Рассчитать стоимость дома  <span class="cl-vevanta">прямо сейчас!</span>'
      },
      subtitle: {
        default: 'Ответьте на вопросы и получите рассчет стоимости <br/> Вашего дома! Или обратитесь к менеджеру'
      },
      questions: {
        default() {
          return {
            formName: 'Рассчитать стомость дома',
            items: [

              {
                title: 'Сколько планируется этажей?',
                type: 'radio',
                model: '',
                col: '4',
                colAuto: '2',
                size: 'small',
                questions: [
                  {title: 'Одноэтажный',  img: '/img/calc/icon-1.svg'},
                  {title: 'С мансардой',  img: '/img/calc/icon-2.svg'},
                  {title: 'Двухэтажный',  img: '/img/calc/icon-3.svg'},
                  {title: 'С цокольным этажом',  img: '/img/calc/icon-4.svg'},
                ]
              },
              {
                title: 'Какой планируется фундамент?',
                type: 'radio',
                model: '',
                col: '2',
                size: 'big',
                colAuto: '1',
                questions: [
                  {title: 'Ленточный фундамент на буронабивных сваях',  img: '/img/calc/svai2.jpg'},
                  {title: 'Монолитная подушка',  img: '/img/calc/plita2.jpg'},
                ]
              },

              {
                title: 'Какое будет перекрытие фундамента?',
                type: 'radio',
                model: '',
                col: '3',
                size: 'medium',
                colAuto: '1',
                questions: [
                  {title: 'Плиты',  img: '/img/calc/pliti.png'},
                  {title: 'Деревянные блоки',  img: '/img/calc/derevi.png'},
                  {title: 'Монолитное перекрытие',  img: '/img/calc/monolit.png'},
                ]
              },

              {
                title: 'Какой планируется фасад?',
                type: 'radio',
                model: '',
                col: '4',
                colAuto: '2',
                size: 'auto',
                questions: [
                  {title: 'Облицовочный кирпич',  img: '/img/calc/fasad1.png'},
                  {title: 'Окрашенный',  img: '/img/calc/fasad2.png'},
                  {title: 'Сайдинг',  img: '/img/calc/fasad3.png'},
                  {title: 'Брус (без облицовки)',  img: '/img/calc/fasad4.png'},
                ]
              },

              {
                title: 'Какой будет материал стен?',
                type: 'radio',
                col: '3',
                size: 'auto',
                colAuto: '1',
                questions: [
                  {title: 'Кирпич',  img: '/img/calc/material1.png'},
                  {title: 'Керамзитоблок',  img: '/img/calc/material2.png'},
                  {title: 'Газобетон',  img: '/img/calc/material3.png'},
                  {title: 'Керамический блок',  img: '/img/calc/material4.png'},
                  {title: 'Оцилиндрованное бревно',  img: '/img/calc/material5.png'},
                  {title: 'Брус',  img: '/img/calc/material6.png'},
                ]
              },
              {
                title: 'Дополнительно',
                model: [],
                type: 'check',
                col: '4',
                colAuto: '1',
                questions: [
                  {title: 'Входная дверь'},
                  {title: 'Отмостка'},
                  {title: 'Чистова отделка'},
                  {title: 'Входная группа'},
                  {title: 'Забор'},
                  {title: 'Сист.отопления'},
                  {title: 'Умный дом'},
                  {title: 'Благоуйстройство территории'},
                ]
              },

          /*    {
                title: 'Дополнительно',
                model: [],
                type: 'check',
                col: '2',
                colAuto: '1',
                questions: [
                  {title: 'Электрика: установка и монтаж электрофурнитуры с устройством вводного щита и счетчиками (медный кабель ВВГ в гофре)'},
                  {title: 'Канализация: монтаж септика 10 м.3 , утепленная 110 труба с греющим кабелем, с установкой и выводами стояков по дому'},
                  {title: 'Черновая отделка: штукатурка стен цементно-песочным раствором под маяк, стяжка пола из крупнозернистого песка, цемент М400, затирка швов между плитами перекрытия'},
                  {title: 'Водоснабжение: скважина, обустроенная и готова к эксплуатации'},
                ]
              }, */

              {
                title: 'Куда отправить расчет?',
                type: 'radio',
                model: '',
                col: '4',
                size: 'small',
                colAuto: '2',
                questions: [
                  {title: 'Viber',  img: '/img/calc/Viber.png'},
                  {title: 'Whatsapp',  img: '/img/calc/Whatsapp.png'},
                  {title: 'SMS',  img: '/img/calc/Sms.png'},
                  {title: 'Звонок',  img: '/img/calc/Call.png'},
                ]
              },

              {
                type: 'end',
              },

            ]
          }
        }
      }
    },

    data() {
      return {
        slide: 0,
        phone: ''
      }
    },


    methods: {
      send() {
        this.inputs.phone = this.phone
        this.formName = this.questions.formName
        let items = this.questions.items
        items.forEach((item, i) => {
          if (item.type !== 'end') {
            this.msg += `<b>${item.title}</b><br/>`
            if (Array.isArray(item.model)) {
              item.model.forEach(m => {
                this.msg += `${item.questions[m].title} <br/>`
              })
            } else {
              this.msg += `${item.questions[item.model].title} <br/>`
            }

            this.msg += `<br/>`
          }
        })

        this.leadTarget = 'send-quiz'
        this.sendForm()
      },

      nextButton() {
        if (this.questions.items[this.slide]) {
          this.next();

        }
      },

      back() {
        if (this.slide) {
          setTimeout(() => {
            UIkit.slider(this.$refs.sliderPagination).show(--this.slide);
            this._startScrollTopQuestions()
          }, 300)
        }
      },

      next() {
        if (this.slide < this.questions.items.length) {
          setTimeout(() => {
           UIkit.slider(this.$refs.sliderPagination).show(++this.slide);
           this._startScrollTopQuestions()
          }, 300)
        }
      },

      _startScrollTopQuestions() {
        if (window.innerWidth < 960) {
          window.scrollTo({
            top: this.$refs.questionItems.offsetTop - 52
          })
        }

      }
    }

  }
</script>

<style>
  .block__small {
    width: 156px;
    height: 144px;
  }

  @media screen and (max-width: 960px) {
    .block__small {
      width: 90px;
      height: 90px;
    }

    .block__small img {
      max-width: 50px;
    }

    .block__big {
      height: auto !important;
      margin-bottom: 10px;
    }
  }
  .block__big {
    height: 200px;
  }

  .block__medium {
    height: 164px;
  }

  label {
    cursor: pointer;
    transition: 0.4s;
  }

  .line {
    height: 5px;
    background-color: #00BAB6;
  }
  .question__item_bg {
    width: 156px;
    height: 144px;
    text-align: center;
    position: relative;
  }

  .question__item_bg img {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    margin: auto;
  }
  .cldark {
    color: #102841;
  }

  .clgrey {
    color: #C2C2C2;
  }

  input:checked + label .brd2 {
    border-color: #00bab6;
  }

  input:checked + label .question__title {
    color: #00bab6;
  }

  input:checked + label .radio-check {
    background:  #00bab6;
  }

  .brd2 {
    border: 2px solid #EDEDED;
    border-radius: 10px;
  }
  .questions__wrapper {
    border: 1px solid #dcd;
    border-radius: 3px;
  }


  .pagination {
    pointer-events:none;
  }

  .pagination__item .pagination__line {
    background: #EDEDED;
  }

  .pagination__line {
    position: relative;
    height: 3px;
    width: 100px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .pagination .dot {
    border-radius: 50%;
    display: flex;
  }

  .pagination .active .dot {
    height: 24px;
    width: 24px;
    background: #FFF;
    box-shadow: 0 0 12px 6px #ededed;
    display: flex;
  }

  .active .pagination__number {
    color: #00bab6;
  }
  .pagination .active .dot::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    background: #00bab6;
    border-radius: 50%;
    margin: auto;
    background: #00bab6;
  }
  .pagination > div:not(.active) .dot {
    width: 16px;
    height: 16px;
    box-shadow: inset 0 3px 3px #d1d1d1;
    border-radius: 50%;
  }


  .pagination .pagination__line::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: #00bab6;
        transition: 0.2s;
  }

  .active .pagination__line::after {
    width: 100%;
  }

  .questions__items {
    overflow: hidden;
  }

  .question__data:not(.question__active) {
    position: absolute;
    left: -100%;
    top: 0;
    transform: translateX(-100%);
  }
  .question__active {
    transition: 0.6s;
    transform: translateX(0);
  }

  .radio-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #EDEDED;
  }

  .check__item {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination__number {
    color: #e4e4e4;
  }
</style>
