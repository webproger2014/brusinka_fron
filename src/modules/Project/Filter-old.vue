<template lang="html">
  <div class="">
    <div class="uk-section uk-background-center-center" data-src="https://vevanta.ru/wp-content/themes/agentstvo/assets/images/home/bunner.jpg" uk-img>
      <div class="uk-container">
        <div class="cl-wh fnt-bld fs24 fs30@s fs46@l uk-text-center uk-margin-medium-bottom">
          {{ title }}
        </div>
        <div class="search-filter__wrapper">
          <form class="uk-flex uk-height-1-1" @submit.prevent="search">
            <div class="uk-background-default uk-margin-small-right  input__block uk-height-1-1 uk-width-1-3 uk-visible@l">
              <label for="" class="search-filter__label_size-small uk-margin-small-left fs14">Введите название проекта</label>
              <input
                class="border-none uk-input search-filter__input_30 search-filter__input_border-none"
                type="text"
                placeholder="Елена с гаражом"
                name="project_name"
                v-model="filter.word"
              >
            </div>

            <div class="uk-width-small@l uk-background-default input__block uk-width-1-3@s uk-width-1-2">
              <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
                <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Этажность</span>
                <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
              </div>
              <div uk-dropdown="mode: click" class="uk-border-rounded uk-margin-right">

                <div class="label_wrapper uk-grid uk-grid-small">
                  <div class="label label__item">
                    <label>
                      <input class="uk-radio" type="radio" :value="0" name="floors_field" v-model="filter.floors_field"
                      <span class="uk-margin-small-left">Все</span>
                    </label>
                  </div>
                  <div class="label label__item">
                    <label>
                      <input class="uk-radio" type="radio" :value="1" name="floors_field" v-model="filter.floors_field">
                      <span class="uk-margin-small-left">1</span>
                    </label>
                  </div>
                  <div class="label label__item">
                    <label>
                      <input class="uk-radio" type="radio" :value="2" name="floors_field" v-model="filter.floors_field">
                      <span class="uk-margin-small-left">2</span>
                    </label>
                  </div>
                  <div class="label label__item">
                    <label>
                      <input class="uk-radio" type="radio" :value="3" name="floors_field" v-model="filter.floors_field">
                      <span class="uk-margin-small-left">3</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>


            <div class="uk-width-small@l uk-margin-small-left uk-background-default input__block uk-width-1-3@s uk-visible@s">
              <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
                <span class="uk-margin-auto-vertical uk-margin-small-left">Материал</span>
                <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
              </div>
              <div uk-dropdown="mode: click" class="uk-border-rounded">
                <div class="label_wrapper uk-grid uk-grid-small">
                  <div class="label label__item">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="1" name="category_field" v-model="filter.category_field">
                      <span class="uk-margin-small-left">Камень</span>
                    </label>
                  </div>
                  <div class="label label__item">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="7" name="category_field" v-model="filter.category_field">
                      <span class="uk-margin-small-left">Дерево</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>



            <div class="uk-width-small@l uk-margin-small-left uk-background-default input__block uk-width-1-3@s uk-width-1-2">
              <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
                <div class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">
                  <span v-show="!filter.square_field_from || !filter.square_field_to">Площадь</span>
                  <div v-show="filter.square_field_from && filter.square_field_to">
                    {{ filter.square_field_from }} - {{ filter.square_field_to }} м<sup>2</sup>
                  </div>
                </div>
              </div>

              <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded uk-margin-right">
                <div class="uk-grid-small" uk-grid>
                  <div class="uk-width-small@l uk-width-1-2">
                    <input class="uk-input" type="text" placeholder="От" name="square_field_from" v-model="filter.square_field_from">
                  </div>
                  <div class="uk-width-small@l uk-width-1-2">
                    <input class="uk-input" type="text" placeholder="До" name="square_field_from" v-model="filter.square_field_to">
                  </div>
                </div>
              </div>
            </div>


            <div class="uk-width-small uk-margin-small-left uk-background-default input__block uk-visible@l">
              <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
                  <span class="uk-margin-auto-vertical uk-margin-small-left" v-show="!filter.size_x_field || !filter.size_y_field">Размерность</span>
                  <span class="uk-margin-auto-vertical uk-margin-small-left" v-show="filter.size_x_field && filter.size_y_field">
                    X: {{ filter.size_x_field }}, Y: {{ filter.size_y_field }}
                  </span>
                </div>
              <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded">
                <div class="uk-grid-small" uk-grid>
                  <div class="uk-width-small">
                    <input class="uk-input" type="text" placeholder="X" name="size_x_field" v-model="filter.size_x_field">
                  </div>
                  <div class="uk-width-small">
                    <input class="uk-input" type="text" placeholder="Y" name="size_y_field" v-model="filter.size_y_field">
                  </div>
                </div>
              </div>
            </div>

            <div class="uk-text-center uk-width-small uk-margin-small-left input__block uk-visible@s">
              <button class="btn btn__tpl3 fnt-semi btn__green uk-height-1-1 uk-width-1-1 fs18">Найти</button>
            </div>
          </form>
        </div>

        <div class="uk-grid uk-grid-small uk-margin-top">
          <div class="">
            <div class="cl-wh uk-flex cr-pointer">
              <div class="uk-flex fnt-bld cl__btn fs20 uk-border-rounded wh45 input__block uk-background-default">
                <i class="icon-filter uk-margin-auto uk-margin-auto-vertical"></i>
              </div>
            </div>
            <div uk-dropdown="mode: click" class="uk-border-rounded spot uk-overflow-hidden">
              <div class="label_wrapper uk-grid">
                <div class="">
                  <div class="fs18 fnt-bld uk-margin-bottom cl-dark">
                    Тип этажа
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        value="1"
                        name="atticfloor_field"
                        v-model="filter.atticfloor_field"
                      >
                      <span class="uk-margin-small-left">Мансарда</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        value="1"
                        name="basement_field"
                        v-model="filter.basement_field"
                      >
                      <span class="uk-margin-small-left">Цокольный этаж</span>
                    </label>
                  </div>
                </div>


                <div>
                  <div class="fs18 fnt-bld uk-margin-bottom cl-dark">
                    Тип гаража
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value="garage_field"
                        v-model="filterTools.garage"
                      >
                      <span class="uk-margin-small-left">Гараж в доме</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value="naves_field"
                        v-model="filterTools.garage"
                      >
                      <span class="uk-margin-small-left">Навесной гараж</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="uk-text-center uk-width-expand uk-margin-small-left uk-hidden@s">
            <button class="btn btn__tpl3 fnt-semi btn__green uk-height-1-1 uk-width-1-1 fs18">Найти</button>
          </div>
        </div>
      </div>
    </div>

    <section class="uk-background-muted">
      <div class="uk-container" id="projects-list">
        <div class="title">
          {{ projectsBlockTitle }}
        </div>
        <div class="uk-grid uk-child-width-1-2@m" v-show="projects.length">
          <div class="uk-flex uk-visible@l">
            <div
              :class="[settings.classListingButton, !settings.listing ? settings.classListingButtonEnable : 'cl__btn', 'rm__bord_right']"
              @click="settings.listing = 0"
              >
              <span
                class="uk-margin-auto-vertical uk-margin-auto-left uk-margin-auto-right"
              >
                <i class="icon-list"></i>
              </span>
            </div>
            <div
              :class="[settings.classListingButton, settings.listing ? settings.classListingButtonEnable : 'cl__btn', 'rm__bord_left']"
              @click="settings.listing = 1"
              >
              <span
              class="uk-margin-auto-vertical uk-margin-auto-left uk-margin-auto-right"
                >
                <i class="icon-window"></i>
              </span>
            </div>
          </div>
          <div class="uk-flex uk-flex-right@l">
            <div class="">
              <div class="btn__tpl_bord input__block uk-position-relative uk-width-medium cr-pointer">
                <i class="icon-align-up uk-position-center-left uk-margin-small-left cl__btn fs14"></i>
                <div class="uk-position-center-left uk-margin-medium-left">
                  <span v-if="filter.sort === 'popular'">По популярности</span>
                  <span v-else-if="filter.sort === 'square_desc'">По убыванию площади</span>
                  <span v-else-if="filter.sort === 'square_asc'">По возрастанию площади</span>
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
                        v-model="filter.sort"
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
                      v-model="filter.sort"
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
                        v-model="filter.sort"
                      >
                      <span class="uk-margin-small-left">По возрастанию площади</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div>
          <div class="uk-text-center uk-padding" v-show="!projects.length">
            <preloader></preloader>
          </div>
          <transition-group name="list" :class="classListing">
            <project-item v-for="(item, key, i) in projects" :key="key" :item="item" :index="key">
            </project-item>
          </transition-group>

          <ul class="uk-pagination uk-flex-center" uk-margin v-show="(pages > 1) && projects.length && statusSearchProjects === 1">
              <li><a href="#" @click.prevent="nextPage(filter.paged - 1)"><span uk-pagination-previous></span></a></li>

              <template v-if="filter.paged !== 1">
                <li><a href="#">1</a></li>
                <li class="uk-disabled"><span>...</span></li>
              </template>
              <template v-if="filter.paged === 1">
                <li class="uk-active"><span>1</span></li>
              </template>
              <template v-if="(filter.paged - 3) > 1">
                <li><a href="#projects-list" @click="nextPage(filter.paged - 3)" uk-scroll>{{ filter.paged - 3 }}</a></li>
              </template>
              <template v-if="(filter.paged - 2) > 1">
                <li><a href="#projects-list" @click="nextPage(filter.paged - 2)" uk-scroll>{{ filter.paged - 2 }}</a></li>
              </template>
              <template v-if="(filter.paged - 1) > 1">
                <li><a href="#projects-list" @click="nextPage(filter.paged - 1)" uk-scroll>{{ filter.paged - 1 }}</a></li>
              </template>
              <template v-if="filter.paged !== 1">
                <li class="uk-active"><a href="#">{{ filter.paged }}</a></li>
              </template>
              <template v-if="(filter.paged + 1) <= pages">
                <li><a href="#projects-list" @click="nextPage(filter.paged + 1)" uk-scroll>{{ filter.paged + 1 }}</a></li>
              </template>
              <template v-if="(filter.paged + 2) <= pages">
                <li><a href="#projects-list" @click="nextPage(filter.paged + 2)" uk-scroll>{{ filter.paged + 2 }}</a></li>
              </template>
              <template v-if="(filter.paged + 3) <= pages">
                <li><a href="#projects-list" @click="nextPage(filter.paged + 3)" uk-scroll>{{ filter.paged + 3 }}</a></li>
              </template>


              <li class="uk-disabled"><span>...</span></li>
              <li><a href="#">{{ pages }}</a></li>
              <li><a href="#"><span uk-pagination-next></span></a></li>
          </ul>
        </div>

        <calc-house></calc-house>
      </div>
    </section>
  </div>

