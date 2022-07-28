<template>
  <div>
    <div class="fnt-bld fs30@m fs22@s fs18">Спасибо!</div>
    <div class="fnt-bld fs26@m fs20@s uk-margin">
      <span class="cl-vevanta">Рассчет почти готов,</span><br/>
      оставьте контактный номер телефона.
    </div>
    <form class="uk-grid uk-grid-small uk-margin-large-top" @submit.prevent="send">
      <div class="uk-width-1-3@m uk-margin-bottom">
        <div class="uk-position-relative">
          <span class="uk-form-icon">
            <i class="icon-smartphone cl-vevanta"></i>
          </span>
          <input type="text" placeholder="Ваш номер:" class="uk-input uk-form-large" :value="phone" @input="$emit('input', $event.target.value)">
        </div>
      </div>
      <div class="uk-width-1-1 uk-width-expand@m">
        <button type="submit" class="btn btn__tpl3 btn__large btn__green uk-text-lowercase fnt-med uk-width-auto@m uk-width-1-1">
          Отправить {{ phone }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['phone'],
    methods: {
      send() {
        this.$emit('send')
      }
    }
  }
</script>
