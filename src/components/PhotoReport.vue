<template lang="html">
  <div>
    <div v-if="reports.length" class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@l" uk-height-match="target: > div > .uk-card" uk-grid>
			<div v-for="(report, i) in reports" :key="i" uk-lightbox="animation: fade"
      class="uk-margin-bottom cr-pointer show-animation uk-text-center">
      <!-- <div v-for="(report, i) in reports" :key="index" uk-lightbox="animation: fade"
      :class="[getItemIndex(i), 'uk-margin-bottom cr-pointer show-animation uk-text-center']"> -->
					<div @click="showPhotoSwipe(i)" class="uk-card uk-card-default cr-pointer uk-border-rounded uk-card-hover ">
						<div class="uk-card-media-top uk-margin-bottom">
              <div class="uk-border-rounded uk-height-medium uk-background-cover" :data-src="report.src +`?h=400&w=400`" alt="" uk-img>
              </div>
						</div>
						<div class="uk-card-body uk-text-left uk-padding-small ">
							<!-- <div class="fs16 fnt-bld cl-black uk-margin-small-top uk-margin-bottom">Код объекта: {{report.object_number}}</div> -->
							<!-- <div class="uk-text-left uk-margin-medium-bottom"> Этап: {{report.stage_name}}</div> -->
							<div class="fs16 fnt-bld cl-black uk-text-left uk-position-bottom uk-padding-small">Код объекта: {{report.object_number}}</div>
							<div class="fs16 fnt-bld cl-black uk-text-right uk-position-bottom uk-padding-small"><time datetime="2016-04-01T19:00">{{report.stage_date}}</time></div>
						</div>
					</div>
			</div>
		</div>
    <v-photoswipe :isOpen="isOpen" :items="reports" :options="options" @close="hidePhotoSwipe"></v-photoswipe>
    <div class="uk-text-center uk-margin-top" v-show="page < pages">
      <div class="btn btn__tpl1 btn__brown uk-margin" @click="nextPage">
        показать ещё
      </div>
    </div>


    <div class="uk-text-center uk-padding" v-show="statusSearchReports == 0">
      <preloader></preloader>
    </div>
  </div>
</template>
<script src="scripts/watermark-polyfill.js"></script>
<script>
import Preloader from '@/components/Preloader'
import { PhotoSwipe } from 'v-photoswipe'


export default {
  name: "PhotoReport",
  components: {
    Preloader,
    'v-photoswipe': PhotoSwipe,
  },

  data() {
    return {
      page:1,
      pages:'',
      reports:[],

      isOpen: false,
      options: {
        index: 3
      },

      statusSearchReports: 0, //0 Processing / 1 Success, 2 Empty
    }
  },

  created() {
    this.getReport()
  },

  methods: {
    nextPage() {
      ++this.page
      this.getReport()
    },
    getReport() {
      this.statusSearchReports = 0
      this.$axios.post('https://api.vevanta.ru/v1/stages/read_all/' + this.page)
      .then(rs => {
        // console.log(rs);
        this.pages = rs.data.pages
        this.reports = [...this.reports, ...rs.data.result];
        this.reports.map(
        item => {
        let src = 'https://cdn.vevanta.com/brusinka/' + item.url;
        item.src = src
        return item
      })
        this.statusSearchReports = 1
      })
    },
    // getItemIndex(i) {
    //   let settings = ''

    //     if ((i == 0) || (i % 3 == 0)) {
    //         settings = 'uk-width-1-2@s uk-width-1-4@l'
    //       } else if((i % 2 == 0)) {
    //         settings = 'uk-width-1-2@s uk-width-1-2@l'
    //       } else if((i % 19 == 0)){
    //         settings = 'uk-width-1-2@s uk-width-3-4@l'
    //       }

    //   return settings;
    // },
    showPhotoSwipe (index) {
      this.isOpen = true
      this.$set(this.options, 'index', index)
    },
    hidePhotoSwipe () {
      this.isOpen = false
    },

    computed: {

    }
  },

}
</script>


<style media="screen" scoped>


</style>
