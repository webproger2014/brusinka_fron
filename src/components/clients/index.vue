<template>

  <div class="uk-visible@m">
    <div class="uk-position-fixed clients-container uk-position-center-right z-index-1000" :class="{not: !state}">
      <div :style="styleContainer">
        <div class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer" :class="{'uk-flex-center uk-text-center': !state}" @click="openWidget(1)">
          <quiz :state="state" />
        </div>
        <div class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer" :class="{'uk-flex-center uk-text-center': !state}" @click="openWidget(2)">
          <call :state="state" />
        </div>
        <div class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer" :class="{'uk-flex-center uk-text-center': !state}" @click="openSource">
          <source-redirect :state="state"/>
        </div>
      </div>
      <div class="uk-grid uk-grid-collapse uk-flex-right fs14 cr-pointer">
        <div class="uk-width-auto uk-padding-small toggle-show" @click="toggleClients" v-show="state">
          Свернуть
        </div>
        <div class="uk-width-auto uk-padding-small toggle-show" @click="toggleClients" v-show="!state">
          Раскрыть
        </div>
      </div>
    </div>
    <div ref="modalWidget" uk-modal class="uk-modal-container">
      <div class="uk-modal-dialog uk-margin-auto-vertical">
        <div class="uk-grid uk-height-1-1">
          <div class="uk-visible@m">
            <div class="clients-containers uk-height-1-1" :style="styleContainerWidgetModal">
              <div
                class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer uk-position-relative"
                :class="{'active-item-tpl triangle': stepWidget === 1, 'greey-item-tpl': stepWidget !== 1}"
                @click="setStep(1)"
                >
                <quiz :state="1"/>
              </div>
              <div
                class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer uk-position-relative"
                :class="{'active-item-tpl triangle': stepWidget === 2, 'greey-item-tpl': stepWidget !== 2}"
                @click="setStep(2)"
                >
                <call :state="1"/>
              </div>
              <div
                class="clients-item uk-flex uk-flex-middle uk-padding-small cr-pointer uk-positon-relative"
                :class="{'active-item-tpl triangle': stepWidget === 3, 'greey-item-tpl': stepWidget !== 3}"
                @click="openSource"
                >
                <source-redirect :state="1"/>
              </div>
            </div>
          </div>
          <div class="uk-width-expand clients-content">
            <div v-show="stepWidget === 1">
              <quiz-not-modal :idquiz="idquiz"/>
            </div>
            <div v-if="stepWidget === 2" class="uk-height-1-1">
              <div class="uk-grid uk-flex-middle uk-height-1-1">
                <div v-show="!status">
                  <div class="uk-padding uk-text-center">

                    <div class="fs26@m fnt-bld uk-text-center">
                      Задайте нам вопрос.
                    </div>

                    <div class="uk-margin-top fs22@m">
                      Если у Вас есть вопросы - оставьте свой номер телефона, мы перезвоним в течение 15 минут и ответим на них!
                    </div>
                    <form class="uk-margin-top uk-width-1-1" @submit.prevent="send">
                      <div class="uk-position-relative uk-width-large@m uk-margin-auto">
                        <input type="text" placeholder="Ваш телефон*:" class="uk-input uk-form-large" v-model="phone">
                      </div>
                      <button class="btn uk-margin-top fs18 uk-box-shadow-medium cr-no" type="submit">
                        <span class="uk-text-middle">Получить ответ</span>
                        <i aria-hidden="true" role="img" class="uk-text-middle material-icons q-icon notranslate on-right uk-margin-left">
                          arrow_forward </i>
                      </button>
                    </form>
                    <div class="uk-margin-small-top">
                      <input class="uk-checkbox"
                      type="checkbox"
                      value="1"
                      v-model="checks">
                      <a class="text-caption uk-text-italic uk-text-top uk-margin-small-left" href="/politika-konfidencialnosti">С политикой конфиденциальности</a>
                      <span class="text-caption uk-text-italic uk-text-top"> ознакомлен(а)</span>
                    </div>
                  </div>
                </div>

                <div v-show="status">
                  <div class="fs26@m fnt-bld uk-text-center uk">
                    Заявка успешно отправлена!
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<script>

//import UIkit from 'UIkit'

