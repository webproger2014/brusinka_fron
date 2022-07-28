<template>
  <div>

    <div class="uk-overflow-hidden an" ref="container" :style="{'max-height': `${h}${prefix}`}">
      <div ref="slt">
        <slot></slot>
      </div>
    </div>


    <div class="uk-text-center">
      <div class="fs24">...</div>
      <div class="cl-dark btn__dot uk-width-auto uk-display-inline-block cr-pointer fs14" @click="more">
        подробнее
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    name: 'textOverflow',
    props: {
      height: {
        default: 300
      },
      elem: {
        default: ''
      }
    },
    data() {
      return {
        clientH: 0,
        toggle: false,
        h: 0,
        prefix: 'px',
        showMore: false,
      }
    },

    created() {
      this.h = this.height
    },
    mounted() {
      this.clientRect = this.$refs.container.getBoundingClientRect()
      this.clientH = this.$refs.slt.clientHeight
      this.$refs.container.addEventListener('transitionend', () => {
        if (this.h === this.$refs.slt.clientHeight) {
          this.h = 'auto';
        }
      })
    },
    updated() {
        this.clientH = this.$refs.slt.clientHeight
    },
    methods: {
      more() {
        if (this.h !== 'auto' || this.h === '')  {
          this.h = this.$refs.slt.clientHeight;
          this.prefix = 'px'
        } else if (this.h === 'auto') {
          this.h = this.$refs.slt.clientHeight;
          this.prefix = 'px'
          window.getComputedStyle(this.$refs.container).getPropertyValue("height");
          this.h = this.height

          let elem = this.$refs.container
          let clientRect = this.$refs.container.getBoundingClientRect()
          if (this.elem) {
            elem = document.getElementById(this.elem)
          }

          if (clientRect.top < 0) {
            window.scrollTo({
              top: elem.offsetTop - 52
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

  .an {
    transition: 0.3s;
    display: inline-block;
  }
</style>
