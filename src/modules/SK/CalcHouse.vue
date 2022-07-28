<template>
  <div class="calc-house">
    <div class="title">
      {{ title }}
    </div>

    <div v-if="isDeviceDesctop()">
      <div uk-grid="masonry: true">
        <div class="label_wrapper uk-width-1-3@m uk-width-1-1 uk-margin-small-top" v-for="(item, indexItem) in items" :key="indexItem">
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

          <div v-if="item.subtitle" class="cl-v fs14">
            <hr class="uk-divider-icon uk-margin-small-bottom">
            <em>{{ item.subtitle }}</em>
          </div>

        </div>
      </div>

      <div class="uk-width-1-1" v-if="itemsMore.questions.length">
        <div class="fnt-bld fs20@l uk-margin-bottom uk-margin-top uk-width-1-1">Дополнительно</div>
        <div uk-grid="masonry: true" class="uk-child-width-1-3@m uk-grid-collapse">
          <div class="label label__item uk-margin-top"
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


    <div v-else>
      <div class="margin-small-top" v-for="(item, indexItem) in items" :key="indexItem">
        <transition name="fade" mode="out-in">
        <div v-show="indexItem === stepActive">
          <div class="uk-flex">
            <div class="fnt-bld uk-margin-bottom uk-width-expand">{{ item.title }}</div>
            <div class="uk-width-1-4 uk-text-right">
              Вопрос: {{ stepActive + 1 }}/{{ items.length }}
            </div>
          </div>

          <div v-if="item.type === 'radio'">
            <div class="label label__item uk-margin-bottom" v-for="(question, indexQuestion) in item.questions" :key="indexQuestion" >
              <label>
                <input
                  type="radio"
                  :name="`radio-${indexItem}`"
                  class="uk-radio"
                  :value="indexQuestion"
                  v-model="item.checked"
                  @input="nextStep"
                >
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
            <div v-if="item.subtitle" class="cl-v fs14">
              <hr class="uk-divider-icon uk-margin-small-bottom">
              <em>{{ item.subtitle }}</em>
            </div>
          </div>
        </transition>
        </div>
      </div>

      <template v-if="!isDeviceDesctop()">
        <hr class="uk-margin-small uk-margin-medium-top">

        <div class="uk-flex uk-flex-right" >
          <button class="btn__back uk-flex-middle" @click="backStep">
            <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
          </button>
          <button class="btn__next uk-inline uk-flex-middle" @click="nextStep" :disabled="nextDisabled">
            Далее <span uk-icon="icon: arrow-right"></span>
          </button>
        </div>
      </template>

      <transition name="fade">
        <div v-if="isDeviceDesctop()" class="uk-margin-large-top">
          <form @submit.prevent="send" class="uk-flex uk-flex-wrap">
            <div class="uk-position-relative consultation-form__input uk-width-auto@m uk-width-1-1">
              <span class="uk-form-icon">
                <i class="icon-smartphone cl-vevanta"></i>
              </span>
              <input type="text" placeholder="Ваш телефон" class="uk-input uk-form-large" v-model="inputs.phone">
            </div>
            <button class="btn btn__tpl3 btn__large btn__green fnt-med uk-width-auto@m uk-width-1-1">{{ buttonName }}</button>
          </form>
          <div class="politica">
            Отправляя заявку, вы соглашаетесь на обработку
            <a :href="politika" target="_blank">персональных данных</a>
          </div>
        </div>
      </transition>
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
    isDeviceDesctop() {
      if (window.innerWidth >= 1200) {
        return true;
      } else {
        return false;
      }
    },


    nextStep() {
      if (this.stepActive <= this.items.length) {
        this.stepActive++
      }
    },

    backStep() {
      if (this.stepActive > 1) {
        this.stepActive--

        //if (this.itemsthis.stepActive)
      }
    },

    send() {
      this.items.forEach(item => {
        this.msg += `${item.title}: ${item.questions[item.checked]} \n`
      })

      if (this.itemsMore.checked.length) {
        this.msg += 'Дополнительно: '
        this.itemsMore.checked.forEach(item => {
          this.msg += `${this.itemsMore.questions[item]} \n`
        })
      }

      this.formName = this.form
      this.sendForm()
    }
  }

}
</script>

<style scoped>
.btn__next {
  cursor: pointer;
  padding: 5px 20px;
background: rgb(30,135,240);
background: linear-gradient(90deg, rgba(30,135,240,1) 11%, rgba(39,190,184,1) 83%);
  color: #FFF;
  border-radius: 36px;
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
