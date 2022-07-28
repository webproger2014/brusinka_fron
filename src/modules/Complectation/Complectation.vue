<template>
  <div>
    <div class="uk-grid uk-grid-small">
      <div class="uk-width-1-3">
        <ul uk-switcher="connect: #component-nav; animation: uk-animation-fade">
          <li class="uk-margin-small-bottom cr-pointer"><a href="http://msk.vevanta.loc/">aff</a>Фундамент</li>
          <li class="uk-margin-small-bottom"><a href="#">Коробка</a>Коробка</li>
          <li class="">Облицовка стен</li>
        </ul>
      </div>
      <div class="uk-width-expand">
        <ul id="component-nav" class="uk-switcher">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sed do eiusmod.</li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>
