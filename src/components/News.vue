<template>
  <div class="uk-background-muted" id="news-gallery" ref="newsGallery">
      <div v-for="(post, index) in posts">
        <div  v-if="index === 0" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-large item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">af</div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 5" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-large item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top"></div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 6" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-medium item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top"></div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 7" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-large item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">{{ getDescription(post.post_content, 150)}}</div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 9" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-medium item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">{{ getDescription(post.post_content, 150)}}</div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 10" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-small item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">{{ getDescription(post.post_content, 150)}}</div>
            </div>
          </div>
        </div>

        <div v-else-if="index === 12" class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default">
            <div class="uk-height-medium item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">{{ getDescription(post.post_content, 150)}}</div>
            </div>
          </div>
        </div>

        <div v-else class="shadow-v new-item">
          <div class="new-item__wrapper uk-background-default uk-height-1-1">
            <div class="uk-height-small item__bg_tpl1 uk-background-cover" :data-src="post.imgLarge" uk-img></div>
            <div class="item__text">
              <div class="cl-black fnt-bld uk-margin-small-top">{{ post.post_title }}</div>
              <div class="uk-margin-small-top">{{ getDescription(post.post_content)}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'news',
    data() {
      return {
        posts: [],
        page: 1,
        maxPages: 0,
      }
    },
    created() {
      this.getNews();

      let _getNewsLazy = () => {
        if (this.page === this.maxPages) {
          window.removeEventListener('scroll', _getNewsLazy)
        }

        let clientRect = this.$refs.newsGallery.getBoundingClientRect()
        if ((clientRect.bottom - window.innerHeight - 300) <= 300) {
          this.getNews()
        }
      }

      window.addEventListener('scroll', _getNewsLazy)
    },

    methods: {
      getDescription(text, size = 80) {
        let contentBlock = document.createElement('div')
        contentBlock.innerHTML = text
        return contentBlock.textContent.slice(0, size)
      },

      getNews() {
        this.$axios.post('https://vevanta.com/api?controller=posts&action=getPostsTape', {
          paged: this.page
        })
        .then(rs => {
          this.posts.push(...rs.data.response.posts)
          this.page++
          this.maxPages = rs.data.response.max_num_pages
        });
      },
    }
  }
</script>

<style scoped>
.new-item__wrapper {
  border-radius: 8px;
  margin-top: 20px;
}

.item__bg_tpl1 {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.item__bg_tpl2 {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.item__text {
  padding: 12px;
}


.fl-l {
  float: left;
}

.new-item {
  display: inline-block;
}

@media screen and (min-width: 960px) {
  #news-gallery {
    column-count: 3;
  }
}
</style>
