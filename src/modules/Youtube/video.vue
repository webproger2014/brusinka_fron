<template>
  <div class="uk-grid uk-grid-small uk-text-center uk-child-width-1-3@m uk-child-width-1-2@s">
    <div class="uk-margin-bottom" v-for="(item, i) in items" :key="i">

      <div class="uk-position-relative cr-pointer show-animation uk-width-auto" @click="item.status = 1">
        <div v-if="item.status">
          <iframe class="uk-position-absolute uk-position-left uk-height-1-1 uk-width-1-1" :src="`https://www.youtube.com/embed/${item.id}?autoplay=1&`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <template>
          <div class="uk-position-center" v-show="!item.status">
            <img class="start-video" src="https://cdn.vevanta.com/sk/youtube_icon.png" alt="">
          </div>
          <img :src="`//img.youtube.com/vi/${item.id}/hqdefault.jpg`" width="480" height="360">
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      sources: {
        default: [],
      }
    },

    data() {
      return {
        items: [],
      }
    },

    created() {
      this.items = this.sources
    }
  }
</script>

<style scoped>
  .start-video {
    max-width: 60px
  }
</style>
