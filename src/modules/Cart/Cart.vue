<template>
  <div class="uk-margin-top">
    <div class="uk-padding uk-text-center" v-if="!statusCart">
      <preloader></preloader>
    </div>

    <div class="uk-grid uk-grid-small uk-margin-bottom">
      <div class="cr-pointer show-animation">
        <div class="btn__dot" :class="{'btn__dot_active': !pageStep}" @click="pageStep = 0">
          Корзина <span class="uk-badge bgv" v-show="$store.state.cartItems.length">{{ $store.state.cartItems.length }}</span>
        </div>
      </div>
      <div class="cr-pointer show-animation">
        <div class="btn__dot" :class="{'btn__dot_active': pageStep === 1}" @click="pageStep = 1">
          Выбрать услуги
        </div>
      </div>
    </div>

    <div v-show="pageStep === 0">
      <div v-if="statusCart === 1">
        <div v-show="!step">
          <div class="uk-grid uk-grid-small">
            <div class="">
              Добавлено ({{ $store.state.cartItems.length }})
            </div>
            <div class="cr-pointer show-animation fnt-med">
              <div @click="clearCart">
                Очистить корзину
              </div>
            </div>
          </div>
          <ul class="uk-list uk-list uk-list-striped" uk-switcher="connect: #component-nav; animation: uk-animation-fade" >
            <li class="cr-pointer" v-for="(item, index) in items">
              <div class="uk-grid uk-grid-small uk-flex-middle">
                <div class="uk-width-xsmall">
                  <a class="cl-dark " :href="item.url" target="_blank">
                    <img :src="item.img_med" alt="">
                  </a>
                </div>
                <div class="uk-width-expand">
                  <a class="cl-dark fs14 fs18@m" :href="item.url" target="_blank">
                    {{ item.title }}
                  </a>
                  <p class="uk-visible@s">{{ item.description }}</p>
                </div>
                <div>
                  <i class="icon-close" @click="delItemModel(index)"></i>
                </div>
              </div>
            </li>
          </ul>

          <div>
            <div v-show="!step">
              <div class="btn btn__tpl1 btn__green" @click="step = 1">Оформить предложение</div>
            </div>
          </div>
        </div>

        <div v-show="step === 1">
          <div class="fs20 fnt-med uk-margin">
            Оформление заказа
          </div>

          <form @submit.prevent="send" class="uk-flex uk-flex-wrap">
            <div class="uk-position-relative consultation-form__input uk-width-auto@m uk-width-1-1">
              <span class="uk-form-icon">
                <i class="icon-smartphone cl-vevanta"></i>
              </span>
              <input type="text" placeholder="Ваш телефон" class="uk-input uk-form-large" v-model="inputs.phone">
            </div>
            <div class="politica uk-width-1-1">
              Отправляя заявку, вы соглашаетесь на обработку
              <a href="/wp-content/themes/agentstvo/public/politika.pdf" target="_blank">персональных данных</a>
            </div>
            <div class="uk-width-1-1">
              <div class="uk-grid uk-grid-small uk-flex-middle">
                <div class="cr-pointer show-animation uk-margin-right" @click="step = 0">
                  <i class="icon-arrow-medium-left"></i> Обратно
                </div>
                <div class="btn btn__tpl1 btn__green" @click="send">Отправить</div>
              </div>
            </div>

          </form>

        </div>
      </div>

      <div v-if="statusCart === 3" class="uk-text-center uk-margin fs22@m fnt-med">
        Ваш заказ оформлен! Мы свяжемся с вами в ближайшее время для уточнения деталей
      </div>

      <div class="uk-text-center fs22@m uk-padding" v-else-if="statusCart === 2" >
        <div class="">
          Ваша корзина пуста!
        </div>
        <div class="btn btn__tpl1 btn__green uk-margin-top" @click="pageStep = 1">Выбрать услуги</div>
      </div>

    </div>

    <div v-if="pageStep === 1">
      <ul class="uk-list uk-list-striped">
        <li class="cr-pointer" v-for="(item, index) in servicesItems">
          <div class="uk-grid uk-grid-small uk-flex-middle">
            <div class="uk-width-xsmall">
              <a class="cl-dark " :href="item.url" target="_blank">
                <img :src="item.img_med" alt="">
              </a>
            </div>
            <div class="uk-width-expand">
              <a class="cl-dark fs14 fs18@m" :href="item.url" target="_blank">
                {{ item.title }}
              </a>
              <p class="uk-visible@s">{{ item.description }}</p>
            </div>
            <div>
              <button-add-item-cart :id="item.id"></button-add-item-cart>
            </div>
          </div>
        </li>
      </ul>
    </div>


   <div id="del-item" uk-modal ref="delItem">
      <div class="uk-modal-dialog" v-if="Object.keys(itemEdit).length">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          Удалить: {{ itemEdit.title }} ?
        </div>
        <div class="uk-modal-footer uk-text-right">
          <div class="btn btn__tpl1 btn__dark uk-margin-right" @click="closeDelItem">Отмена</div>
          <div class="btn btn__tpl1 btn__green" @click="delItem">Удалить</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Form from '@/mixins/Form'
import Preloader from '@/components/Preloader'
import ButtonAddItemCart from '@/widgets/buttons/ButtonCartAddItem'
  export default {
    components: {
      Preloader, ButtonAddItemCart
    },
    mixins: [Form],
    props: ['services'],
    data() {
      return {
        pagesId: [],
        items: [],
        servicesItems: [],
        itemEdit: {},
        statusCart: 0,
        step: 0,
        pageStep: 0,
      }
    },

    created() {
      this._getProducts()
      this._getServices()

      this.$watch('$store.state.cartItems', (v) => {
        this._getProducts()
      })
    },

    methods: {
      _getProducts() {
        if (this.$store.state.cartItems.length) {
          this.$axios.post(`https://${window.location.hostname}/wp-json/api/v1/post/get_post`, {
            'pages_id': this.$store.state.cartItems,
          })
          .then(rs => {
            if (rs.data.length) {
              this.items = rs.data
              this.statusCart = 1
            } else {
              this.statusCart = 2
            }
          })
        } else {
          this.statusCart = 2
        }
      },

      _getServices() {
        this.$axios.post(`https://${window.location.hostname}/wp-json/api/v1/post/get_post`, {
          'pages_id': JSON.parse(this.services),
        })
        .then(rs => {
          this.servicesItems = rs.data
        })
      },

      closeDelItem() {
        UIkit.modal(this.$refs.delItem).hide();
        this.itemEdit = {}
      },

      delItemModel(key) {
        this.itemEdit = this.items[key];
        UIkit.modal(this.$refs.delItem).show();
      },

      delItem() {
        UIkit.modal(this.$refs.delItem).hide();
        this.items = this.items.filter(item => item.id !== this.itemEdit.id)
        this.$store.dispatch('DEL_ITEM_CART', this.itemEdit.id);
        this.itemEdit = {}
        if (!this.items.length) {
          this.statusCart = 2
        }
      },

      clearCart() {
        this.statusCart = 2
        this.items = [];
        this.$store.dispatch('CLEAR_CART');
      },

      send() {
        this.items.forEach(item => {
          this.msg += `Наименование товара: <a href="${item.url}" target="_blank  ">${item.title}</a> <br/>`
        });
        this.statusCart = 3
        this.items = [];
        this.sendForm()
        this.$store.dispatch('CLEAR_CART');
      }

    }
  }
</script>


<style>
  .bgv {
    background: #00bab6 !important;
  }
</style>
