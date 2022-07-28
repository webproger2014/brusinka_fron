<template>
  <div class="uk-position-relative uk-visible-toggle uk-divght" tabindex="-1">
    <div class="cl-vevanta fnt-bld fs24 uk-text-center">
      {{ item.title }}
    </div>
    <ul
      id="sliderWrapper"
      :class="[sliderEnable ? 'uk-slider-items': '', 'uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m']" ref="sliderWrapper"
      >
      <div v-for="(question, iteration) in item.items" :key="iteration"
        class="uk-margin-top"
        >
        <div class="check-box">
          <input
            :id="`item-${index}${iteration}`"
            class="uk-checkbox"
            type="radio"
            :value="question.name"
            v-model="item.model"
            @input="next"
          />
          <label :for="`item-${index}${iteration}`"
            class="cl-dark uk-display-inline-block"
            :class="{'uk-text-center': question.img}"
            >

            <div class="radio_circle" :class="{'radio_circle__right': question.img}"></div>
            <img v-if="question.img" :src="question.img" alt="">
            <div class="uk-margin-small-top" :class="{'label_pl': !question.img}">{{ question.name }}</div>

          </label>
        </div>
      </div>
    </ul>
  </div>

</template>

<script>
  export default {
    props: ['item', 'sliderEnable', 'index'],
    methods: {
      next() {
        this.$emit('next-slide')
      }
    }
  }
</script>
