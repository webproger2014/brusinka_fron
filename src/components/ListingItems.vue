<template>
  <div>
    <div class="uk-text-center uk-padding" v-show="$store.state.statusItems === 2">
      <p>Объекты не найдены</p>
    </div>
    <div class="uk-child-width-expand@s uk-text-center" uk-grid>

    </div>
    <div class="uk-text-center uk-padding" v-show="!$store.state.statusItems">
      <div uk-spinner></div>
    </div>
    <div class="uk-margin-top uk-grid-small uk-margin-medium-bottom" uk-grid>
       <div class="uk-width-1-1 uk-width-1-1@l uk-width-1-2@s uk-width-1-3@m"
        v-for="(el, index) in items" :key="index"
        >
         <div
            class="uk-flex-top uk-margin uk-animation-slide-top-small uk-box-shadow-medium"
            style="background-color: #fff;"
         >
           <Item :item="el"/>
         </div>
       </div>
    </div>
     <div>
        <ul class="uk-pagination uk-flex-center" uk-margin>
          <li>
            <button :disabled="curPage === 1"
              class="uk-button uk-button-default uk-button-small"
              @click="setPage(curPage - 1)
            ">
              <span uk-pagination-previous></span>
            </button>
          </li>
          <li v-for="(page, index) in pagination" :key="index" :class="curPage === page ? 'uk-active' :''">
            <button :disabled="curPage === page"
              class="uk-button uk-button-default uk-button-small"
              @click="setPage(page)
              ">
              {{ page }}
            </button>
          </li>
          <li>
            <button :disabled="curPage === countPage"
              class="uk-button uk-button-default uk-button-small"
               @click="setPage(curPage + 1)
              ">
              <span uk-pagination-next></span>
            </button>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
    name: "ListingItems",
    components: {
      Item
    },

    computed: {
      items() { return this.$store.state.items  },
      filter() { return this.$store.state.filter },
      countPage() { return this.$store.state.items_count_pages },
      curPage() { return this.$store.state.page },

      pagination() {
          let start = ((this.$store.state.page - 1) + 3 ) - 3
          let finish = ((this.$store.state.page - 1) + 3)
          let arrPagin = []

          arrPagin.length = this.$store.state.items_count_pages

          for (let index = 0; index < arrPagin.length; index++) {
              arrPagin[index] =  index + 1
          }

          return arrPagin.slice(start,finish)
      }
    },

    methods: {
      setPage (newPage) {
        window.scroll(0, 0)
        this.$store.commit('SET_STATUS_ITEMS', 0)
        this.$store.commit('SET_DATA_ITEMS', [])
        this.$store.commit('SET_PAGE', newPage)
        this.$store.dispatch('GET_DATA')
      }
    }
}
</script>

<style scoped>

</style>
