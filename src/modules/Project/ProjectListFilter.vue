<template lang="html">
  <div>
    <div class="search-filter__wrapper uk-position-relative z-index-20">
      <form class="uk-flex uk-height-1-1" @submit.prevent="formSubmit">
        <div class="uk-background-default input__block uk-height-1-1 uk-width-large uk-visible@m">
          <label for="" class="search-filter__label_size-small uk-margin-small-left fs14">Название проекта</label>
          <input
            class="border-none uk-input search-filter__input_30 search-filter__input_border-none"
            type="text"
            placeholder="поиск"
            name="word"
            v-model="filterTools.word"
          >
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2 uk-visible@s">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <span class="uk-margin-auto-vertical uk-margin-small-left">Материал</span>
            <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded">
            <div class="label_wrapper">
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="6" name="materials" v-model="filterTools.materials">
                  <span class="uk-margin-small-left">Клееный брус</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="7" name="materials" v-model="filterTools.materials">
                  <span class="uk-margin-small-left">Бревно</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="9" name="materials" v-model="filterTools.materials">
                  <span class="uk-margin-small-left">Каркас</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">

              <template v-if="!filterTools.floors">
                <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Этажность</span>
                <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
              </template>
              <template v-else>
                <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Этажей: {{ filterTools.floors }}</span>
                <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
              </template>

          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded uk-margin-right">

            <div class="label_wrapper uk-grid uk-grid-small">
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="0" name="floors" v-model="filterTools.floors">
                  <span class="uk-margin-small-left">Все</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="1" name="floors" v-model="filterTools.floors">
                  <span class="uk-margin-small-left">1</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="2" name="floors" v-model="filterTools.floors">
                  <span class="uk-margin-small-left">2</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="3" name="floors" v-model="filterTools.floors">
                  <span class="uk-margin-small-left">3</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <div class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">
              <span v-show="!filterTools.square[0] && !filterTools.square[1]">Площадь</span>
              <template v-if="filterTools.square[0] && !filterTools.square[1]">
                от {{ filterTools.square[0] }} м<sup>2</sup>
              </template>
              <template v-if="filterTools.square[1] && !filterTools.square[0]">
                до {{ filterTools.square[1] }} м<sup>2</sup>
              </template>
              <div v-show="filterTools.square[0] && filterTools.square[1]">
                {{ filterTools.square[0] }} - {{ filterTools.square[1] }} м<sup>2</sup>
              </div>
            </div>
          </div>

          <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded uk-margin-right">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="От" v-model="filterTools.square[0]">
              </div>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="До" v-model="filterTools.square[1]">
              </div>
            </div>
          </div>
        </div>
      </form>

      <form class="uk-flex uk-height-1-1 uk-margin-small-top" @submit.prevent="formSubmit">
        <div class="uk-background-default input__block uk-width-1-5@m uk-width-1-2 uk-visible@m">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <span class="uk-margin-auto-vertical uk-margin-small-left">Стиль</span>
            <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded">
            <div class="label_wrapper">
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="2" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Хай-тек</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="3" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Классический</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="4" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Современный</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="5" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Шале</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="6" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Барнхаус</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="7" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Фахверк</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="8" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Райт</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="9" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Минимализм</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="10" name="materials" v-model="filterTools.styles">
                  <span class="uk-margin-small-left">Скандинавский</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2 uk-visible@s">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <span class="uk-margin-auto-vertical uk-margin-small-left">Тип этажа</span>
            <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded">
            <div class="label_wrapper">
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="1" name="materials" v-model="filterTools.mansard">
                  <span class="uk-margin-small-left">Мансарда</span>
                </label>
              </div>
              <div class="label label__item uk-margin-small-bottom">
                <label>
                  <input class="uk-checkbox" type="checkbox" :value="1" name="materials" v-model="filterTools.basement">
                  <span class="uk-margin-small-left">Цокольный этаж</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Тип гаража</span>
            <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
          </div>
          <div uk-dropdown="mode: click" class="uk-border-rounded uk-margin-right">

            <div class="label_wrapper uk-grid uk-grid-small">
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" value="" v-model="filterTools.garage_type">
                  <span class="uk-margin-small-left">Любой</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" :value="2" v-model="filterTools.garage_type">
                  <span class="uk-margin-small-left">Гараж в доме</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" value="not" v-model="filterTools.garage_type">
                  <span class="uk-margin-small-left">Без гаража</span>
                </label>
              </div>
              <div class="label label__item">
                <label>
                  <input class="uk-radio" type="radio" value="5" v-model="filterTools.garage_type">
                  <span class="uk-margin-small-left">Отдельный гараж</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2 uk-visible@s">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <template v-if="!filterTools.rooms">
              <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Кол-во спален</span>
              <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
            </template>
            <template v-else>
              <span class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">Спален: {{ filterTools.rooms }}</span>
              <i class="uk-margin-auto-vertical uk-margin-small-right icon-down-arrow"></i>
            </template>
          </div>
          <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded uk-margin-right">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-1-1">
                <input class="uk-input" type="text" placeholder="3" v-model="filterTools.rooms">
              </div>
            </div>
          </div>
        </div>

        <div class="uk-margin-small-left uk-background-default input__block uk-width-1-5@m uk-width-1-2">
          <div class="uk-flex-between uk-flex uk-height-1-1 cr-pointer">
            <div class="uk-margin-auto-vertical uk-margin-small-left fs14 fs16@s">
              <span v-show="!filterTools.dimension[0] || filterTools.dimension[1]">Габариты</span>
              <template v-if="filterTools.dimension[0]">
                X: {{ filterTools.dimension[0] }}
              </template>
              <template v-if="filterTools.dimension[1]">
                Y: {{ filterTools.dimension[1] }}
              </template>

            </div>
          </div>

          <div uk-dropdown="mode: click" pos="bottom-right" class="uk-border-rounded uk-margin-right">
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="X" v-model="filterTools.dimension[0]">
              </div>
              <div class="uk-width-small@l uk-width-1-2">
                <input class="uk-input" type="text" placeholder="Y" v-model="filterTools.dimension[1]">
              </div>
            </div>
          </div>
        </div>

          <div class="uk-text-center uk-width-small uk-margin-small-left input__block uk-visible@s">
            <button class="btn btn__tpl3 fnt-semi btn__brown uk-height-1-1 uk-width-1-1 fs18">Найти</button>
          </div>
      </form>
    </div>
  <!--  <div class="uk-margin-top uk-position-relative z-index-10 uk-visible@m">
      <div class="cl-dark uk-grid uk-grid-small uk-margin-auto-vertical fs14">
        <template v-if="filterTools.materials.length">
          <div v-if="filterTools.materials.includes(1)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из кирпича <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(1)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(2)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из газоблока <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(2)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(3)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из Керамического блока <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(3)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(4)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из Керамзитоблока <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(4)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(5)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из пеноблока <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(5)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(6)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из клееного бруса <i class="icon-close icon-cart cr-pointer" @click="_delMaterial(6)"></i>
            </div>
          </div>
          <div v-if="filterTools.materials.includes(7)" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted">
              Из бревна<i class="icon-close icon-cart cr-pointer" @click="_delMaterial(7)"></i>
            </div>
          </div>
        </template>
        <template v-show="filterTools.dimension.length">
          <div v-show="filterTools.dimension[0]" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted cr-pointer">
              Ширина: {{ filterTools.dimension[0] }} <i class="icon-close icon-cart" @click="_setDimension(0, '')"></i>
            </div>
          </div>
          <div v-show="filterTools.dimension[1]" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted cr-pointer">
              Высота: {{ filterTools.dimension[1] }} <i class="icon-close icon-cart" @click="_setDimension(1, '')"></i>
            </div>
          </div>
        </template>
        <div v-show="filterTools.mansard" class="uk-margin-bottom">
          <div class="uk-padding-small uk-background-muted cr-pointer">
            Мансардый этаж <i class="icon-close icon-cart" @click="filterTools.mansard = ''"></i>
          </div>
        </div>
        <div v-show="filterTools.basement" class="uk-margin-bottom">
          <div class="uk-padding-small uk-background-muted cr-pointer">
            Цокольный этаж <i class="icon-close icon-cart" @click="filterTools.basement = ''"></i>
          </div>
        </div>
        <template v-show="filterTools.garage_type" class="uk-margin-bottom">
          <div v-if="filterTools.garage_type == 2">
            <div class="uk-padding-small uk-background-muted cr-pointer">
              Гараж в доме <i class="icon-close icon-cart" @click="filterTools.garage_type = ''"></i>
            </div>
          </div>
          <div v-if="filterTools.garage_type == 'not'" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted cr-pointer">
              Без гаража <i class="icon-close icon-cart" @click="filterTools.garage_type = ''"></i>
            </div>
          </div>
          <div v-if="filterTools.garage_type == 5" class="uk-margin-bottom">
            <div class="uk-padding-small uk-background-muted cr-pointer">
              Отдельный гараж <i class="icon-close icon-cart" @click="filterTools.garage_type = ''"></i>
            </div>
          </div>
        </template>
      </div>

    </div> -->

    <form @submit.prevent="$store.dispatch('GET_PROJECTS', filterTools)" class="uk-grid uk-grid-small uk-margin-top uk-position-relative z-index-10">
      <div class="">
        <div class="cl-wh uk-flex cr-pointer uk-visible@s">
          <div class="uk-flex uk-margin-right fnt-bld cl__btn fs20 uk-border-rounded wh45 input__block uk-background-default" @click="toggleFilter">
            <i class="icon-filter uk-margin-auto uk-margin-auto-vertical"></i>
          </div>
          <button class="btn btn__tpl3 btn__blue fnt-semi fs18 " @click="clearFilters">Сбросить</button>
        </div>
      </div>

      <div class="uk-flex uk-between cl-wh cr-pointer uk-width-1-1 uk-hidden@s">
          <div class="blockFilterMobile uk-flex fnt-bld uk-margin-right cl__btn fs20 uk-border-rounded input__block" @click="toggleFilter">
            <i class="iconFilterMobile uk-background-default icon-filter uk-margin-auto uk-margin-auto-vertical"></i>
            <div class="countsFilter fs16 cl-wh" v-if="filterCounts.length">{{filterCounts.length}}</div>
          </div>
          <button class="btn uk-margin-right btn__tpl3 fnt-semi btn__btn__brown fs18 uk-width-1-2">Найти</button>
          <button class="btn btn__tpl3 btn__blue fnt-semi fs18 uk-width-1-2" @click="clearFilters">Сбросить</button>
        </div>
    </form>


    <div id="canvas-filter" uk-offcanvas="mode: none;" ref="filterMobile">
      <div class="canvas-filter__wrapper uk-offcanvas-bar uk-background-muted trans4 uk-width-1-1 uk-position-relative uk-height-1-1 uk-box-shadow-large">
        <form class="uk-flex uk-height-1-1 uk-display-inline-block" @submit.prevent="$store.dispatch('GET_PROJECTS', filterTools)">

        <div class="nav-dark filter__nav">
          <a href="#canvas-filter" uk-toggle><i class="icon-close filter__close cl-dark"></i></a>
          <div class="fnt-med uk-margin-small-bottom">
            Название проекта:
          </div>
          <input class="uk-margin-small-bottom uk-input" type="text" placeholder="Хай-тек" v-model="filterTools.word">
          <div class="fnt-med uk-margin-small-bottom">
            Площадь:
          </div>
          <div class="uk-grid-small" uk-grid>
            <div class="uk-width-small@l uk-width-1-2">
              <input class="uk-input" type="text" placeholder="От" v-model="filterTools.square[0]">
            </div>
            <div class="uk-width-small@l uk-width-1-2">
              <input class="uk-input" type="text" placeholder="До" v-model="filterTools.square[1]">
            </div>
          </div>
          <ul class="uk-nav-parent-icon" uk-nav>

            <li class="uk-parent">
              <a href="#" class="link__grey uk-nav-header more-icon__grey">Этажность</a>
              <ul class="uk-nav-sub">
                <li>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-radio" type="radio" :value="0" name="floors" v-model="filterTools.floors">
                      <span class="uk-margin-small-left">Все</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-radio" type="radio" :value="1" name="floors" v-model="filterTools.floors">
                      <span class="uk-margin-small-left">1</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-radio" type="radio" :value="2" name="floors" v-model="filterTools.floors">
                      <span class="uk-margin-small-left">2</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-radio" type="radio" :value="3" name="floors" v-model="filterTools.floors">
                      <span class="uk-margin-small-left">3</span>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
            <li class="uk-parent">
              <a href="#" class="link__grey uk-nav-header more-icon__grey">Стиль</a>
              <ul class="uk-nav-sub">
                <li>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="2" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Хай-тек</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="3" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Классический</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="4" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Современный</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="5" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Шале</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="6" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Барнхаус</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="7" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Фахверк</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="8" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Райт</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="9" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Минимализм</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input class="uk-checkbox" type="checkbox" :value="10" name="materials" v-model="filterTools.styles">
                      <span class="uk-margin-small-left">Скандинавский</span>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
          <li class="uk-parent">
            <a href="#" class="link__grey uk-nav-header more-icon__grey">Материал</a>
            <ul class="uk-nav-sub">
              <li>
                <div class="label label__item uk-margin-small-bottom">
                  <label>
                    <input class="uk-checkbox" type="checkbox" :value="6" name="materials" v-model="filterTools.materials">
                    <span class="uk-margin-small-left">Брус</span>
                  </label>
                </div>
              </li>
              <li>
                <div class="label label__item uk-margin-small-bottom">
                  <label>
                    <input class="uk-checkbox" type="checkbox" :value="9" name="materials" v-model="filterTools.materials">
                    <span class="uk-margin-small-left">Каркас</span>
                  </label>
                </div>
              </li>
              <li>
                <div class="label label__item uk-margin-small-bottom">
                  <label>
                    <input class="uk-checkbox" type="checkbox" :value="7" name="materials" v-model="filterTools.materials">
                    <span class="uk-margin-small-left">Бревно</span>
                  </label>
                </div>
              </li>
            </ul>
          </li>

          <li class="uk-parent">
            <a href="#" class="link__grey uk-nav-header more-icon__grey">Кол-во спален</a>
            <ul class="uk-nav-sub">
              <li>
                  <input class="uk-input" type="text" placeholder="3" v-model="filterTools.rooms">
              </li>
            </ul>
          </li>

            <li class="uk-parent">
              <a href="#" class="link__grey uk-nav-header more-icon__grey">Габариты</a>
              <ul class="uk-nav-sub">
                <li>
                  <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-small@l uk-width-1-2">
                      <input class="uk-input" type="text" placeholder="X" v-model="filterTools.dimension[0]">
                    </div>
                    <div class="uk-width-small@l uk-width-1-2">
                      <input class="uk-input" type="text" placeholder="Y" v-model="filterTools.dimension[1]">
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li class="uk-parent">
              <a href="#" class="link__grey uk-nav-header more-icon__grey">Тип этажа</a>
              <ul class="uk-nav-sub">
                <li>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        value="1"
                        v-model="filterTools.mansard"
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
                        v-model="filterTools.basement"
                      >
                      <span class="uk-margin-small-left">Цокольный этаж</span>
                    </label>
                  </div>
                </li>
              </ul>
            </li>

            <li class="uk-parent">
              <a href="#" class="link__grey uk-nav-header more-icon__grey">Тип гаража</a>
              <ul class="uk-nav-sub">
                <li>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value=""
                        v-model="filterTools.garage_type"
                      >
                      <span class="uk-margin-small-left">Любой</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value="2"
                        v-model="filterTools.garage_type"
                      >
                      <span class="uk-margin-small-left">Гараж в доме</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value="not"
                        v-model="filterTools.garage_type"
                      >
                      <span class="uk-margin-small-left">Без гаража</span>
                    </label>
                  </div>
                  <div class="label label__item uk-margin-small-bottom">
                    <label>
                      <input
                        class="uk-radio"
                        type="radio"
                        value="5"
                        v-model="filterTools.garage_type"
                      >
                      <span class="uk-margin-small-left">Отдельный гараж</span>
                    </label>
                  </div>
                </li>
              </ul>
            </li>

          </ul>

          <div class="uk-text-center uk-margin-top uk-margin-bottom">
            <button class="btn btn__tpl1 btn__btn__brown" @click="formSubmitMobile">
              Применить фильтр
            </button>
          </div>
          <div class="uk-text-center uk-margin-top">
            <button class="btn btn__tpl1 btn__blue" @click="clearFilters">
              Сбросить фильтры
            </button>
          </div>
        </div>

      </form>

      </div>
    </div>

  </div>

