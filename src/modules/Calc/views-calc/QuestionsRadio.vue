<template id="">
  <div :class="`uk-grid uk-child-width-1-${item.col}@m uk-child-width-1-${item.colAuto} uk-width-1-1`">
    <template v-if="item.size === 'small'">
      <div v-for="(question, i) in item.questions">
        <input type="radio" :id="`input-${index}${i}`" :value="i" :name="`input-${index}`" hidden @input="next" v-model="item.model">
        <label :for="`input-${index}${i}`" class="uk-text-center">
          <div class="block__small brd2 uk-margin-auto uk-flex uk-flex-middle">
            <img class="uk-margin-auto" :src="question.img" alt="" uk-img>
          </div>
          <div class="fnt-med fs14 fs18@m uk-margin-top question__title">{{ question.title }}</div>
        </label>
      </div>
    </template>
    <template v-else-if="item.size === 'big'">
      <div v-for="(question, i) in item.questions">
        <input type="radio" :id="`input-${index}${i}`" :value="i" :name="`input-${index}`" hidden @input="next" v-model="item.model">
        <label :for="`input-${index}${i}`" class="uk-text-center">
          <div class="brd2 block__big uk-width-1-1">
            <div class="uk-grid uk-flex-middle uk-height-1-1">
              <div class="uk-width-1-2@m">
                <img class="uk-margin-auto" :src="question.img" alt="" uk-img>
              </div>
              <div class="uk-width-expand@m uk-width-1-1">
                <div class="fnt-med fs14 fs18@m uk-margin-top question__title">{{ question.title }}</div>
              </div>

            </div>
          </div>
        </label>
      </div>
    </template>
    <template v-else-if="item.size === 'medium'">
      <div v-for="(question, i) in item.questions">
        <input type="radio" :id="`input-${index}${i}`" :value="i"  hidden :name="`input-${index}`" hidden @input="next" v-model="item.model">
        <label :for="`input-${index}${i}`" class="uk-text-center">
          <div class="brd2 block__medium uk-flex uk-flex-middle">
            <div class="uk-margin-auto">
              <img :src="question.img" alt="" uk-img>
            </div>
          </div>
          <div class="fnt-med fs14 fs18@m uk-margin-top question__title">{{ question.title }}</div>
        </label>
      </div>
    </template>
    <template v-else-if="item.size === 'auto'">
      <div v-for="(question, i) in item.questions">
        <input type="radio" :id="`input-${index}${i}`" :value="i"  hidden :name="`input-${index}`" hidden @input="next" v-model="item.model">
        <label :for="`input-${index}${i}`" class="uk-text-center">
          <div class="brd2">
            <img  :src="question.img" alt="" uk-img>
          </div>
          <div class="fnt-med fs14 fs18@m uk-margin-top question__title">{{ question.title }}</div>
        </label>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index'],
    methods: {
      next() {
        this.$emit('next')
      }
    },
  }
</script>
