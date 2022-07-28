<template>
  <div>
    <div class="uk-grid uk-grid-small">
      <div
        v-for="(item, i) in settingsGallery.photos"
        :key="item"
        :class="[getItemIndex(i), 'uk-margin-bottom cr-pointer show-animation uk-text-center']"
        >
        <img @click="showPhotoSwipe(i)" :src="item.large" alt="">
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

    getItemIndex(i) {
      let settings = ''

        if (this.settingsGallery.photos.length == 1) {
          settings = 'uk-width-1-1'
        }

        if (this.settingsGallery.photos.length % 2 == 0) {
         settings = 'uk-width-1-2@m'
        }

        if (this.settingsGallery.photos.length % 2 == 0 && ((i === 2)||(i === 5))) {
         settings = 'uk-width-1-1'
        }

        if (this.settingsGallery.photos.length % 3 == 0) {
         settings = 'uk-width-1-3@m'
        }

        if (this.settingsGallery.photos.length % 4 == 0) {
         settings = 'uk-width-1-2@m'
        }

         if (this.settingsGallery.photos.length % 4 == 0 && ((i === 2)||(i === 3))) {
          settings = 'uk-width-1-2@m'
        }

        if (this.settingsGallery.photos.length % 5 == 0) {
         settings = 'uk-width-1-2@m'
        }

        if (this.settingsGallery.photos.length % 5 == 0 && i === 2) {
         settings = 'uk-width-1-1'
        }

      return settings;
    }
  },
}
</script>
