<ul class="uk-pagination uk-flex-center" uk-margin v-show="($store.state.pages > 1) && $store.state.projects.length && $store.state.statusSearchProjects === 1">
    <li><a href="#" @click.prevent="nextPage($store.state.settings.page - 1)"><span uk-pagination-previous></span></a></li>
    <template v-if="$store.state.settings.page !== 1">
      <li><a href="#">1</a></li>
      <li class="uk-disabled"><span>...</span></li>
    </template>
    <template v-if="$store.state.settings.page === 1">
      <li class="uk-active"><span>1</span></li>
    </template>
    <template v-if="($store.state.settings.page - 3) > 1">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page - 3)" uk-scroll>{{ $store.state.settings.page - 3 }}</a></li>
    </template>
    <template v-if="($store.state.settings.page - 2) > 1">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page - 2)" uk-scroll>{{ $store.state.settings.page - 2 }}</a></li>
    </template>
    <template v-if="($store.state.settings.page - 1) > 1">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page - 1)" uk-scroll>{{ $store.state.settings.page - 1 }}</a></li>
    </template>
    <template v-if="$store.state.settings.page !== 1">
      <li class="uk-active"><a href="#">{{ $store.state.settings.page }}</a></li>
    </template>
    <template v-if="($store.state.settings.page + 1) <= $store.state.pages">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page + 1)" uk-scroll>{{ $store.state.settings.page + 1 }}</a></li>
    </template>
    <template v-if="($store.state.settings.page + 2) <= $store.state.pages">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page + 2)" uk-scroll>{{ $store.state.settings.page + 2 }}</a></li>
    </template>
    <template v-if="($store.state.settings.page + 3) <= $store.state.pages">
      <li><a href="#projects-list" @click="nextPage($store.state.settings.page + 3)" uk-scroll>{{ $store.state.settings.page + 3 }}</a></li>
    </template>


    <li class="uk-disabled"><span>...</span></li>
    <li><a href="#">{{ $store.state.pages }}</a></li>
    <li><a href="#"><span uk-pagination-next></span></a></li>
</ul>
