<template lang="html">
  <div class="uk-margin-small-top">
    <div class="uk-grid-small uk-margin-small-top uk-child-width-1-2@s uk-child-width-1-4@l uk-text-center" uk-height-match="target: > div > a > .uk-card" uk-grid>
			<div v-for="item in news" :key="item">
				<a :href="item.url" target="_blank">
					<div class="uk-card uk-card-default uk-border-rounded uk-card-hover ">
						<div class="uk-card-media-top">
							<img class="uk-border-rounded" :data-src="item.image" alt="" uk-img>
						</div>
						<div class="uk-card-body uk-text-left uk-padding-small">
							<div class="fs16 fnt-bld cl-black uk-margin-small-top uk-margin-remove-bottom">{{item.post_title}}</div>
							<div class='fs16 cl-black uk-margin-small-top uk-margin-bottom uk-overflow-auto uk-height-small'>{{item.description}}</div>
							<div class="count-view uk-hidden">
								<span>{{item.count}}</span>
							</div>
							<div class="uk-text-meta uk-text-left uk-position-bottom uk-padding-small">{{item.category}}</div>
							<div class="uk-text-meta uk-text-right uk-position-bottom uk-padding-small"><time datetime="2016-04-01T19:00">{{item.date}}</time></div>
						</div>
					</div>
				</a>
			</div>
		</div>
    <div class="uk-text-center" v-show="statusResponse === 0">
      <preloader></preloader>
    </div>
    <!-- <div class="uk-text-center" v-show="statusResponse === 2">
      all ok
    </div> -->
    <div class="uk-text-center uk-margin-top">
      <div @click="nextNews" class="btn btn__tpl1 btn__green uk-margin">Посмотреть еще</div>
    </div>
  </div>
</template>

<script>
import Preloader from '../Preloader'
export default {
  name: "NewsId",
  components: {
    Preloader
  },

  props: {
  },
  data() {
    return {
      news: [],
      statusResponse: 0, //0 Processing / 1 Success, 2 Empty
      settings:{
        page: 1,
        pages_count:4,
      }
      
    }
  },
  created() {
    this._getNews()
  },

  methods: {
    _getNews(){
      this.statusResponse = 0;
      this.$axios
      .post('http://msk.vevanta.loc//wp-json/api/v1/page/news', this.settings)
      .then(rs => {
        rs.data.forEach(item => {
          this.news.push(item)
        })
        this.statusResponse = 2
      })
    },
    nextNews(){
      this.settings.page++
      this._getNews()
    },
  },
}
</script>


<style media="screen" scoped>

</style>
