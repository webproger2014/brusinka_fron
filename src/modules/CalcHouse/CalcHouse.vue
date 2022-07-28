<template>
  <div class="calc-house">
    <div class="title">
      {{ title }}
    </div>

    <div class="questions__container"ref="questionsC">

      <div class="questions">
        <div class="questions__item label_wrapper uk-display-inline-block uk-width-1-1 uk-margin-small-top" v-for="(item, indexItem) in items" :key="indexItem">
          <div class="">
            <div class="fnt-bld fs20@l uk-margin-bottom"> {{ item.title }} </div>
            <div v-if="item.type === 'radio'">
              <div class="label label__item uk-margin-bottom" v-for="(question, indexQuestion) in item.questions" :key="indexQuestion" >
                <label>
                  <input type="radio" :name="`radio-${indexItem}`" class="uk-radio" :value="indexQuestion" v-model="item.checked">
                  {{ question }}
                </label>
              </div>
            </div>
            <div v-else-if="item.type === 'checkbox'">
              <div class="label label__item uk-margin-small-bottom" v-for="(question, indexQuestion) in item.questions" :key="indexQuestion" >
                <label>
                  <input type="checkbox" :name="`checkbox-${indexItem}`" class="uk-checkbox" :value="indexQuestion" v-model="item.checked">
                  {{ question }}
                </label>
              </div>
            </div>
          </div>
          <div v-if="item.subtitle" class="cl-v fs14">
            <hr class="uk-divider-icon uk-margin-small-bottom">
            <em>{{ item.subtitle }}</em>
          </div>
        </div>

      </div>
      <div class="uk-width-1-1" v-if="itemsMore.questions.length">
        <div class="fnt-bld fs20@l uk-margin-bottom uk-margin-top uk-width-1-1">Дополнительно</div>
        <div class="questions">
          <div class="label label__item uk-margin-top uk-display-inline-block uk-width-1-1"
            v-for="(question, indexQuestion) in itemsMore.questions"
            :key="indexQuestion"
            >
            <label class="bg_grey uk-grid uk-grid-collapse uk-padding-small uk-grid-small mx385@l">
              <div class="uk-width-auto">
                <input type="checkbox" :name="`checkbox-more-${indexQuestion}`" class="uk-checkbox" :value="indexQuestion" v-model="itemsMore.checked">
              </div>
              <div class="uk-width-expand uk-margin-left">
                {{ question }}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-text-center uk-margin-small-top uk-hidden@s" v-show="!allQuestionsMobile">
      <div class="">
        ...
      </div>
      <div class="btn btn__tpl1 btn__green fr uk-text-lowercase" @click="showQuestions">
        Показать все вопросы
      </div>
    </div>
    <div class="uk-flex uk-flex-center uk-text-center">
      <div class="uk-margin-large-top">
        <div class="">
          Заполните форму, чтобы получить результаты теста
        </div>
        <form @submit.prevent="send" class="uk-flex uk-flex-wrap">
          <div class="uk-position-relative consultation-form__input uk-width-auto@m uk-width-1-1 uk-margin-small-top">
            <i class="icon-smartphone uk-form-icon"></i>
            <input type="text" placeholder="Ваш телефон" class="uk-input uk-form-large" v-model="inputs.phone">
          </div>
          <button class="btn btn__tpl3 btn__large btn__green fnt-med uk-width-auto@m uk-width-1-1 uk-margin-small-top">{{ buttonName }}</button>
        </form>
        <div class="politica">
          Отправляя заявку, вы соглашаетесь на обработку
          <a :href="politika" target="_blank">персональных данных</a>
        </div>
      </div>
    </div>



    </div>
</template>

