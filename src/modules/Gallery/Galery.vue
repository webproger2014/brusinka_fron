<template>
  <div>
    <div
      class="object__gallery uk-margin-bottom"
      v-if="!!photosJSON && photosJSON.length > 0"
    >
      <div
        class="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        uk-slideshow="index: 0"
        ref="mainSlider"
      >
        <ul class="uk-slideshow-items" uk-lightbox>
          <li v-for="(photo, i) in photosJSON" :key="i">
            <a :href="`https://cdn.vevanta.ru/${photo.url}`">
              <div
                :data-src="`https://cdn.vevanta.ru/${photo.url_400}`"
                uk-img
                class="blur20 uk-position-absolute uk-background-cover uk-position-top-left uk-height-1-1 uk-width-1-1 uk-background-blend-overlay"
              ></div>
              <div class="uk-position-center uk-icon" uk-spinner></div>
              <div
                :data-src="`https://cdn.vevanta.ru/${photo.url}`"
                uk-img
                class="gallery__bg uk-position-absolute uk-height-1-1 uk-width-1-1 uk-background-contain"
              ></div>
            </a>
          </li>
        </ul>
        <div class="slider__route">
          <a
            class="uk-position-center-left uk-position-small uk-hidden-hover"
            href="#"
            uk-slidenav-previous
            uk-slideshow-item="previous"
          ></a>
          <a
            class="uk-position-center-right uk-position-small uk-hidden-hover"
            href="#"
            uk-slidenav-next
            uk-slideshow-item="next"
          ></a>
        </div>
      </div>
      <div
        class="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        uk-slider="finite: false"
        ref="mainSlideshow"
      >
        <ul class="uk-slider-items">
          <li v-for="(photo, i) in photosJSON" :key="i">
            <div
              class="slider-image"
              :data-src="`https://cdn.vevanta.ru/${photo.url_1024}`"
              uk-img
              :class="{ active: i == currentPhoto }"
              @click="setMainPhoto(i)"
            ></div>
          </li>
        </ul>
        <a
          class="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous
          uk-slider-item="previous"
        ></a>
        <a
          class="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next
          uk-slider-item="next"
        ></a>
      </div>

      <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
          <button
            class="uk-modal-close-full uk-close-large"
            type="button"
            uk-close
          ></button>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="uk-position-relative" style="min-height: 450px">
        <div
          data-src="https://vevanta.ru/wp-content/themes/agentstvo/assets/images/object/no-photo.jpg"
          uk-img
          class="blur20 uk-position-absolute uk-background-cover uk-position-top-left uk-height-1-1 uk-width-1-1 uk-background-blend-overlay"
        ></div>
        <div
          data-src="https://vevanta.ru/wp-content/themes/agentstvo/assets/images/object/no-photo.jpg"
          uk-img
          class="gallery__bg uk-position-absolute uk-height-1-1 uk-width-1-1 uk-background-contain"
        ></div>
      </div>
    </template>
  </div>
</template>

<script>
import Uikit from 'uikit'

export default {
  props: {
    photos: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      currentPhoto: 0,
    };
  },
  mounted() {
    if (this.$refs.mainSlider) {
      this.$refs.mainSlider.addEventListener("itemshow", e => {
        let index = e.detail[0].index;
        UIkit.slider(this.$refs.mainSlideshow).show(index);
        this.currentPhoto = index;
      });
    }
  },
  methods: {
    setMainPhoto(index) {
      UIkit.slideshow(this.$refs.mainSlider).show(index);
      this.currentPhoto = index;
    },
  },
  computed: {
    photosJSON() {
      return JSON.parse(this.photos);
    }
  },
};
</script>

<style scoped>
.uk-slider-items li {
  padding: 5px;
}
.uk-slider-items li div {
  border-radius: 5px;
  cursor: pointer;
}

.uk-slider-items .slider-image {
  height: 120px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

@media screen and (max-width: 580px) {
  .uk-slider-items .slider-image {
    height: 60px;
    width: 70px;
  }
}
.active {
  border: 3px solid rgb(186 64 96 / 75%)
}
</style>
