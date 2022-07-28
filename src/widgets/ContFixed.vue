<template>
  <div id="modal-cont" uk-modal ref="modalCont" class="uk-flex-top" @click="close($event.target)">
    <div class="uk-modal-dialog modalDef uk-margin-auto-vertical uk-modal-body uk-padding-remove uk-width-2xlarge">
      <button class="uk-modal-close-outside" type="button" uk-close @click="close" id="close"></button>
      <img class="uk-hidden@s" :src="settings.img ? settings.img : ''" alt="">
      <div class="uk-grid uk-grid-collapse uk-child-width-1-2@s uk-height-1-1">
        <div class="uk-flex uk-flex-middle uk-flex-center uk-padding-small uk-text-center">
          <div class="uk-width-large">
            <div class="fs12 fs16@s uk-text-uppercase fnt-bld">{{settings.title ? settings.title : title }}</div>
            <div class="uk-margin-small-top fs12 fs16@s">{{settings.caption ? settings.caption : caption }}</div>
            <form @submit.prevent="sendForm($refs.modalCont)">
              <div class="uk-grid">
                <div class="uk-width-1-1 modal-input uk-margin-top">
                  <div class="uk-position-relative">
                    <i class="icon-user uk-form-icon"></i>
                    <input class="uk-input" type="text" placeholder="Ваше имя:" v-model="inputs.name">
                  </div>
                </div>
                <div class="uk-width-1-1 modal-input uk-margin-small-top">
                  <div class="uk-position-relative">
                    <i class="icon-smartphone uk-form-icon"></i>
                    <input class="uk-input" type="text" placeholder="Ваш телефон:" v-model="inputs.phone">
                  </div>
                </div>
              </div>
              <div class="politica">
                Отправляя заявку, вы соглашаетесь на обработку
                <a :href="politika" target="_blank">персональных данных</a>
              </div>
              <div class="uk-flex uk-flex-between uk-flex-middle uk-width-1-1">
                <div class="">
                  <button class="btn btn__tpl1 btn__green fr uk-text-lowercase">{{settings.modalButton ? settings.modalButton : 'отправить' }}</button>
                </div>
                <div class="fs14">
                  <a href="https://xn-----jlcbchdieebnt6ad8da5v.xn--p1ai/" target="_blank">коттеджи-для-жизни.рф</a>
                </div>
              </div>
            </form>
          </div>

        </div>

        <div class="uk-cover-container uk-position-relative">
          <video
            autoplay="true"
            loop="true"
            preload="auto"
            muted="true"
            controlslist="nodownload"
            src="/video/vistavka.mp4"
            class="uk-position-absolute uk-width-1-1 uk-height-1-1 z-index-100"
            ref="video"
            style="border: none; outline: 0"
            id="video"
            v-if="accessVideo"

            >
          </video>
          <img :src="settings.img ? settings.img : ''" alt="" @click="" uk-cover>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Form from '@/mixins/Form.js'

  export default {
      mixins: [Form ],
    data() {
      return {
        display: 0,
        settings: {
          img: 'https://cdn.vevanta.com/sk/2_Gegf.jpg',
        },
        title: 'Выгодные предложения и скидки ждут вас на выставке "Коттеджи для жизни" 09.10.2021.',
        caption: 'Регистрация продолжается!',
        accessVideo: false,
      }
    },
    props: {
      politika: {
        type: String,
        default: '/wp-content/themes/agentstvo/public/politika.pdf'
      },
    },
    created() {
      if (window.innerWidth >= 740) {
        this.accessVideo = true;
      }

      let display = this._getCookie('cont_fixed')
      if (display != '0') {
        this.display = 1
      }

      this.dataRequest.staffId = 3384
      this.dataRequest.sourceId = 71
    },

    mounted() {
     this.modalWindow = this.$refs.modalCont
    if (this.display) {
      UIkit.modal(this.$refs.modalCont).show();
      this.$refs.video.play()
     }
    },

    methods: {
      close(target = null) {
        if (target.tagName == 'div' || target.tagName == 'svg') {
          if (target.id == 'modal-cont' || target.id == 'close' || target.tagName == 'svg') {
            this.display = 0,
            document.cookie = "cont_fixed=0; max-age=10800"
            UIkit.modal(this.$refs.modalCont).hide();
          }
        } else {
          this.display = 0,
          document.cookie = "cont_fixed=0; max-age=10800"
          UIkit.modal(this.$refs.modalCont).hide();
        }
      },

      _getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
    },
  }
</script>

<style>
  .ribbon {
    background: #f1f1f1;
    border-top: 1px solid #f1f1f1;
    padding: 10px;
    z-index: 10000;
  }

  .cont__close {
    position: absolute;
    top: -25px;
    background: #f1f1f1;
    border-radius: 50%;
    padding: 7px;
    right: 5px;

  }

  #video {
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    z-index: 200;
  }
</style>
