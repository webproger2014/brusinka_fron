<template>
    <div class="uk-grid uk-grid-small object-item" uk-grid>
      <div class="uk-width-1-1 uk-width-1-3@l">
        <div class="uk-position-relative uk-light" uk-slideshow>
          <ul class="uk-slideshow-items">
            <template v-if="item.photos.length">
              <li v-for="img in item.photos" :key="img.id">
                  <div uk-spinner style="color: initial" class="uk-position-center"></div>
                <picture>
                  <img :data-src="`https://cloud.vevanta.ru${img.photo360}`"  alt="" uk-img uk-cover class="uk-animation-fade">
                </picture>
              </li>
            </template>
            <template v-else>
              <li>
                <img data-src="https://vevanta.ru/wp-content/themes/agentstvo/assets/images/object/no-photo.jpg" alt="" uk-img uk-cover>
              </li>
            </template>
          </ul>
          <a class="uk-position-center-left uk-position-small" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
          <a class="uk-position-center-right uk-position-small" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
        </div>
      </div>
        <div class="uk-width-1-1 uk-width-2-3@l uk-margin-remove-top">
          <div class="uk-padding-small">
            <transition name="fade">
              <info-flat v-if="item.object.class_id === 1" :item="item"></info-flat>
            </transition>

            <transition name="fade">
              <info-room v-if="item.object.class_id === 2" :item="item"></info-room>
            </transition>

            <transition name="fade">
              <info-house v-if="item.object.class_id === 3" :item="item"></info-house>
            </transition>

            <transition name="fade">
              <info-garage v-if="item.object.class_id === 4" :item="item"></info-garage>
            </transition>

            <transition name="fade">
              <info-commercial v-if="item.object.class_id === 5" :item="item"></info-commercial>
            </transition>
            <transition name="fade">
              <info-area v-if="item.object.class_id === 6" :item="item"></info-area>
            </transition>
              <div uk-grid class="uk-flex-between@l uk-grid-small">
                <div class="uk-width-1-4@m uk-width-1-3@s uk-visible@l">
                  <div v-if="openContact" class="uk-animation-fade uk-margin-remove object-item__manager uk-flex">
                    <div class="uk-width-1-4">
                      <img
                        :data-src="item.object.user_staff_photo ? `https://cloud.vevanta.ru${item.object.user_staff_photo}`: 'https://vevanta.ru/wp-content/themes/agentstvo/assets/images/object/avatar.jpg'"
                        alt=""
                        uk-img
                        class="uk-border-circle"
                      >
                    </div>

                    <div class="uk-margin-small-left">
                      <div class="uk-text-bold object-item__manager-name">{{item.object.user_staff_lastname}} {{item.object.user_staff_name}}</div>
                      <div>
                        <a :href="`tel:+7${item.object.user_staff_phone}`" target="_blank" class="fs14 cl-vevanta">
                          {{ item.object.user_staff_phone | phoneType }}
                        </a>
                      </div>

                    </div>
                  </div>

                  <div v-show="!openContact" class="btn btn__tpl3 btn__grey uk-width-auto@l uk-text-center" @click="openContact = true">
                    <span>показать телефон</span>
                  </div>
                </div>

                <div class="uk-width-auto@l uk-width-1-2 uk-hidden@l">
                  <a :href="`tel:+7${item.object.user_staff_phone}`"
                    class="btn btn__tpl3 btn__grey uk-width-auto@l uk-width-1-1 uk-text-center cl-dark"
                    >
                    позвонить
                  </a>
                </div>

                <div class="uk-visible@l">
                  <div class="btn btn__tpl3 uk-width-auto@l btn__grey uk-text-center" @click="openModal(`Добавить в избранное ${item.object.id}`)">
                    в избранное
                  </div>
                </div>

                <div class="uk-visible@l">
                  <div class="btn btn__tpl3 uk-width-auto@l btn__grey uk-text-center" @click="openModal(`Запланировать выезд: ${item.object.id}`)">
                    запланировать выезд
                  </div>
                </div>

                <div class="uk-flex-right@l uk-width-auto@l uk-width-1-2">
                  <a :href="`https://vevanta.ru/item/${item.object.id}`"
                    class="btn btn__tpl3 btn__green uk-width-auto@l uk-width-1-1 uk-text-center"
                    target="_blank"
                    >
                    подробнее
                  </a>
                </div>

              </div>
          </div>

        </div>
    </div>
</template>

<script>
import input from '../filters/Input.js'
import InfoFlat from './ListingItems/InfoFlat'
import InfoHouse from './ListingItems/InfoHouse'
import InfoRoom from './ListingItems/InfoRoom'
import InfoGarage from './ListingItems/InfoGarage'
import InfoCommercial from './ListingItems/InfoCommercial'
import InfoArea from './ListingItems/InfoArea'
export default {
  name: 'Item',
  mixins: [ input] ,
  props: {
    item: Object
  },

  components: {
    InfoFlat, InfoHouse, InfoRoom, InfoGarage, InfoCommercial, InfoArea,
  },

  data () {
    return {
      openContact: false
    }
  },

  computed: {
    filter () {
      return this.$store.state.filter
    }
  },

  methods: {
    openModal(formName = '') {
      this.$root.$refs.modalDefault.openModal({
        formName: formName,
      });
    }
  }
}
</script>

<style media="screen">
  @media screen and (min-width: 1200px) {
    .object-item__manager-name {
      max-width: 124px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .object-item__info {
      height: 126px;
    }
  }
</style>

<style scoped>
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.object-item__data {
  padding: 20px;
}
</style>