</template>
<script>
import Preloader from '../Preloader'
import ProjectItem from './ProjectItem'
import CalcHouse from './CalcHouse'

export default {
  name: "ProjectListFilter",
  components: {
    Preloader,
    CalcHouse,
    ProjectItem
  },
  props: {
    title: {
      type: String,
      default: 'Построить дом - легко!'
    },
    filter: {
      default: () => {
        return {
          word: '',
          floors_field: 0,
          square_field_from: 0,
          square_field_to: 0,
          size_x_field: 0,
          size_y_field: 0,
          sort: 'popular',
          category_field: [1, 7],
          atticfloor_field: 0,
          basement_field: 0,
          garage_field: 0,
          naves_field: 0,
          paged: 1
        }
      }
    }
  },
  data() {
    return {
      pages: 0,
      projects: [],
      projectsBlockTitle: 'Проекты домов',
      statusSearchProjects: 0, //0 Processing / 1 Success, 2 Empty
      project_name: '',
      settings: {
        listing: 1,
        classListingButton: 'uk-flex btn__tpl_bord cr-pointer input__block w60',
        classListingButtonEnable: 'btn__tpl__bg-grey btn__tpl_bord2 cl-wh',
      },
      filterTools: {
        garage: ''
      },
    }
  },

  created() {

    this.checkPropFilter()
    this.search()

    this.$watch('filter.category_field', () => {
      this.search()
    })
    this.$watch('filter.floors_field', () => {
      this.search()
    })
    this.$watch('filter.sort', () => {
      this.search()
    })

    this.$watch('filter.atticfloor_field', () => {
      this.search()
    })
    this.$watch('filter.basement_field', () => {
      this.search()
    })

    this.$watch('filterTools.garage', (newV, oldV) => {
      if (oldV !== '') {
        this.filter[oldV] = 0
      }
      this.filter[newV] = 1
      this.search()
    })


  },

  methods: {
    search() {
      this.statusSearchProjects = 0
      this.projects = []
      this.$axios.post(`https://vevanta.com/api?controller=projects&action=searchProjects`, this.filter)
      .then(rs => {
        this.pages = rs.data.response.pages
        if (rs.data.response.posts) {
          this.projectsBlockTitle  = 'Проекты домов'
          this.projects = rs.data.response.posts
          this.statusSearchProjects = 1
        } else {
          this.searchInterestingProject()
        }
      })
    },

    searchInterestingProject() {
      this.statusSearchProjects = 2
      this.$axios.post(`https://vevanta.com/api?controller=projects&action=searchProjects`, {
        sort: 'popular',
        category_field: [1, 7],
      })
      .then(rs => {
        this.pages = rs.data.response.pages
        this.projects = rs.data.response.posts
        this.projectsBlockTitle  = 'Ничего не найдено! Возможно вас заинтересует'
      })
    },

    nextPage(page) {
      this.filter.paged = page
      this.search()
    },

    checkPropFilter() {
      if (this.filter.word) {
        this.filter = {
          word: this.filter.word,
          paged: this.filter.paged,
          sort: this.filter.sort,
        }
      }

      if (!this.filter.sort) {
        this.filter.sort = 'popular'
      }
    }
  },

  computed: {
    classListing() {
      return {
        'uk-grid': true,
        'uk-child-width-1-2@s': true,
        'uk-child-width-1-3@l': this.settings.listing,
        'uk-child-width-1-1@l': !this.settings.listing,
        'uk-margin-medium-bottom': true,
        'uk-margin-medium-top': true
      }
    }
  },
}
</script>


<style media="screen" scoped>


.cl__btn {
  color: #7c7c7c;
}

.search-filter__wrapper {
  background-color: #0424394f;
  padding: 10px;
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.8s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.wh45 {
  width: 45px;
  height: 45px;
}

.ts::after {
  content: "";
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -9px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 11px solid #ffbf00;
}


.project__item {
  margin-bottom: 40px;
}

@media screen and (max-width: 640px) {
  .input__block {
    height: 50px;
  }

  .project__item-title {
    max-height: 37px;
    overflow: hidden;
  }

  .project__item-title::after {
    content: "...";
  }
}
@media screen and (max-width: 1200px) {
  .project__item {
    margin-bottom: 20px;
  }
  .left-radius {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .right-radius {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}
</style>
