<template>
  <div class="container__form uk-box-shadow-medium uk-background-default">
    <div class="uk-grid uk-grid-small uk-margin-top uk-margin-bottom">
      <div class="uk-width-3-4@l">
        <div class="fnt-bld fs26@l fs22@m fs20">
            {{ title }}
        </div>
        <div class="line uk-margin-top"></div>
        <div class="uk-margin-top">
          Нет времени заглянуть в наш офис? Не беда!<br/>
          Наши специалисты ответят на все ваши вопросы и подберут для вас лучший<br/>
          вариант дома по видео-связи в любое удобное для вас время.
        </div>
        <div class="fnt-bld fs22@m fs18 uk-margin-top">
          С кем хотите пообщаться?
        </div>

        <div uk-slider ref="sliderPersonal">
        <div class="uk-position-relative uk-margin-top" tabindex="-1">
          <ul class="uk-slider-items uk-child-width-1-1 uk-grid uk-child-width-1-3@s uk-text-center">
              <li v-for="(item, index) in personal" :key="index"  @click="selectPersonalIndex = index">
                <div class="uk-grid uk-grid-small uk-flex-middle uk-text-left cr-pointer">
                  <div class="uk-width-auto cr-pointer show-animation">
                    <img :src="item.photo" class="uk-border-circle avatar" :class="{'select-avatar': selectPersonalIndex === index ? 'true' : false}">
                  </div>
                  <div class="uk-width-expand">
                    <div class="cl-black fnt-semi uk-margin-small-top">
                      {{ item.name }}
                    </div>
                    <div class="uk-text-muted fs14">
                      {{ item.job }}
                    </div>

                    <div class="uk-grid uk-grid-collapse social-msg uk-margin-small-top uk-hidden@s">
                      <div class="uk-margin-small-right">
                        <a href="https://t.me/AntonovBro">
                          <img src="https://cdn.vevanta.com/sk/4.png" alt="">
                        </a>
                      </div>
                      <div class="uk-margin-small-right">
                        <a href="https://wa.me/79323212510?text=Здравствуйте%2C+у+меня+есть+вопрос">
                          <img src="https://cdn.vevanta.com/sk/whatsapp.png" alt="">
                        </a>
                      </div>
                      <div class="">
                        <a href="viber://chat?number=79323212510">
                          <img src="https://cdn.vevanta.com/sk/viber.png" alt="">
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </li>
          </ul>

          <div class="slider__route uk-flex uk-flex-between uk-visible@s">
            <div class="">
                <a href="#" uk-slidenav-previous uk-slider-item="previous"></a>
            </div>
            <div class="">
              <a href="#"  uk-slidenav-next uk-slider-item="next"></a>
            </div>

          </div>
        </div>

        <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin-small-top uk-margin-small-bottom"></ul>

        </div>

        <form @submit.prevent="send">
          <div class="uk-grid uk-grid-small uk-child-width-1-2">
            <div class="uk-margin-small-bottom">
              <div class="uk-position-relative">
                <i class="icon-user uk-form-icon"></i>
                <input type="text" placeholder="Имя:" class="uk-input" v-model="inputs.name">
              </div>
            </div>
            <div class="uk-margin-small-bottom">
              <div class="uk-position-relative">
                <i class="icon-smartphone uk-form-icon"></i>
                <input type="text" placeholder="Телефон:" class="uk-input fs14 fs16@m" v-model="inputs.phone">
              </div>
            </div>
            <div class="uk-width-1-1 uk-width-1-3@m">
              <div class="politica">
                Отправляя заявку, вы соглашаетесь на обработку
                <a :href="politika" target="_blank">персональных данных</a>
              </div>
            </div>

            <div class="uk-width-expand@m uk-grid uk-grid-small uk-flex-right uk-flex-middle">
              <div class="uk-grid uk-grid-collapse social-msg uk-visible@s">
                <div class="uk-margin-small-right">
                  <a href="https://t.me/AntonovBro  ">
                    <img src="https://cdn.vevanta.com/sk/4.png" alt="">
                  </a>
                </div>
                <div class="uk-margin-small-right">
                  <a href="https://wa.me/79323212510?text=Здравствуйте%2C+у+меня+есть+вопрос">
                    <img src="https://cdn.vevanta.com/sk/whatsapp.png" alt="">
                  </a>
                </div>
                <div class="">
                  <a href="viber://chat?number=79323212510">
                    <img src="https://cdn.vevanta.com/sk/viber.png" alt="">
                  </a>
                </div>
              </div>
              <div class="uk-width-1-1 uk-width-auto@s">
                <button class="btn btn__tpl1 btn__green">
                  получить консультацию
                </button>
              </div>
            </div>
          </div>
          </form>
      </div>
      <div class="uk-width-expand uk-position-relative uk-visible@l">
        <img class="bg__form" src="https://cdn.vevanta.com/sk/anastasia_IXrE.jpg" alt="">
      </div>
    </div>

  </div>
</template>


<script>
  import Form from '@/mixins/Form'
  import Uikit from 'uikit'
  export default {
    mixins: [ Form ],
    data() {
      return {
        selectPersonalIndex: '',
        title: 'Видео-встреча со специалистами Веванта',
        personal: [
          {
            name: 'Марина Михно',
            job: 'Специалист ипотечного кредитования',
            photo: 'https://cdn.vevanta.com/sk/broker_08N5.jpg',
          },
          {
            name: 'Анастасия Анохина',
            job: 'Специалист отдела продаж',
            photo: 'https://cdn.vevanta.com/sk/anohina_nReD.jpg',
          },
          {
            name: 'Юрий Ахмадышин',
            job: 'Специалист отдела продаж',
            photo: 'https://cdn.vevanta.com/sk/urii_zgBU.jpg'
          },
          {
            name: 'Филипп Удовица',
            job: 'Специалист отдела продаж',
            photo: 'https://cdn.vevanta.com/sk/filipp_ZzfK.jpg'
          },
          {
            name: 'Владимир Олейников',
            job: 'Специалист отдела продаж',
            photo: 'https://cdn.vevanta.com/sk/vladimir_TEA5.jpg'
          },
          {
            name: 'Анна Никишина',
            job: 'Специалист отдела продаж',
            photo: 'https://cdn.vevanta.com/sk/anna_xfNK.jpg'
          },
        ]
      }
    },

    created() {
      this.personal = this.personal.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    },
    mounted() {
      this.$refs.sliderPersonal.addEventListener('itemshow', e => {
        this.selectPersonalIndex = e.detail[0].index
      })
    },

    methods: {
      send() {
        this.formName = `${this.title}: ${this.personal[this.selectPersonalIndex].name}`
        this.sendForm()
      }
    }
  }
</script>
<style scoped>
  @media (max-width: 640px) {
    .social-msg img {
      max-width: 25px
    }
  }

  .line {
    background: #59bbb6;
    height: 4px;
    width: 100px;
  }

  .avatar {
    border: 3px solid #e2e2e2
  }

  .select-avatar {
    border-color: #59bbb6;
  }

  .bg__form {
    position: absolute;
    right: -112px;
    top: 40px;
    max-width: initial;
    border-radius: 50%;
  }

  .container__form {
    overflow-x: hidden;
    padding: 15px 20px;
  }

  @media (min-width: 640px) {
    .form__wrapper-input {
      margin-top: 15px;
    }
  }
</style>
