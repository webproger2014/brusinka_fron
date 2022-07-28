<template>
  <div>
    <div class="uk-light" uk-slider>
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
        <ul
          class="uk-slider-items uk-grid uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m">
          <li
          v-for="(item, i) in settingsGallery.photos"
          :key="item"
          >
            <img uk-img @click="showPhotoSwipe(i)" :data-src="item.medium" :alt="item.alt" :title="item.attachment">
            <div class="fs14 uk-margin-small-top">{{item.caption}}</div>
          </li>
        </ul>
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
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