</template>
<script>
export default {
  name: "ProjectListFilter",
  props: {
    filter: {
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      filterCounts: [],
      projects: [],
      filterTools: {},
      statusLoad: 0,
      startAjaxTimer: 0,
      statusWatch: 0,
    }
  },
  watch: {
    filterTools: {
      handler: function (val, oldVal) {
        this.$store.commit('SET_PAGED', 1)
          if (!this.statusWatch) {
            this.statusWatch = 1
            return
          }
          this.formSubmit()
      //    this.$store.dispatch('GET_PROJECTS', this.filterTools)
       },
      deep: true
    },
  },
  created() {

    this.filterTools = this.$_filter_merge()
   this.$store.dispatch('GET_PROJECTS', this.filterTools)

  },
  methods: {
    formSubmitMobile(){
      this.formSubmit()
      this.toggleFilter()
      this.scrollToProject()
    },
    scrollToProject(){
        document.getElementById('project-0').scrollIntoView({
          block: "center",
          behavior: 'smooth'
        });
      },
    formSubmit(){

      clearTimeout(this.startAjaxTimer)
      this.startAjaxTimer = setTimeout(() => {

        this.$store.dispatch('GET_PROJECTS', this.filterTools)
        this.filterCounts = []
        this.statusLoad = 0
      }, 1000)


      for (var key in this.filterTools) {
        if(key === 'sort'){ continue }
    //    if(key === 'materials' && this.filterTools.materials.length === 6){ continue }

         /*if (Array.isArray(this.filterTools[key])) {
           if((this.filterTools[key][0] > 0) && (this.filterTools[key][1] > 0) || (this.filterTools[key][0] > 0) || (this.filterTools[key][1] > 0)){
              this.filterCounts.push(key)
           }
        } else if(this.filterTools[key]) {
          this.filterCounts.push(key)
        } */
      }
    },
    _setDimension(k, v) {
      let vals = [...this.filterTools.dimension]
      vals[k] = v
      this.filterTools.dimension = vals
       this.$store.dispatch('GET_PROJECTS', this.filterTools)
    },

    _delMaterial(elem) {
      let indexOf = this.filterTools.materials.indexOf(elem)
      this.filterTools.materials.splice(indexOf, 1)
    },
    $_filter_merge() {
      let filter = {
        bathrooms: 0,
        floors: 0,
        garage_type: '',
        basement: 0,
        rooms: '',
        roof_type: 0,
        square: [],
        mansard: 0,
        materials: [6, 7, 9],
        dimension: [],
        styles: [],
        sort: 'popular',
        word: '',
      }

      for (let key in filter) {
        if (this.filter[key] !== undefined) {
          filter[key] = this.filter[key]
        }
      }

      return filter;
    },

    toggleFilter() {
      UIkit.offcanvas(this.$refs.filterMobile).toggle();
    },
    clearFilters() {
      this.filterTools = this.$_filter_merge()
      this.filterCounts = []
    }
  }
}
</script>


<style media="screen" scoped>
.iconFilterMobile{
  padding: 10px;
  border-radius: 8px;
}
.blockFilterMobile{
  position: relative;
}
.countsFilter{
  position:absolute;
  top:-10px;
  right: -5px;
  text-align: center;
  border-radius:50%;
  width: 20px;
  height: 20px;
  background-color: #0598BB;
}
.save-filter__container {
  height: 30px;
}
.btn__blue:hover {
  transition: 0.4s;
  background-color: #305a75;
  color: #FFF;
}
.canvas-filter__wrapper {
    border-right: 3px solid #59bbb6;
}
.filter__close {
  position: absolute;
  right: 8px;
  top: 8px;
}

.filter__nav {
  padding-bottom: 20px;
}

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

.z-index-20 {
  z-index: 20;
}

.icon-cart {
  color: #ff3636;
  font-size: 10px;
}
@media screen and (max-width: 768px) {
  .search-filter__wrapper {
    padding-left: 0px;
}
}
@media screen and (max-width: 640px) {
  .input__block {
    height: 50px;
  }
}
</style>
