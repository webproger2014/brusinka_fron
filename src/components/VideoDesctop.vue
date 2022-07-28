<template>
  <div v-if="access">
    <video
      height="100%"
      autoplay="" loop="" muted="" :src="src"
      uk-cover
      >
    </video>
  </div>
</template>

<script>
  export default {
    name: 'video-desctop',
    data() {
      return {
        access: false,
      }
    },

    props: {
      src: {
        default: '',
        type: String
      }
    },

    created() {
      if (window.innerWidth >= 1200) {
        this.access = true
      }
    }
  }
</script>
