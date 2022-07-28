<template>

  <div class="body__title uk-text-left">
    <div class="fs28@m uk-margin-small-bottom uk-text-left">
      {{question.name}}
    </div>
    <div>
      <div class="uk-margin-small-bottom">
        <div class="more-question">
          <span>*Выберите один или несколько</span>
        </div>

      </div>
      <div class="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s">
        <div class="uk-margin-small-bottom"
        v-for="(answer, index) in question.answer" :key="index">
          <div class="uk-position-relative">
            <label class="uk-flex input__block uk-flex-middle" :class="{'input__block-active': question.checked.includes(index)}">
              <div class="square uk-margin-small-left uk-margin-small-right">
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" class="uk-align-center"
                :class="{'cl-brown q-checkbox__svg fit absolute-full': question.checked.includes(index)}">
                  <path fill="" d="M1.73,12.91 8.1,19.28 22.79,4.59" class=""
                  :class="{'q-checkbox__truthy': question.checked.includes(index) }">
                  </path>
                </svg>
                <input type="checkbox"
                v-model="question.checked"
                :value="index"
                hidden>
              </div>
              <div>{{answer.value}}</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['item', 'index', 'keyQuestion'],
  data() {
    return {
      question: {},
      step: ''
    }
  },
  created() {
    this.question = this.item
  },
  methods: {
    searchElement(arr, index) {
  //    console.log('checked', this.question.checked)
    //  console.log('Массив', Array.isArray(this.question.checked))
      return 0
    }
  }
}
</script>

<style scoped>
.background {
  background: rgb(0 0 0 / 54%);
}

.modal {
  height: 100%;
  border-radius: 5px;
  padding: 15px;
  min-width: 400px;
}

svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

.input__block:hover svg {
  box-shadow: 0px 1px 5px 10px rgb(168 104 47 / 11%);
  transition: 0.5s;
}

.input__block {
  border-radius: 4px;
  border: 1px solid #6b263a;
  height: 50px;
}

.input__block-active {
  border: 1px solid #6b263a;
}

.square {
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-radius: 2px
}

.q-checkbox__truthy {
    fill: none;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 0.18s cubic-bezier(0.4,0,0.6,1) 0ms;
    stroke: currentColor;
    stroke-width: 3.12px;
}



.more-question {
  padding: 5px 15px;
  display: inline-block;
  border: 1px solid rgba(168,104,47,.25);
  background: rgb(127 47 68 / 18%);
  border-radius: 5px;
}
</style>
