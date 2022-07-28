<template id="">
  <div :class="`uk-grid uk-child-width-1-${item.col}@m uk-child-width-1-${item.colAuto} uk-width-1-1`">
    <div v-for="(question, i) in item.questions" class="uk-margin-bottom">
      <input type="checkbox" :id="`input-${index}${i}`" :name="`input-${index}${i}`" :value="i" v-model="item.model" hidden>
      <label :for="`input-${index}${i}`">
        <div class="brd2 uk-height-1-1 uk-width-1-1 check__item">
          <div class="uk-grid uk-grid-small uk-flex-middle uk-height-1-1">
            <div class="uk-width-1-4 uk-height-1-1 uk-flex uk-flex-middle">
              <span class="radio-check uk-margin-auto"></span>
            </div>
            <div class="fnt-med fs18 question__title uk-width-expand">{{ question.title }}</div>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'index']
  }
</script>