import call from './types/call'
import quiz from './types/quiz'
import sourceRedirect from './types/source'
import quizNotModal from '../quiz/quizNotModal'

  export default {
    components: {
      call,
      quiz,
      sourceRedirect,
      quizNotModal
    },
    props: ['idquiz'],
    data() {
      return {
        status: 0,
        state: true,
        phone: '',
        stepWidget: '',
        checks: [1],
        styleContainer: {
          'background-color': '#7f2f44',
          'color': '#FFF',
        },
        styleContainerWidgetModal: {
          'background-color': '#e2e7e9'
        }
      }
    },

    mounted() {
    //  UIkit.modal(this.$refs.modalWidget).show();
    },

    methods: {
      //Открывает в модальном окне виджет
      toggleClients() {
        this.state = !this.state
      },

      openWidget(step) {
        this.setStep(step)
        UIkit.modal(this.$refs.modalWidget).show();
      },

      setStep(step) {
        this.stepWidget = step
      },

      openSource() {
        window.open("https://strup.ru/portfolio/", '_blank');
      },

      send() {

        if (!this.checks.length) {
          return
        }

        let phone = this.phone.replace(/[^+\d]/g, '')

        if (!phone){
          return '';
        }

        let msg = '';

        let url = new URLSearchParams(location.search)

        let utm = {
          utmSource: url.get('utm_source'),
          utmMedium: url.get('utm_medium'),
          utmCampaign: url.get('utm_campaign'),
          utmTerm: url.get('utm_term'),
          utmContent: url.get('utm_content'),
        }

        let roistat_visit = this.$cookies.get('roistat_visit')

        //> CLIENT GOOGLE ID
        let _ga = this.$cookies.get('_ga')
        let _ym_uid = this.$cookies.get('_ym_uid')

        if (_ga) {
          _ga = _ga.split('.')
          _ga = `${_ga[2]}.${_ga[3]}`
        }

        this.$axios.post('https://api.vevanta.com/api/lead/add', {
         phone,
         form: 'Виджет: задайте нам вопрос',
         msg: "Виджет: Задайте нам вопрос",
         url: location.href,
         origin: 2,
         utm_source: url.get('utm_source'),
         utm_medium: url.get('utm_medium'),
         utm_campaign: url.get('utm_campaign'),
         utm_term: url.get('utm_term'),
         utm_content: url.get('utm_content'),
         _ga,
        _ym_uid,
        roistat_visit,
       })


       if (typeof Ya == 'object') {
         ym(Ya._metrika.getCounters()[0].id,'reachGoal','vevanta-clients-form')
       }

       this.$axios.post('/mail/vevanta', {
         email: '',
         comment: '',
         name: '',
         phone,
         form: 'clients Квиз',
         msg: "виджет: Задайте нам вопрос",
         url: location.href,
         roistat_visit,
         utm,
         staffId: 3702,
         sourceId: 83,
         company: 1948,
       }).then(rs => {
         this.statusSend = 1
       })

       this.status = 1
      }

    }
  }
</script>



<style>
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons';
.clients-item svg {
  max-width: 30px;
  width: 100%;
  fill: #FFF
}
</style>
<style scoped>
  .active-item-tpl {
    background: #7e2d44;
    color: #FFF
  }

  .greey-item-tpl {
    background: #f0f3f4;
  }

  .greey-item-tpl svg {
    fill: #333 !important
  }

  .toggle-show {
    padding: 8px;
    background: #f0f0f0;
  }

  .triangle::after {
    position: absolute!important;
    z-index: 2!important;
    top: 50%!important;
    left: 100%!important;
    display: block!important;
    margin-top: -9px!important;
    content: ''!important;
    transition: all .15s!important;
    border: 9px solid transparent!important;
    border-left-color: #7e2d44 !important
  }

  .clients-container {
    width: 240px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .clients-container.not {
    width: auto
  }

  .clients-item {
    height: 70px
  }

  .clients-item:not(:last-child) {
    border-bottom: 1px solid #FFF
  }

  .uk-modal-dialog {
    height: 576px
  }

.btn {
  background-color: #7e2d44;
    border: none;
    color: #fff;
    border-radius: 2rem;
    padding: 10px 16px;
}
  @media (max-width: 960px) {
    .clients-content {
      /*padding: 10px */
      padding-left: 40px;
    }
  }
</style>
