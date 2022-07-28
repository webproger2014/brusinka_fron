<template>
  <div class="quiz1">
    <div class="steps uk-flex uk-margin-small-bottom uk-margin-small-top">
      <div class="step radius36 uk-margin-small-right checked">
        <div>1</div>
      </div>
      <div class="step radius36 uk-margin-small-right active">
        <div>2</div>
      </div>
      <div class="step radius36 uk-margin-small-right">
        <div>3</div>
      </div>
      <div class="step radius36 uk-margin-small-right">
        <div>4</div>
      </div>
      <div class="step radius36">
        <div>5</div>
      </div>
    </div>

    <div class="uk-background-muted uk-padding uk-margin-medium-top">


        <div class="fs22 fnt-bld uk-margin-medium-bottom">
          {{ questions[panel].title }}
        </div>

        <div>
          <label class="uk-margin-right item inline uk-background-default uk-padding-small radius36 pointer" v-for="(item, index) in questions[panel].items" :key="index">
            <input class="uk-radio inline-middle" type="radio" name="radio2" checked>
            <span class="uk-margin-small-left">
              {{ item.title }}
            </span>
          </label>
        </div>

      <hr class="uk-margin-small uk-margin-medium-top">
      <div class="footer uk-margin-medium-top uk-flex uk-child-width-1-2">
        <div class="uk-flex uk-flex-middle fnt-med">
          Рассчитать стоимость ипотеки
        </div>
        <div class="uk-flex uk-flex-right">
          <button class="btn__back uk-flex-middle" @click="backStep">
            <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
          </button>
          <button class="btn__next uk-inline uk-flex-middle" @click="nextStep">
            Далее <span uk-icon="icon: arrow-right"></span>
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz1',
  data() {
    return {
      title: 'Калькулятор ипотеки',
      panel: 'i1',
      historyStep: [],


      questions: {
        'i1': {
          title: 'Тип недвижимости',
          step: 'i2',
          checked: 0,
          items: [
            {title: 'Новостройки'},
            {title: 'Вторичная недвижимость'},
            {title: 'Частные дома и коттеджи'},
            {title: 'Земельные участки'},
            {title: 'Дачи'},
          ]
        },

        'i2': {
          title: 'Стоимость недвижимости',
          step: 'i2',
          checked: 0,
          items: [
            {title: 'Любое назначение'},
          ]
        },

        'i2': {
          title: 'Первоначальный взнос',
          step: 'i2',
          checked: 0,
          items: [
            {title: 'Любое назначенаие'},
          ]
        },



      }
    }
  },
  created() {

  },
  methods: {
    nextStep() {
      this.panel = this.questions[this.panel].step
      this.historyStep.push(this.panel)
    },

    backStep() {

      if (this.panel !== 'i1') {
        this.historyStep.splice(this.historyStep.length - 1, 1)
        this.panel = this.historyStep[this.historyStep.length - 1]
      }

    }
  }

}
</script>

<style media="screen" scoped>
.radius36 {
  border-radius: 36px;
}

.item:hover {
  transition: 0.2s;
  cursor: pointer;
  background-color: #2e75ce;
  color: #FFF;
}

.step.active {
  background-color: #32d296;
}

.step.active > div {
  border-color: #32d296;
}

.step.checked {
  background-color: #faa05a;
}
.step.checked > div {
  border-color: #faa05a;
}

.step {
  width: 34%;
  height: 12px;
  position: relative;
  background-color: #e4e4e4;
}

.step > div {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: -8px;
  width: 30px;
  height: 30px;
  background-color: #FFF;
  border: 3px solid #e4e4e4;
  text-align: center;
  border-radius: 50%;
  padding-top: 2px
}


.btn__next {
  cursor: pointer;
  padding: 5px 20px;
  background-color: #faa05a;
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
