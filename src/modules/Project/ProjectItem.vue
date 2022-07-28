<template>
  <div class="project__item uk-position-relative" :id="`project-${index}`">
   <a class="uk-position-top-left uk-width-1-1 uk-height-1-1 z-index-10" :href="`/proekt/${item.id}`" target="_blank"></a>
    <div class="uk-flex uk-flex-wrap left-radius right-radius uk-background-default uk-box-shadow-small shadow-v uk-height-1-1">

      <div class="uk-padding-remove uk-width-1-1 uk-position-relative">

        <div class="uk-position-relative">
          <div class="uk-position-z-index uk-position-absolute">
            <div v-for="(ribbon, index) in item.ribbons">
              <div class="chv fnt-bld cl-wh fs14 uk-flex uk-flex-middle" :class="backg[ribbon.status]">
                {{ ribbon.name_ribbon }}
              </div>
            </div>

          </div>
          <div class="uk-position-z-index uk-position-bottom-right uk-text-center price">
            <div class="cl-wh fnt-bld">
              <template v-if="!projectStaticPrice">
                от
              </template> {{ priceFormat(getPrice(item.square, item.id)) }} ₽
            </div>
          </div>
          <div class="project__item_bg uk-height-small uk-height-xmedium@m uk-background-center-center uk-background-cover"
            :data-src="`https://cdn.vevanta.ru/${item.images[0].url_400}`"
            uk-img
          >
          </div>
          <ul class="uk-margin-left uk-position-bottom uk-slider-nav uk-dotnav uk-margin-small-bottom"></ul>
        </div>
      </div>

      <div class="uk-width-1-1@l uk-width-expand uk-padding-small uk-padding-medium@m uk-position-relative">
        <div class="fs14 fs18@m fnt-bld project__item-title">{{ item.name }}</div>
        <div class="uk-grid uk-grid-small uk-child-width-1-2@s uk-child-width-auto">

          <div class="fnt-med fs14 fs16@s fs22@m uk-margin-small-top uk-margin-top@m">
            <div class="uk-grid uk-grid-small">
              <div class="">
                <img class="icon-project" src="/img/project/square.svg" alt="">
              </div>
              <div class="fs20@m fs14 uk-width-expand uk-flex uk-flex-middle">
                <span>{{ item.square }} м<sup>2</sup></span>
              </div>

            </div>
          </div>

          <div class="fnt-med fs14 fs16@s fs22@m uk-margin-small-top uk-margin-top@m">
            <div class="uk-grid uk-grid-small">
              <div class="">
                <img class="icon-project" src="/img/project/room.svg" alt="">
              </div>
              <div class="fs20@m fs14 uk-width-expand uk-flex uk-flex-middle">
              <span class="">  {{ item.rooms_q }} {{ getLabelRooms(item.rooms_q) }}</span>
              </div>
            </div>
          </div>

          <div class="fnt-med fs14 fs16@s fs22@m uk-margin-small-top uk-margin-top@m">
            <div class="uk-grid uk-grid-small">
              <div>
                <img class="icon-project" src="/img/project/stairs.svg" alt="">
              </div>
              <div class="fs20@m fs14 uk-width-expand uk-flex uk-flex-middle">
                <span>
                  <template v-if="item.floors_q == 1">
                  1 этаж
                </template>
                <template v-else>
                  {{ item.floors_q }} этажа
                </template>
                </span>
              </div>

            </div>
          </div>

          <div v-if="item.width && item.length" class="fs14 fs16@s uk-margin-small-top uk-margin-top@m">
            <div class="uk-grid uk-grid-small uk-flex-middle">
              <div>
                <img class="icon-project"  src="/img/project/razmer.svg" alt="">
              </div>
              <div class="fs20@m fs14 uk-width-expand uk-flex uk-flex-middle">
                <span>
                  {{ item.width }}x{{ item.length }}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div class="uk-grid uk-grid-collapse uk-flex-middle uk-margin-top">
          <div class="">
            <div class="btn btn__tpl1 btn__brown">
              Смотреть проект
            </div>
          </div>
          <div class="uk-margin-left@s uk-margin-small-left">
            <div class="fs16@s fs12">
              <span class="fnt-med">В ипотеку</span> <br/>от {{ priceFormat(priceIpoteka(getPrice(item.square, item.id))) }} ₽/мес.
            </div>
          </div>

        </div>

      </div>
  </div>
</div>
</template>

<script>
import Uikit from 'uikit'
  export default {
    name: 'ProjectItem',
    props: ['item', 'index'],

    created() {
      Uikit.slider(`project-${this.index}`)
    },

    data() {
      return {
              projectStaticPrice: false,
        backg: {
          1: 'chv__one',
          2: 'chv__two',
          3: 'chv__three',
          4: 'chv__four',
        }
      }
    },

    methods: {
      getPrice(square, id) {
        let prices = {
          514: {
            price: 5400000
          },

          515: {
            price: 4800000
          },

          516: {
            price: 4700000
          },

          527: {
            price: 4700000
          },

          517: {
            price: 4100000
          },

          518: {
            price: 3900000
          }
        }

        let price = 0;

        let prices_square = {
          522: 56497.18,
          523: 60891.23,
          525: 56277.06,
          524: 55410.03,
          526: 54024.1,
          528: 52365.81,
        }

        if (prices[id]) {
          this.projectStaticPrice = true
          price = prices[id].price
        } else if (prices_square[id]) {
          price = prices_square[id] * square
        } else {
          let price_kvm = 31000;

          if (square > 130 && square < 170) {
            price_kvm = 35000;
          } else if (square < 130 ) {
            price_kvm = 40000;
          }else if (square > 170 && square < 280) {
            price_kvm = 33000;
          }
          price = square * price_kvm
        }


        price = Math.round(price).toString().replace('.', ',')
        return price
      },

      priceFormat(price) {
          return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      },

      //9 499 020 ₽
      //949902
      priceIpoteka(price) {
        let perc25 = price*25/100
        let summ = price - perc25;
        let percent = 5.9/12/100;
        let period = 20 * 12;
        let kof = percent * Math.pow(1 + percent, period)  / (Math.pow(1 + percent, period) - 1)
        return parseInt(kof * summ);
      },

      getLabelRooms(room) {
        let label = '';

        let baseRoom = parseInt(room.toString().substr(room.length));

        if (room >= 10 && room <= 20) {
          label = 'комнат'
        } else {
          if (baseRoom === 1) {
            label = 'комната'
          } else if ([2, 3, 4].includes(baseRoom) ) {
            label = 'комнаты'
          } else {
            label = 'комнат'
          }
        }
        return label;
      }
    }
  }
</script>


<style scoped>
.bg-btn > div {
  border-radius: 36px;
  width: 105px;
}

.price {
  background-color: #7f2f44;
  padding: 5px 10px 1px 10px;
  min-width: 134px;
}

.icon-project {
  width: 30px;
  height: 30px;
}

@media (max-width: 640px) {
  .icon-project {
    width: 20px;
    height: 20 px;
  }
}

.chv__one {
  background: #ff0d7d;
}

.chv__four {
  background: #0d79ff;
}

.chv__two {
  background: #ff0dd6;
}

.chv__three {
  background: #ff9900;
}
.chv {
  height: 25px;
  padding-left: 10px;
  padding-right: 46px;
  min-width: 135px;
  clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
  margin-top: 8px;
}
</style>
