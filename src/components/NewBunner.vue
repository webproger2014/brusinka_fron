<template>
  <div class="">
    <div ref="bunner">
      <div :class="[stateFixed ? classFixedEnableContainer : '', classContainer]" ref="bunnerWrapper">
        <div class="uk-container">
          <div class="uk-grid uk-grid-collapse uk-width-auto">
            <div class="uk-grid uk-flex-middle">
              <div class="uk-width-small avatar">
                <img class="uk-border-circle" :src="avatar" alt="">
              </div>
              <div>
                <div class="fnt-bld fs18@m fs20@l">{{ title }}</div>
                <div class="uk-margin-small-top uk-visible@m uk-width-large">{{ desc }}</div>
              </div>
            </div>
            <div class="uk-flex uk-width-expand uk-flex-right uk-flex-middle">
              <div>
                <button-modal :name="buttonName" v-if="buttonType === 'btn'"></button-modal>
                <a v-else :href="url" target="_blank" class="btn btn__tpl1 btn__green">{{ buttonName }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonModal from '@/widgets/buttons/ButtonModal'
export default {
  components: {
    ButtonModal,
  },
  props: {
    classContainer: {
      default: () => {
        return ['uk-background-default uk-padding-small']
      }
    },
    classSection: {
      default: () => {
        return ['uk-margin-top']
      }
    },
    avatar: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: 'заказать звонок',
    },
    buttonType: {
      type: String,
      default: 'btn'
    },
    url: {
      type: String,
      default: '#'
    },
    fixed: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      stateFixed: false,
      containerHeight: 0,
    }
  },

  mounted() {
    if (this.fixed) {
      const CLIENT_RECT = this.$refs.bunner.getBoundingClientRect()
      this.containerHeight = CLIENT_RECT.height;
      window.addEventListener('scroll', (e) => {
        this.stickBunner()
      })
    }

  },

  computed: {
    classFixedEnableContainer() {
      return [
        'uk-position-bottom',
        'uk-position-fixed',
        'uk-box-shadow-small',
        'z-index-100'
      ]
    },
  },

  methods: {
    stickBunner() {
      const CLIENT_RECT = this.$refs.bunner.getBoundingClientRect()
      const STICK = CLIENT_RECT.height === 0 ? window.innerHeight - this.containerHeight : window.innerHeight

      const SPACING = CLIENT_RECT.bottom - STICK

      if (SPACING <= 0) {
        this.stateFixed = true
      } else {
       this.stateFixed = false
      }
    }
  }
}
</script>

<style media="screen">
  @media screen and (max-width: 960px) {
    .avatar {
      max-width: 90px;
    }
  }
</style>
