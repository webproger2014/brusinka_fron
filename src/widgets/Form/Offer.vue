<template>
  <div class="offer__main">
    <div class="uk-position-relative offer_container uk-overflow-hidden">
      <img class="offer_img" src="/img/offer.jpg" alt="">
      <div class="uk-position-absolute uk-position-right offer__wrap">
        <div class="offer__title fs28@l fs20@m fs18@s fs12 fnt-bld">
          <span>Семейная ипотека</span> <br class="uk-hidden@l"/>на строительство дома
        </div>
        <div class="offer__line uk-visible@l"></div>
        <div class="offer_caption uk-flex uk-flex-middle uk-visible@l">
          Оставьте заявку или звоните нам по телефону:
          <a class="fnt-bld fs28 cl-dark offer__phone" href="tel:+73452596041">{{ phone }}</a>
        </div>

        <form class="uk-grid uk-width-1-1 uk-margin-top uk-child-width-1-2@l" @submit.prevent="sendForm">
          <div  class="uk-first-column">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon"><i class="icon-user cl-brown"></i></span>
            <input type="text" placeholder="Ваше имя" class="uk-input" v-model="inputs.name"></div>
          </div>

          <div>
            <div class="uk-inline uk-width-1-1 input__wrap-phone">
              <span class="uk-form-icon"><i class="icon-smartphone cl-brown"></i></span>
              <input type="text" placeholder="Ваш телефон" class="uk-input" v-model="inputs.phone">
            </div>
          </div>

          <div class="uk-margin-top uk-first-column offfer_wrap-politica">
            <div class="politica">Отправляя заявку, вы соглашаетесь на обработку
              <a href="/politika-konfidencialnosti" target="_blank">персональных данных</a>
            </div>
          </div>
          <div class=" uk-text-right uk-margin-top offer__wrap-send">
            <button class="btn btn__tpl1 btn__brown">
              отправить заявку
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>

</template>

<script>
import Form from '@/mixins/Form'
  export default {
    mixins: [Form],
    props: {
      phone: {
        default: '7 (3452) 59-60-41'
      }
    },
    created() {
      this.formName = 'Семейная ипотека на строительство дома'
    }
  }
</script>


<style scoped>

  .offer_img {
    max-width: 1200px;
  }

  .offer__wrap {
    width: 63.3%;
  }

  .offer__title {
    margin-top: 35px;
  }
  .offer__line {
    width: 70px;
    height: 4px;
    background: #6b263a;
    margin-top: 22px;
  }

  .offer_caption {
    margin-top: 15px;
  }

  .offer__phone {
    margin-left: 10px;
  }


      .offer__title > span {
        background: #6b263a;
        color: #FFF;
        padding: 5px
      }
  @media (max-width: 1200px) {
    .offer__main {
      padding: 0
    }
    .offer__wrap {
      padding-right: 15px;
      width: 100%
    }

    .offer__title {
      text-align: right;
      margin-top: 10px
    }


    form {
      text-align: right;
      margin-left: 0
    }

    .input__wrap-phone {
      margin-top: 7px
    }

    .offer__wrap {
      max-width: 330px;
    }

    .offer__wrap-send {
      margin-top: 8px !important
    }
  }

  @media (max-width: 640px) {
    .politica {
      font-size: 6px;
      padding: 0
    }

    .offer__wrap {
      max-width: 185px
    }

    button {
      font-size: 9px;
      padding: 3px 15px 3px 16px !important
    }


    form,
    .offfer_wrap-politica {
      margin-top: 5px !important
    }

    .offer__wrap-send {
      margin-top: 3px !important
    }

    form input[type="text"] {
      font-size: 12px
    }

    form .uk-form-icon {
      font-size: 12px
    }

    .offer_img {
      max-width: 700px;
      margin-left: -30px
    }

    .uk-input {
      height: 32px
    }
  }
</style>
