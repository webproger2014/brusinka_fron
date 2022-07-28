<template>
  <div
    class="video-widget"
    ref="widget-container"
    v-if="!closed && videoLink"
    :class="{ showed: showVideo }"
  >
    <div class="video-wrapper" @click.stop="openVideo">
      <div
        class="video-widget__button close-button"
        v-show="showVideo == false"
      >
        <span class="icon-close" @click.stop="closeVideo"></span>
      </div>
      <div class="video-widget__button hide-button" v-show="showVideo == true">
        <span class="icon-down-arrow" @click.stop="hideVideo"></span>
      </div>
      <div class="video-container">
        <video
          autoplay="true"
          loop="true"
          preload="auto"
          :muted="isMuted"
          controlslist="nodownload"
          class="video-container__video"
          :src="videoLink"
          ref="video"
          @click="playPauseVideo"
        ></video>
        <template v-if="isButton && linkButton">
          <div class="video-container__button" v-show="showVideo">
            <a :href="linkButton" class="btn btn__tpl1 btn__green" target="_blank">{{
              textButton
            }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoLink: {
      type: String
    },
    textButton: {
      type: String,
      default: "Перейти"
    },
    linkButton: {
      type: String,
      default: ""
    },
    isButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closed: false,
      showVideo: false,
      isMuted: "muted",
      isPlay: true,
      video: null
    };
  },
  mounted() {
    if (this.videoLink) {
      this.video = this.$refs.video;
      this.video.play();
    }
  },
  methods: {
    closeVideo() {
      this.closed = true;
      this.$refs["widget-container"].remove();
    },
    openVideo() {
      this.showVideo = true;
      this.isMuted = null;
      this.addDocumentListener();
    },
    hideVideo() {
      this.isMuted = "muted";
      this.showVideo = false;
      this.removeDocumentListener();
    },
    playPauseVideo() {
      if (this.showVideo) {
        if (this.isPlay) {
          this.isPlay = false;
          this.video.pause();
        } else {
          this.isPlay = true;
          this.video.play();
        }
      }
    },
    addDocumentListener() {
      document.addEventListener("click", this.clickDocumentEvent);
    },
    removeDocumentListener() {
      document.removeEventListener("click", this.clickDocumentEvent);
    },
    clickDocumentEvent(e) {
      if (e.target.closest("video-widget")) return;
      this.hideVideo();
    }
  }
};
</script>

<style scoped>
.video-widget {
  position: fixed;
  display: flex;
  left: 50px;
  bottom: 50px;
  z-index: 10000;
  height: 200px;
  width: 140px;
  box-shadow: rgba(0, 0, 0, 40%) 0px 10px 20px;
  border-radius: 20px;
  user-select: none;
  border: 3px solid #fff;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  transition-duration: 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.video-widget__button {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000000;
  transform-origin: 50% 50%;
  transition-duration: 0.2s;
  opacity: 0;
}

.video-widget:hover .video-widget__button {
  opacity: 1;
}

.video-widget__button span {
  color: rgba(219, 219, 219, 1) !important;
  transition-duration: 0.3s;
}

.video-widget__button:hover.video-widget__button span {
  transform: scale(1.2);
}

.video-container__video {
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  z-index: 200;
  transition: opacity 0.4s ease-in-out 0s;
  opacity: 0.8;
}

.video-container__button {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  z-index: 1000;
}

.showed .video-container__video,
.video-wrapper:hover .video-container__video {
  opacity: 1;
}

.showed {
  height: 500px;
  width: 280px;
}

.video-widget.showed {
  border: 3px solid #00bab7b6;
}

@media screen and (max-width: 960px) {
  .video-widget {
    left: 30px;
    bottom: 30px;
  }
  .video-widget__button {
    opacity: 1;
  }

  .video-widget__button span {
    color: #fff !important;
  }
}
</style>
