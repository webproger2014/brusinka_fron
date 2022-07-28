<template>
  <div class="">
    <div class="uk-position-fixed uk-position-bottom" id="bunner" v-if="showBunner">
      <div class="uk-visible@l">
        <div class="uk-container bunner_wrap uk-position-relative uk-background-default">
          <div class="uk-position-absolute close_cont uk-flex uk-flex-center uk-flex-middle cr-pointer show-transition" @click="closeBunner">
            <i class="icon-close"></i>
          </div>
          <div class="fs20 fnt-bld">
            Запишись на лучшую выставку по строительству 2021 года!
          </div>
          <div class="uk-grid uk-margin-small-top uk-flex-middlew">
            <div class="uk-width-1-2@l uk-width-expand">
              <div class="uk-position-relative"><i class="icon-email uk-form-icon"></i>
                <input type="text" placeholder="Ваш email:" class="uk-input" v-model="inputs.email">
              </div>
            </div>
            <div class="uk-width-auto">
              <button class="btn btn__tpl1 btn__green" @click="send">отправить</button>
            </div>
            <div class="uk-width-1-3@l uk-width-1-1 politic">
              Нажимая кнопку “Отправить”, вы даете согласие на <a href="/wp-content/themes/agentstvo/public/politika.pdf" target="_blank">обработку своих персональных данных</a>.
            </div>
          </div>
        </div>
      </div>
      <div class="uk-hidden@l">
        <div class="bunner-mob" @click="openModal">
          <div class="uk-grid uk-grid-small">
            <div class="uk-width-expand fs12 fnt-bld">
              Запишись на лучшую выставку<br/>
              по строительству 2021 года.
            </div>
            <div>
              <div class="btn__dot__wh fs12 fnt-med">
                Подробнее
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <modal-bunner ref="ModalBunner" v-on:exit-bunner="exitBunner"/>
    </div>
  </div>

</template>

<script>
  import Form from '@/mixins/Form'
  import ModalBunner from './ModalBunner'

  export default {
    mixins: [Form],
    components: {
      ModalBunner
    },
    data() {
      return {
        showBunner: false
      }
    },
    created() {
      let bunnerStatus = localStorage.getItem('bunner_status');

      if (!bunnerStatus) {
        this.showBunner = true
      }

    //  this.dataRequest.staffId = 3384
    // this.dataRequest.sourceId = 71
    },
    methods: {
      closeBunner() {
        this.showBunner = false
      },

      send() {
        if (this.sendForm()) {
          this.exitBunner()
        }
      },

      exitBunner() {
        this.showBunner = false
        localStorage.setItem('bunner_status', '1')
      },

      openModal() {
        let lead = {
          formName: 'E-mail подписка',
        }

        this.$refs.ModalBunner.openModal(lead, {})
      }
    }
  }
</script>


<style media="screen" scoped>
  #bunner {
    bottom: 15px;
    z-index: 10000;
  }

  .bunner_wrap {
    box-shadow: 0px 4px 8px rgb(46 58 76 / 15%);
    padding: 10px 20px 10px 20px;
  }

  .close_cont {
    height: 40px;
    width: 40px;
    background: #ececec;
    border-radius: 50%;
    right: -15px;
    top: -11px;
    box-shadow: 0px 4px 8px rgb(198 216 215);
  }

  .bunner-mob {
    background: #00bab6;
    border-radius: 36px;
    padding: 8px 9px 7px 14px;
    max-width: 309px;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 45px;
  }

  @media (max-width: 1200px) {
    .close_cont {
      right: 10px;
    }
  }

  @media (max-width: 960px) {
    .politic {
      margin-top: 10px;
    }
  }
</style>
