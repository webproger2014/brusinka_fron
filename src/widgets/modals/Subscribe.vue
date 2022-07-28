<template>
  <div class="">
    <div id="modal-subscribe" ref="subscribe" uk-modal>
        <div class="uk-modal-body brd14 uk-modal-dialog uk-padding-remove uk-width-1-1" style="max-width: 450px !important;">
          <div class="modal-subscribe__wrapper">
            <div class="close" @click="hideModal('subscribe')">
              <i class="icon-close cl-wh cr-pointer"></i>
            </div>
            <div class="uk-width-1-1 subscribe__bg brdlt14 brdrt14 uk-background-cover uk-background-norepeat" style="background-image: url(https://cdn.vevanta.com/sk/8_2HkE.jpg?w=400)">

            </div>

            <div class="uk-padding-small">
              <div class="fnt-bld fs22@m">
                ​Подпишитесь и узнавайте первыми:
              </div>
              <div class="list_subscribe uk-margin-top">
                <div class="uk-margin-small-top fnt-med">
                  <span class="list_subscribe__punkt uk-border-circle"></span>
                  <span class="uk-margin-small-left fs18@m fs14">О специальных предложениях</span>
                </div>
                <div class="uk-margin-small-top fnt-med">
                  <span class="list_subscribe__punkt uk-border-circle"></span>
                  <span class="uk-margin-small-left fs18@m fs14">О новых проектах</span>
                </div>
                <div class="uk-margin-small-top fnt-med">
                  <span class="list_subscribe__punkt uk-border-circle"></span>
                  <span class="uk-margin-small-left fs18@m fs14">О готовых домах и ценах</span>
                </div>
              </div>

              <form class="form-subscribe uk-margin-top uk-grid uk-grid-collapse" @submit.prevent="send">
                <div class="uk-width-expand">
                  <div class="form-subscribe_inp  brdlb14 brdlt14">
                    <input class="uk-input" type="text" placeholder="E-mail:" v-model="email">
                  </div>

                </div>
                <div class="">
                  <button type="submit" class="btn btn__green brdrb14 brdrt14 fnt-bld uk-flex uk-flex-middle uk-text-uppercase fs16@m fs12">
                    подписаться
                  </button>
                </div>
                <div class="fs12 uk-margin-small-top">
                  Отправляя заявку, вы соглашаетесь на обработку <a href="https://vevanta.com/wp-content/themes/agentstvo/public/politika.pdf" target="_blank">персональных данных</a>
                </div>
              </form>
            </div>

          </div>

        </div>
    </div>

    <div id="modal-subscribe-success" ref="modalSubscribeSuccess" uk-modal>
      <div class="uk-modal-body brd14 uk-modal-dialog uk-padding-remove uk-width-1-1" style="max-width: 450px !important;">
        <div class="modal-subscribe__wrapper">
          <div class="close" @click="hideModal('modalSubscribeSuccess')">
            <i class="icon-close cl-wh cr-pointer"></i>
          </div>
          <div class="uk-width-1-1 subscribe__bg brdlt14 brdrt14 uk-background-cover uk-background-norepeat" style="background-image: url(https://cdn.vevanta.ru/photo/facades/367/99bef030f1eb6fc25ea05f5cf65ea7c8_400.jpg)">

          </div>

          <div class="uk-padding-small">
            <div class="fnt-bld fs22@m">
              Спасибо за подписку! Ваш бонус:
            </div>
            <div class="list_subscribe uk-margin-top">
              <div class="uk-margin-small-top fnt-med">
                <span class="list_subscribe__punkt uk-border-circle"></span>
                <a href="/podborka-proektov" class="uk-margin-small-left fs18@m fs14">ТОП 5 проектов строительного сезона 2022</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        email: '',
        tokenInfo: '',
        dt: [],
        statusRequest: 1
      }
    },

    created() {
      this.$axios.post('https://api.sendpulse.com/oauth/access_token', {
        grant_type:"client_credentials",
        client_id:"ec8da0f4cfa31c5c487d2d83837a5f9d",
        client_secret:"9bf87e034bfc16ae72652c45981bfcac"
      }).then(rs => {
        this.tokenInfo = rs.data
      })

      this.$axios.post('https://api.vevanta.ru/v1/portfolio/get_all_portfolios', {
        id: 137,
        type: 'project_id',
        offset: 1
      })
      .then(rs => this.dt = rs.data)
    },

    mounted() {
      let subscribe = localStorage.getItem('modal_subscribe') // Отправлено
      let subscribe_time = this.$cookies.get('modal_subscribe_time') // Показано

      if (!subscribe && !subscribe_time) {
        setTimeout(() => {
          let modalDef = this.$parent.$refs.modalDefault.$el

          if (modalDef.classList.contains('uk-open')) {
            return false
          }

          UIkit.modal(this.$refs.subscribe).show();
          this.$cookies.set('modal_subscribe_time', 1, 60 * 60 * 24)
        }, 1000 * 30)
      }
    },

    methods: {
      send() {
        if (!this.email) {
          return
        }

        if (!this.statusRequest) {
          return 0
        }
        this.statusRequest = 0;
        //> CLIENT GOOGLE ID
        let _ga = this.$cookies.get('_ga')
        let _ym_uid = this.$cookies.get('_ym_uid')

        //История просмотра посещения страниц
        let ref = localStorage.getItem('referrer')
        if (ref) {
          ref = JSON.parse(ref)
        } else {
          ref = []
        }

        let url = new URLSearchParams(location.search)

        let utm = {
          utmSource: url.get('utm_source'),
          utmMedium: url.get('utm_medium'),
          utmCampaign: url.get('utm_campaign'),
          utmTerm: url.get('utm_term'),
          utmContent: url.get('utm_content'),
        }


        this.$axios.post('https://api.vevanta.com/api/lead/add', {
          email: this.email,
          form: 'Подписаться на рассылку',
          msg: '',
          refer: ref,
          url: location.href,
          utm_source: url.get('utm_source'),
          utm_medium: url.get('utm_medium'),
          utm_campaign: url.get('utm_campaign'),
          utm_term: url.get('utm_term'),
          utm_content: url.get('utm_content'),
          origin: 1,
           _ga,
          _ym_uid,
          roistat_visit: this.$cookies.get('roistat_visit')
        }).then(rs => {
          localStorage.setItem('modal_subscribe', 1, )
          this.hideModal();
          setTimeout(() => {
            UIkit.modal(this.$refs.modalSubscribeSuccess).show();
            setTimeout(() => {
          //    UIkit.modal(this.$refs.modalSubscribeSuccess).hide();
            }, 3000)
          }, 300)
        })

        this.$axios.post('https://api.sendpulse.com/addressbooks/89379908/emails', {
          emails: [this.email]
        }, {
          headers: {
            'Authorization': `Bearer ${this.tokenInfo.access_token}`
          }
        })

        this.statusRequest = 1
      },

      hideModal(modal) {
        UIkit.modal(this.$refs[modal]).hide();
      }
    },
  }
</script>

<style scoped>

.close {
  position: absolute;
  right: -18px;
  top: -18px;
}

.form-subscribe {
  padding: 0 16px
}

.form-subscribe input{
  background: transparent;
  border: none !important;
  outline: 0 !important;
  height: 50px
}


.form-subscribe_inp {
  background: #e3e3e3;
}

.form-subscribe .btn {
  padding: 0 17px;
  height: 50px
}

.list_subscribe__punkt {
  width: 10px;
  height: 10px;
  display: inline-block;
  background: #00bab6;
}
.brd14 {
  border-radius: 14px;
}

.brdlt14 {
  border-top-left-radius: 14px;
}
.brdlb14 {
  border-bottom-left-radius: 14px;
}
.brdrt14 {
  border-top-right-radius: 14px;
}
.brdrb14 {
  border-bottom-right-radius: 14px;
}

  .modal-subscribe__wrapper {

  }

  .subscribe__bg {
    height: 240px;
background-image: linear-gradient(to right top, #584890, #2569b0, #0087bf, #00a2bf, #00bab6);
  }

  @media (max-width: 640px) {
    .close {
      top: 5px;
      right: 5px
    }
  }
</style>
