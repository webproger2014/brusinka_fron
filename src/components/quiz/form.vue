<template>


          <div class="body__title uk-flex">
            <div class="uk-margin-auto-vertical uk-margin-auto" v-show="statusSend === 1">
              <div class="fs18 fnt-bld">
                Ваша заявка успешно отправлена!
              </div>
            </div>
              <div class="uk-margin-auto-vertical uk-margin-auto" v-show="statusSend == 0">
                <div class="fs14 uk-text-italic">
                  По вашим параметрам найдено 10 проектов домов. Заполните форму, чтобы получить результаты
                </div>
                <div class="">
                  <form class="uk-grid uk-grid-small uk-flex-column uk-flex-middle" @submit.prevent>
                    <div class="uk-width-large@m  uk-margin-small-top">
                      <!-- <div class="uk-position-relative">
                        <span class="uk-form-icon">
                          <i aria-hidden="true" role="presentation" class="icon__color material-icons">person</i>
                        </span>
                        <input class="uk-input"
                        type="text"
                        placeholder="Ваше имя"
                        v-model="name"
                        >
                      </div> -->
                    </div>
                    <div class="uk-width-large@m uk-margin-small-top">
                      <div class="uk-position-relative">
                        <span class="uk-form-icon">
                          <i aria-hidden="true" role="presentation" class="icon__color material-icons">phone</i>
                        </span>

                        <input class="uk-input"
                        type="tel"
                        placeholder="Телефон"
                        v-model="tel"
                        >
                      </div>
                    </div>
                    <div class="uk-width-large@m">
                      <button class="btn__form uk-margin-small-top uk-width-1-1 cr-pointer"
                      type="button"
                      name="button"
                      @click="getData"
                      >
                        <span class="cl-wh uk-text-uppercase uk-text-bolder">Получить результаты</span>
                      </button>
                    </div>

                  </form>
                  <div class="">
                    <input class="uk-checkbox"
                    type="checkbox"
                    value="1"
                    v-model="checks">
                    <a class="text-caption uk-text-italic uk-text-top uk-margin-small-left" href="/politika-konfidencialnosti">С политикой конфиденциальности</a>
                    <span class="text-caption uk-text-italic uk-text-top"> ознакомлен(а)</span>
                  </div>
                </div>
              </div>
            </div>

</template>

<script>



  export default {
  props: ['urlform', 'list', 'keyslist'],

    data() {
      return {
        step: '',
        numberSlide: 1,
        checks: [1],
        tel: '',
        name: '',
        statusSend: 0,
      }
    },


    methods: {
      getData() {
        if (!this.checks.length) {
          return '';
        }

        let phone = this.tel.replace(/[^+\d]/g, '')

        if (!phone){
          return '';
        }

        let msg = '';


        this.keyslist.forEach(item => {
          if (Array.isArray(this.list[item].checked)) {
            msg += `Вопрос: ${this.list[item].name} \n`;
            this.list[item].checked.forEach(elem => {
              msg += `Ответ: ${this.list[item].answer[elem].value} \n`;
            });

          } else {
            msg += `Вопрос: ${this.list[item].name} \n`;
            msg += `Ответ: ${this.list[item].answer[this.list[item].checked].value} \n`;
          }
        });

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
         phone: this.tel,
         form: 'Квиз',
         msg,
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
         ym(Ya._metrika.getCounters()[0].id,'reachGoal','vevanta-quiz')
       }

       this.$axios.post('mail/vevanta', {
         email: '',
         comment: '',
         name: '',
         phone,
         form: 'Квиз',
         msg,
         url: location.href,
         roistat_visit,
         staffId: 3702,
         sourceId: 83,
         company: 1948,
         utm
       })

       this.statusSend = 1
      }
     }
    }

</script>


<style scoped>

.widget__cont {
  background: #525858;
  overflow-y: auto;

}

.body__title {
  height: 400px;
  animation-duration: 1.2s;
  animation-name: slidein;
}

.modal {
  height: 100%;
  border-radius: 5px;
  padding: 15px;
  min-width: 400px;
}

a {
  color: #a8682f;
  text-decoration: underline !important;
}

svg {
  width: 20px;
  height: 20px;
  fill: #525858;
}

.text-caption {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.03333em;
}

.icon__color {
  color: #a5a5a5;
  position: absolute;
}

.input {
  position: relative;
    outline:0;
}


.btn__form{
  background: #7e2d44;
  border: none;
  height: 40px;
}

.btn__form:hover {
  background-color: #6b263a;
  transition: 0.5s;
}

.header__icon {
  color: #a8682f;
}



@media (max-width: 640px) {
  form {
    padding-right: 10px
  }
}
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

</style>
