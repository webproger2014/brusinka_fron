<template>

  <div class="body__title uk-text-left">
    <div class="fs28@m uk-margin-medium-bottom uk-text-left">
      {{question.name}}
    </div>
    <div>

      <div class="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m">

        <div class="uk-margin-small-bottom"
        v-for="(answer, index) in question.answer" :key="index">
          <div class="uk-position-relative">
            <label class="uk-flex input__block uk-flex-middle"
              :class="{'input__block-active': question.checked === index}">
              <div class="uk-margin-small-left uk-margin-small-right">
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                  :class="{'circle__label-active': question.checked === index}">
                  <path class="circle__label" d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12">
                  </path>
                  <path class="dote__label q-radio__check" d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
                    :class="{'dote__label-active': question.checked === index}"
                    >
                  </path>
                </svg>
                <input type="radio"
                v-model="question.checked"
                :value="index"
                @change="nextSlide"
                hidden>
              </div>
                <div>
              {{ answer.value }}
            </div>
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
  emits: ['listUpdate', 'listNumber', 'next'],
  data() {
    return {
      question: {},
      step: ''
    }
  },

  created() {
    this.question = this.item
    this.$emit('listUpdate', {
      checked: this.question.checked,
      key: this.keyQuestion,
    })
  },

  methods: {
    nextSlide() {
      setTimeout(() => {
          this.$emit('next')
      }, 300)
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

.image {
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
}

.subtitle {
  color: rgba(54,54,54,0.7);
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 16px;
}

svg {
  width: 20px;
  height: 20px;
  fill: #525858;
}

.btn {
  background-color: #46b9b4;
  border: none;
  color: #fff;
  border-radius: 2rem;
}

.btn:hover {
  background-color: #a8682f;
  transition: 0.5s;
}

.header__icon {
  color: #a8682f;
}

.circle {
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 50%;
  border: solid 1px rgba(54,54,54,0.7);
  cursor: pointer;
}

.input__radio {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.dote__label {
  display: none;
  fill: rgba(0,0,0,0.54)
}

.dote__label-active {
  display: block;
  fill: #6b263a;
}

.circle__label-active {
  fill: #6b263a;
}

.input__block:hover svg {
  border-radius: 50%;
  box-shadow: 0px 1px 5px 10px rgb(168 104 47 / 16%);
  transition: 0.5s;
}

.image-active {
  border: solid 1px #a8682f;
}

.input__block {
  border-radius: 4px;
  border: 1px solid #6b263a;
  height: 50px;
}

.input__block-active {
  border: 1px solid #6b263a;
}

</style>
