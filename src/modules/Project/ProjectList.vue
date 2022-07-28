<template lang="html">
  <div id="projectsContainer">
    <transition-group name="list" :class="classListing" tag="div">
      <project-item v-for="(item, key, i) in $store.state.projects" :key="key" :item="item" :index="key">
      </project-item>
    </transition-group>
    <div class="uk-text-center" v-show="$store.state.statusSearchProjects === 0">
      <preloader></preloader>
    </div>
    <div v-if="$store.state.statusSearchProjects === 2">
      <div class="fs20 uk-text-center">Проекты не найдены!</div>
      <div class="title">Возможно вас заинтересуют эти проекты</div>
      <projects-id :filter="{ids: [265, 121, 172, 159, 240, 141, 196, 128, 130]}"></projects-id>
    </div>
    <div class="uk-text-center" v-show="$store.state.settings.page < $store.state.pages">
      <div class="btn btn__tpl1 btn__green uk-margin" @click="nextPage">
        показать ещё
      </div>
    </div>
  </div>
</template>
<script>
import Preloader from '@/components/Preloader'
import ProjectItem from './ProjectItem'
import ProjectsId from './ProjectsId'
export default {
  name: 'ProjectList',
  props: {
    startLoad: {
      type: Boolean,
      default: true,
    }
  },
  components: {
    Preloader, ProjectItem, ProjectsId
  },
  data() {
    return {
      settings: {
        listing: 1,
      },
    }
  },
  created() {
    if (this.startLoad) {
      this.$store.dispatch('GET_PROJECTS')
    }
  },
  methods: {
    nextPage() {
      this.$store.commit('ADD_PAGED')
      this.$store.dispatch('MORE_PROJECTS')
    },
  },
  computed: {
    classListing() {
      return {
        'uk-grid': true,
        'uk-child-width-1-2@s': true,
        'uk-child-width-1-3@l': this.settings.listing,
        'uk-child-width-1-1@l': !this.settings.listing,
        'uk-margin-medium-bottom': false,
        'uk-margin-medium-top': true
      }
    }
  },
}
</script>

<style media="screen">
.project__item {
  margin-bottom: 40px;
}
@media screen and (max-width: 640px) {
  .input__block {
    height: 50px;
  }
}
@media screen and (max-width: 1200px) {
  .project__item {
    margin-bottom: 20px;
  }
  .left-radius_bottom {
    border-bottom-left-radius: 12px;
  }
  .left-radius_top {
    border-top-left-radius: 12px;
  }
  .right-radius_top {
    border-top-right-radius: 12px;
  }
  .right-radius_bottom {
    border-bottom-right-radius: 12px;
  }
}
</style>
