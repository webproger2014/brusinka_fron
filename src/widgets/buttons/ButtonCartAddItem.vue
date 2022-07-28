<template>
  <div class="">
    <div class="btn btn__tpl1 btn__green" @click="addToCart" v-if="!$store.state.cartItems.includes(id)">
      Добавить в корзину
    </div>
    <div class="btn btn__tpl1 btn__dark" @click="$store.dispatch('DEL_ITEM_CART', id)" v-else>
      В корзине
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },

    methods: {
      addToCart() {
        if (this.$store.state.cartItems.length) {
          if (!this.$store.state.cartItems.includes(this.id)) {
            this.$store.dispatch('ADD_TO_CART', this.id);
          }
        } else {
          this.$store.dispatch('ADD_TO_CART', this.id);
        }
      },

    }
  }
</script>
