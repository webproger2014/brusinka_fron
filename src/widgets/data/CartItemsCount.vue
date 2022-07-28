<template>
  <span :class="`${containerClass}`" v-show="$store.state.cartItems.length">
  {{ $store.state.cartItems.length }}
  </span>
</template>

<script>
  export default {
    props: {
      containerClass: {
        type: String,
        default: 'uk-badge'
      }
    }
  }
</script>
