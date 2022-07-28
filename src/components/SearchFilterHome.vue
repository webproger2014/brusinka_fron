<template>
  <div>
    <div class="search-filter__wrapper">
      <form class="uk-flex uk-height-1-1" method="GET" action="/proekty-zagorodnyh-domov" ref="form">
        <div class="uk-background-default uk-margin-small-right  input__block uk-height-1-1 uk-width-1-2 uk-visible@m">
          <label for="" class="search-filter__label_size-small uk-margin-small-left fs14">Введите название проекта</label>
          <input
            class="border-none uk-input search-filter__input_30 search-filter__input_border-none"
            type="text"
            placeholder="Елена с гаражом"
            name="word"
            v-model="filter.word"
          >
        </div>

        <div class="uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Этажность</span>
            <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded uk-margin-right">

            <div class="label_wrapper uk-grid uk-grid-small">
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="0" name="floors" v-model="filter.floors">
                  <span class="uk-margin-small-left">Все</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="1" name="floors" v-model="filter.floors">
                  <span class="uk-margin-small-left">1</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="2" name="floors" v-model="filter.floors">
                  <span class="uk-margin-small-left">2</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="3" name="floors" v-model="filter.floors">
                  <span class="uk-margin-small-left">3</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <div class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">
              <span v-show="!filter.square_min || !filter.square_max">Площадь</span>
              <div v-show="filter.square_min && filter.square_max">
                {{ filter.square_min }} - {{ filter.square_max }} м<sup>2</sup>
              </div>
            </div>
          </div>

          <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded uk-margin-right">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="От" name="square_min" v-model="filter.square_min">
              </div>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="До" name="square_max" v-model="filter.square_max">
              </div>
            </div>
          </div>
        </div>


        <div class="uk-text-center uk-width-small uk-margin-small-left input__block uk-visible@s">
          <button class="btn btn__tpl3 fnt-semi btn__green uk-height-1-1 uk-width-1-1 fs18">Найти</button>
        </div>
      </form>
    </div>

    <div class="uk-text-center uk-width-1-1 uk-margin-top uk-hidden@s">
      <button class="btn btn__tpl3 fnt-semi btn__green input__block uk-width-1-1 fs18" @click="search">Искать проект</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFilterHome",
  data() {
    return {
      search_string: 'Тюмень',

      filter: {
        square_min: 0,
        square_max: 0,
        floors: 0,
        word: '',
      },

      settings: {
        search_string: '',
      },
    }
  },

  methods: {
    search() {
      this.$refs.form.submit()
    }
  }
}
</script>

<style lang="css" scoped>

  .input__block {
    height: 60px;
  }

  .search-filter__wrapper {
    background-color: #0424394f;
    padding: 10px;
  }

  .mobile-filter {
    position: absolute;
    bottom: -38px;
    width: 92%;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1;
    display: none;
  }

  @media screen and (max-width: 640px) {
    .input__block {
      height: 50px;
    }
  }
</style>
