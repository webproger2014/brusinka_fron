<template>
  <div>
    <div :class="`uk-grid uk-grid-small uk-child-width-1-${col/2}@s uk-child-width-1-${col}@m`">
      <div
        v-for="(item, i) in settingsGallery.photos"
        :key="item"
        class="uk-margin-bottom cr-pointer show-animation uk-text-center"
        >
        <img @click="showPhotoSwipe(i)" :src="item.medium" :alt="item.alt" :title="item.attachment">
        <div class="fs14 uk-margin-small-top">{{item.caption}}</div>
      </div>
    </div>

    <v-photoswipe :isOpen="isOpen" :items="settingsGallery.photos" :options="options" @close="hidePhotoSwipe"></v-photoswipe>
  </div>
</template>

<script>
import { PhotoSwipe } from 'v-photoswipe'

export default {
  data(){
    return{
      isOpen: false,
      options: {
        index: 3
      },
    }
  },
   components: {
    'v-photoswipe': PhotoSwipe,
  },

  props: {
    col: {
      default: '1'
    },
    settingsGallery: {
      default: () => {
        return {
          photos: '',
        }
      }
    },
  },

  methods: {
    showPhotoSwipe (index) {
      this.isOpen = true
      this.$set(this.options, 'index', index)
    },
    hidePhotoSwipe () {
      this.isOpen = false
    },

  },
}
</script>
