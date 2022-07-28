import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: localStorage.getItem('pagesId') ? JSON.parse(localStorage.getItem('pagesId')) : [],
    pages: 0,
    projects: [],
    counts: 0,
    statusSearchProjects: 0, //0 Processing / 1 Success, 2 Empty
    project_name: '',
    settings: {
      page: 1,
    },
    filterTools: {
      bathrooms: 0,
      floors: 1,
      garage_type: 0,
      basement: 0,
      rooms: 0,
      roof_type: 0,
      square: [],
      mansard: 0,
      materials: [6, 7, 9],
      dimension: [],
      styles: [],
      sort: 'popular'
    },
  },

  mutations: {
    SET_PAGED (context, page) {
      context.settings.page = page
    },

    ADD_PAGED (context) {
      ++context.settings.page
    },

    SET_SORT (context, sort) {
      context.filterTools.sort = sort
    },


  },

  actions: {
    CLEAR_CART(context) {
      context.state.cartItems = [];
      localStorage.removeItem('pagesId');
    },

    ADD_TO_CART(context, id) {
      context.state.cartItems.push(id)
      localStorage.setItem('pagesId', JSON.stringify(context.state.cartItems))
    },

    DEL_ITEM_CART(context, id) {
      context.state.cartItems = context.state.cartItems.filter(item => item !== id)
      localStorage.setItem('pagesId', JSON.stringify(context.state.cartItems))
    },

    GET_PROJECTS (context, filter = {}) {
      context.state.statusSearchProjects = 0
      if (Object.keys(filter).length) {
        context.state.filterTools = filter
      }

      context.state.projects = []
      axios.post(`https://api.vevanta.ru/v1/projects`, {
        filter: context.state.filterTools,
        settings: context.state.settings
      })
        .then(rs => {
          if (rs.data.projects.length) {
            context.state.counts = rs.data.counts
            context.state.pages = rs.data.pages
            context.state.projects = rs.data.projects
            context.state.statusSearchProjects = 1
          } else {
            context.state.counts = 0
            context.state.pages = 0
            context.state.projects = []
            context.state.statusSearchProjects = 2
          }
        })
    },

    MORE_PROJECTS (context, filter = {}) {
      context.state.statusSearchProjects = 0

      if (Object.keys(filter).length) {
        context.state.filterTools = filter
      }
      axios.post(`https://api.vevanta.ru/v1/projects`, {
        filter: context.state.filterTools,
        settings: context.state.settings
      })
        .then(rs => {
          if (rs.data.projects.length) {
            context.state.counts = rs.data.counts
            context.state.pages = rs.data.pages
            context.state.projects.push(...rs.data.projects)
            context.state.statusSearchProjects = 1
          } else {
            context.state.pages = 0
            context.state.projects = []
            context.state.statusSearchProjects = 2
          }
        })
    },
  },
  modules: {
  }
})
