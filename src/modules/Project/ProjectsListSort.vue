<template>
  <div>
    <div class="btn__tpl_bord input__block uk-position-relative cr-pointer">
      <i class="icon-align-up uk-position-center-left uk-margin-small-left cl__btn fs14"></i>
      <div class="uk-position-center-left uk-margin-medium-left">
        <span v-if="sort === 'popular'">По популярности</span>
        <span v-else-if="sort === 'square_desc'">По убыванию площади</span>
        <span v-else-if="sort === 'square_asc'">По возрастанию площади</span>
      </div>
      <i class="icon-down-arrow uk-position-center-right cl__btn uk-margin-small-right"></i>
    </div>
    <div uk-dropdown="mode: click" class="uk-border-rounded">
      <div class="label_wrapper">
        <div class="label label__item uk-margin-small-bottom">
          <label>
            <input
              class="uk-radio"
              type="radio"
              value="popular"
              name="sort"
              v-model="sort"
            >
            <span class="uk-margin-small-left">Популярное</span>
          </label>
        </div>
        <div class="label label__item uk-margin-small-bottom">
          <label>
            <input class="uk-radio"
            type="radio"
            value="square_desc"
            name="sort"
            v-model="sort"
            >
            <span class="uk-margin-small-left">По убыванию площади</span>
          </label>
        </div>
        <div class="label label__item">
          <label>
            <input
              class="uk-radio"
              type="radio"
              value="square_asc"
              name="sort"
              v-model="sort"
            >
            <span class="uk-margin-small-left">По возрастанию площади</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        classListingButton: 'uk-flex btn__tpl_bord cr-pointer input__block w60',
        classListingButtonEnable: 'btn__tpl__bg-grey btn__tpl_bord2 cl-wh',
      },
      sort: 'popular'
    }
  },

  created() {
    this.$watch('sort', (v) => {
      this.$store.commit('SET_SORT', v)
      this.$store.dispatch('GET_PROJECTS')
    })
  }
}
</script>

<style media="screen">

.cl__btn {
  color: #7c7c7c;
}


.input__block {
  height: 60px;
}

.btn__tpl_bord {
  border: 1px solid #e0e0e0;
}

.btn__tpl_bord2 {
  border: 1px solid #858585;
}

.btn__tpl__bg-grey {
  transition: 0.4s;
  background-color: #858585;
}

.w60 {
  width: 60px;
}

.rm__bord_left {
  padding-left: 0;
}

.rm__bord_right{
  border-right: none;
}

.wh45 {
  width: 45px;
  height: 45px;
}


</style>
