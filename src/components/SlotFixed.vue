<template>
  <div ref="bunner">
    <div :class="[stateFixed ? classFixedEnableContainer : '', classContainer]" ref="bunnerWrapper">
      <slot></slot>
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
        return ['uk-background-default']
      }
    },
    classSection: {
      default: () => {
        return []
      }
    },
  },

  data() {
    return {
      stateFixed: false,
      containerHeight: 0,
    }
  },

  mounted() {
    const CLIENT_RECT = this.$refs.bunner.getBoundingClientRect()
    this.containerHeight = CLIENT_RECT.height;

    window.addEventListener('scroll', () => {
      this.stickBunner()
    })
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
        document.body.style.paddingBottom = `${this.$refs.bunnerWrapper.offsetHeight}px`
      } else {
       this.stateFixed = false
       document.body.style.paddingBottom = 0
      }
    }
  }
}
</script>