<script>
import form from '@/mixins/Form.js'
import input from '@/filters/Input.js'
export default {
  name: 'CalcHouse',
  mixins: [form, input],
  props: {
    politika: {
      type: String,
      default: '/wp-content/themes/agentstvo/public/politika.pdf'
    },
    title: {
      default: 'Рассчитать стоимость дома',
      type: String,
    },
    form: {
      default: 'Рассчитать стоимость дома',
      type: String,
    },
    buttonName: {
      default: 'Получить результат',
      type: String,
    }
  },
  data() {
    return {
      stepActive: 0,
      nextDisabled: true,
      allQuestionsMobile: false,
      slickSettings: {
        dots: false,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 0,
        verticalSwiping: true,
     },
      items: [
        {
          type: 'radio',
          title: 'Фундамент',
          questions: [
            'Ну бур сваях',
            'Монолитная подушка'
          ],
          checked: false
        },
        {
          type: 'radio',
          title: 'Перекрытие фундамента',
          questions: [
          'Плиты',
          'На деревянных балках',
          'Монолитное перекрытие',
          ],
          checked: 1
        },
        {
          type: 'radio',
          title: 'Водосточная система',
          questions: [
          'Металлическая',
          'Пластиковая',
          ],
          checked: 1
        },
        {
          type: 'radio',
          title: 'Перекрытие первого этажа',
          questions: [
          'Плиты',
          'На деревянных балках',
          'Монолитное перекрытие',
          ],
          checked: 1
        },
        {
          type: 'radio',
          title: 'Перекрытие второго этажа',
          questions: [
          'Плиты',
          'На деревянных балках',
          'Монолитное перекрытие',
          ],
          checked: 1
        },
        {
          type: 'radio',
          title: 'Фасад здания',
          questions: [
          'Облицовочный кирпич',
          'Мокрый фасад (окрашенный)',
          'Сайдинг',
          'Без облицовки (брус)',
          ],
          checked: 2
        },
        {
          type: 'radio',
          title: 'Материал стен',
          questions: [
          'Кирпич',
          'Керамзитоблок',
          'Газобетон',
          'Керамический блок',
          'Оцилиндрованное бревно',
          'Брус',
          ],
          checked: 2
        },
        {
          type: 'radio',
          subtitle: 'В комплекте: москитная сетка, подоконник, откосы и отливы',
          title: 'Пластиковые окна',
          questions: [
          'KBE',
          'Rehau',
          'Veka',
          'Proplix',
          ],
          checked: 2
        },
        {
          type: 'radio',
          title: 'Утеплени стенн 100мм',
          questions: [
          'KBE',
          'Rehau',
          'Veka',
          'Proplix',
          ],
          checked: 2
        },
        {
          type: 'radio',
          title: 'Лестница',
          questions: [
            'Монолитная',
            'Бетонная',
          ],
          checked: 2
        },
        {
          type: 'radio',
          title: 'Утепление крыши',
          questions: [
            'Минеральный утеплитель',
            'Пенополистирол',
            'Пенопласт',
            'Пенопоулиретан',
          ],
          checked: 2
        },
        {
          type: 'radio',
          title: 'Отделка цоколя',
          questions: [
            'Природный камень',
            'Искуственный камень',
            'Сайдинг',
          ],
          checked: 2
        },
      ],

      itemsMore: {
        type: 'checkbox',
        title: 'Дополнительно',
        questions: [
          'Входная дверь',
          'Водоснабжение: скважина, обустроенная и готова к эксплуатации',
          'Электрика: установка и монтаж электрофурнитуры с устройством вводного щита и счетчиками (медный кабель ВВГ в гофре)',
          'Отмостка', 'Чистовая отделка', 'Входная группа', 'Забор',
          'Канализация: монтаж септика 10 м.3 , утепленная 110 труба с греющим кабелем, с установкой и выводами стояков по дому',
          'Система отопления',
          'Черновая отделка: штукатурка стен цементно-песочным раствором под маяк, стяжка пола из крупнозернистого песка, цемент М400, затирка швов между плитами перекрытия',
          'Система умный дом', 'Благоустройство территории',
        ],
        checked: []
      }


    }
  },

  methods: {
    showQuestions() {
      this.allQuestionsMobile = true
      this.$refs.questionsC.style.height = '100%'
    },
    isDeviceDesctop() {
      if (window.innerWidth >= 1200) {
        return true;
      } else {
        return false;
      }
    },

    send() {
      this.items.forEach(item => {
        this.msg += `${item.title}: ${item.questions[item.checked]} \n <br/>`
      })

      if (this.itemsMore.checked.length) {
        this.msg += 'Дополнительно: '
        this.itemsMore.checked.forEach(item => {
          this.msg += `${this.itemsMore.questions[item]} \n <br/>`
        })
      }

      this.leadTarget = 'send-quiz'
      this.formName = this.form

      this.sendForm()
      this.msg = ''
    }
  }

}
</script>


<style scoped>

.manager__wrapper {
  background: #eaf1f6;
}

.questions__wrapper {
  border: 1px solid #cddfed;
  border-radius: 6px;
}
.questions__item {
  box-shadow: 0 0 10px rgb(0 0 0 / 11%);
  padding: 12px;
  break-inside: avoid;
  transform: translateZ(0);
}

@media (min-width: 960px) {

  .questions {
    column-count: 4;
    column-gap: 12px;
    break-inside: avoid;
    break-after: avoid;
    break-before: avoid;
  }
}

@media (max-width: 640px) {
  .questions__item {
    box-shadow: none;
    border: 2px dotted #00bab6;

  }
  .questions__container {
    height: 440px;
    overflow: hidden;
    transition: 0.4s;
  }
}

@media (min-width: 640px) and (max-width: 960px) {
  .questions {
    column-count: 2;
    column-gap: 12px;
  }
}


button[disabled] {
  cursor: not-allowed;
}

button {
  border: none;
  outline: 0;
}

.btn__next:not([disabled]):hover {
  transition: 0.4s;
  opacity: 0.7;
}

.btn__back {
  border: 1px solid #e4e4e4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #FFF;
}
  .bg_grey {
    background-color: #f2f2f2;
  }

  @media screen and (min-width: 1200px) {
    .mx385\@l {
      max-width: 385px;
    }
  }

  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
