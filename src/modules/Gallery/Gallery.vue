<template>
  <div>
    <div
      class="object__gallery uk-margin-bottom"
      v-if="!!settingsGallery.photos && settingsGallery.photos.length > 0"
    >
      <slot>
      <div
        class="uk-position-relative uk-visible-toggle uk-light uk-background-muted uk-margin-small-bottom"
        tabindex="-1"
        uk-slideshow="index: 0"
        ref="mainSlider"
      >
        <ul class="uk-slideshow-items" uk-lightbox>
          <li v-for="(photo, i) in settingsGallery.photos" :key="`photo-${i}`">
            <template v-if="photo.type && photo.type === 'you'">
              <div class="uk-position-center uk-icon" uk-spinner></div>
              <iframe  class="uk-position-relative" v-if="currentPhoto === i"  :src="`https://www.youtube.com/embed/${photo.id}`" width="1920" height="1080" frameborder="0" allowfullscreen uk-responsive uk-video="automute: true"></iframe>

              <div
                :data-src="photo.large"
                uk-img
                class="gallery__bg uk-position-absolute uk-height-1-1 uk-width-1-1 uk-background-contain"
              ></div>
            </template>
            <template v-else>
              <div class="cr-pointer" @click="showPhotoSwipe(i)" :data-caption="photo.desc">
                <div class="uk-position-center uk-icon" uk-spinner></div>
                <div
                  :data-src="photo.large"
                  uk-img
                  class="gallery__bg uk-position-absolute uk-height-1-1 uk-width-1-1 uk-background-contain"
                ></div>
              </div>
            </template>

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
      <div v-if="descImg" class="desc-img fnt-semi">{{ descImg }}</div>
      <div
        class="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
        uk-slider="finite: false"
        ref="mainSlideshow"
      >
        <ul class="uk-slider-items">

          <li v-for="(photo, i) in settingsGallery.photos" :key="i">
          <template v-if="photo.type && photo.type === 'you'">
            <div class="uk-position-center z-index-100 btn__play">
              <i class="icon-you fs22 cl-red"></i>
            </div>
          </template>
            <div
              class="slider-image"
              :data-src="photo.medium"
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
      <v-photoswipe :isOpen="isOpen" :items="settingsGallery.photos" :options="options" @close="hidePhotoSwipe"></v-photoswipe>
      </slot>
    </div>

    <template v-else>
      <div class="uk-position-relative" style="min-height: 450px">
        <div
          data-src="/img/no-photo.jpg"
          uk-img
          class="gallery__bg uk-position-absolute uk-height-1-1 uk-width-1-1 uk-background-contain"
        ></div>
      </div>
    </template>
  </div>
</template>

<script>
import Uikit from 'uikit'
import { PhotoSwipe } from 'v-photoswipe'


export default {
  components: {
    'v-photoswipe': PhotoSwipe
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
  data() {
    return {
      descImg: '',
      currentPhoto: 0,

      isOpen: false,
      isOpenGallery: false,
      options: {
        index: 3,
        timeToIdle: 2000,
      },
    };
  },
  mounted() {

    if (this.$refs.mainSlider) {
      this.$refs.mainSlider.addEventListener("itemshow", e => {
        let index = e.detail[0].index;

        if (this.settingsGallery.photos[index] && this.settingsGallery.photos[index].desc) {
          this.descImg = this.settingsGallery.photos[index].desc
        } else {
          this.descImg = ''
        }
        UIkit.slider(this.$refs.mainSlideshow).show(index);
        this.currentPhoto = index;
      });
    }
  },
  methods: {
    setMainPhoto(index, typeArray = 'photo') {
      UIkit.slideshow(this.$refs.mainSlider).show(index);
      this.currentPhoto = index;
    },

    $_getIndexItem() {
      let index = this.index;
      this.index++
      return index;
    },

    showPhotoSwipe (index) {
      this.isOpen = true
      this.$set(this.options, 'index', index)
    },
    hidePhotoSwipe () {
      this.isOpen = false
    },
  },
};
</script>

<style scoped>

.btn__play img {
  max-width: 100px;
  cursor: pointer;
}

.btn__play:hover {
  opacity: 0.7;
  transition: 0.4s;
}
.desc-img {
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 2px dotted #5bbfb9;
  background-color: rgb(91 191 185 / 7%);
}
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
  border: 3px solid rgb(127 47 68);
}
</style>
