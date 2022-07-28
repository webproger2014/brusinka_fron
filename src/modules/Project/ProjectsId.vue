<template lang="html">
  <div>
    <div class="uk-text-center uk-padding" v-show="!projects.length">
      <preloader></preloader>
    </div>
    <transition-group name="list" :class="classContainer" tag="div">
      <project-item v-for="(item, key, i) in projects" :key="key" :item="item" :index="key">
      </project-item>
    </transition-group>
  </div>
</template>
<script>
import Preloader from '@/components/Preloader'
import ProjectItem from './ProjectItem'

export default {
  name: "ProjectsId",
  components: {
    Preloader,
    ProjectItem
  },

  props: {
    classContainer: {
      default: 'uk-grid uk-child-width-1-2@s uk-child-width-1-3@l',
    },
    filter: {
      default: () => {
        return {}
      },
      type: Object
    },
  },
  data() {
    return {
      projects: [],
      statusSearchProjects: 0, //0 Processing / 1 Success, 2 Empty
    }
  },

  created() {
    this.search()
  },

  methods: {

    search() {
      this.statusSearchProjects = 0
      this.projects = []
      this.$axios.post('https://api.vevanta.ru/v1/projects/get_projects_by_id', {
        filter: this.filter
      })
      .then(rs => {
        this.projects = rs.data.projects
      })
    },
  },
}
</script>


<style media="screen" scoped>


.cl__btn {
  color: #7c7c7c;
}

.search-filter__wrapper {
  background-color: #0424394f;
  padding: 10px;
}

.input__block {
  height: 60px;
}

.btn__tpl_bord {
  border: 1px solid #e0e0e0;
}

.btn__tpl_bord2 {
  border: 1px solid #858585;
}

.btn__tpl__bg-grey {
  transition: 0.4s;
  background-color: #858585;
}

.w60 {
  width: 60px;
}

.rm__bord_left {
  padding-left: 0;
}

.rm__bord_right{
  border-right: none;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.8s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.wh45 {
  width: 45px;
  height: 45px;
}

.ts::after {
  content: "";
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -9px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 11px solid #ffbf00;
}


.project__item {
  margin-bottom: 40px;
}

@media screen and (max-width: 640px) {
  .input__block {
    height: 50px;
  }

  .project__item-title {
    max-height: 37px;
    overflow: hidden;
  }

  .project__item-title::after {
    content: "...";
  }
}
@media screen and (max-width: 1200px) {
  .project__item {
    margin-bottom: 20px;
  }
  .left-radius {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .right-radius {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}
</style>
