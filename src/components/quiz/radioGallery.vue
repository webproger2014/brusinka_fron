<template>

  <div class="body__title uk-text-left">
    <div class="fs28@m uk-margin-small-bottom uk-text-left">
      {{question.name}}
    </div>

    <div class="uk-width-1-1 uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m">
      <div v-for="(answer, index) in question.answer" :key="index">
        <label>
        <div class="image uk-position-relative uk-margin-bottom"
          :class="{'image-active': question.checked === index}">
          <img class="" :src="`https://cdn.vevanta.com/sk/media_libs/${answer.img}?w=400&h=340`" alt="">
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" class="uk-position-absolute uk-position-top-right uk-margin uk-margin-right"
          :class="{'circle__label-active': question.checked === index}">
            <path class="circle__label" d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12">
            </path>
            <path class="dote__label" d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
            :class="{'dote__label-active': question.checked === index}">
            </path>
          </svg>
          <input class="input__radio uk-position-absolute uk-position-top-right uk-margin uk-margin-right"
          type="radio"
          v-model="question.checked"
          @change="nextSlide"
          :value="index">
          <div class="subtitle">
            {{answer.value}}
          </div>
        </div>
            </label>
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
  overflow-y: auto;
}

.modal {
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  max-width: 900px !important;
  margin: auto;
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
  background-color: #a8682f;
  border: none;
  color: #fff;
  border-radius: 2rem;
}

.btn:hover {
  background-color: #a8682f;
  transition: 0.5s;
}

.header__icon {
  color: #46b9b4;
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
  fill: #a8682f;
}

.circle__label-active {
  fill: #a8682f;
}

.image:hover svg {
  border-radius: 50%;
  box-shadow: 0px 1px 5px 10px rgb(168 104 47 / 26%);
  transition: 0.5s;
}

.image-active {
  border: solid 1px #a8682f;
}

.input__block-active {
  border: 1px solid #a8682f
}

</style>
