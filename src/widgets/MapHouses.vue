<template>
  <div>
    <span>*Нажмите на участок для отображения подробностей</span>
    <div class="uk-position-relative" ref="cardCont">
      <img src="https://cdn.vevanta.com/sk/houses.jpg">
      <svg class="image-mapper-svg" style="width: 100%;" viewBox="0 0 1200 675">
      <polygon v-for="(house, index) in houses" @click="getInfoHouse($event, index)" :points="house.points" class="image-mapper-shape" data-area-index="6" style="cursor: pointer;">
      </polygon>
      </svg>

      <div class="uk-position-absolute card__house uk-box-shadow-large" v-if="Object.keys(house).length" :style="styleData">
        <div class="uk-hidden@l uk-text-right" @click="house = {}"><i class="icon-close"></i></div>
        <div class="uk-text-center">
          <a :href="`/proekt/${house.id}`" target="_blank">
            <img :src="`https://cdn.vevanta.ru${house.images[0].url_400}`" alt="">
          </a>

        </div>
        <div class="fnt-bld uk-margin-small-top">
          <a class="fs12 cl-dark" :href="`/proekt/${house.id}`">Дом по проекту «{{ house.name }}»</a>
        </div>
        <div class="uk-margin-small fs14">
          Площадь участка: {{ Math.round(houses[indexHouse].sot / 100) }} сот.<br/>
          Цена: {{houses[indexHouse].price }} р. <br/>
          Этажность: {{ house.floors_q }}
        </div>
        <div class="">
          <button-modal :formName="`Купить дом «${house.name}» (${indexHouse + 1})`"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ButtonModal from '@/widgets/buttons/ButtonModal'
export default {
  components: {ButtonModal},
  data() {
    return {
      styleData: {
        top: '0px',
        right: 0,
        left: '0px'
      },
      indexHouse: 0,
      house: {},

      houses: [
        {
          price: '15 500 000',
          project: 357,
          sot: 769.93,
          points: [ 816,124,793,228,878,239,979,253,1035,261,1098,268,1060,175,952,154,947,145,882,141 ]
        },
        {
          price: '18 500 000',
          sot: 744.0,
          project: 453,
          points: [ 650,95,617,194,699,221,729,223,796,230,813,124,764,112,728,106 ]
        },
        {
          price: '15 500 000',
          sot: 990.96,
          project: 357,
          points: [ 517,64,410,134,497,186,519,200,542,191,557,186,592,186,616,195,623,170,648,96,599,84 ]
        },
        {
          price: '15 500 000',
          sot: 793.65,
          project: 357,
          points: [ 352,173,68,353,479,270,482,268,476,252,480,239,485,227,497,213,521,199,475,173,409,135,366,164 ]
        },
        {
          price: '17 000 000',
          sot: 934.05,
          project: 365,
          points: [ 502,292,525,304,574,313,444,440,264,618,88,612,36,424,23,383,66,357,343,299,378,281,387,288,480,268 ]
        },
        {
          price: '17 000 000',
          sot: 718.52,
          project: 365,
          points: [ 428,460,516,372,576,310,699,303,784,320,726,631,269,617 ]
        },
        {
          price: '17 000 000',
          project: 365,
          sot: 728.86,
          points: [ 991,351,784,316,729,633,1039,641,1071,626,1114,586,1134,554,1159,406,1151,374 ]
        },
      ]
    }
  },

  methods: {
    getInfoHouse(e, index) {
      this.house = {}

      this.$axios.post('https://api.vevanta.ru/v1/projects/get_project_by_id', {
        project_id: this.houses[index].project
      }).then (rs => {
        if (rs.data.length) {
          this.house = rs.data[0]
        }
      })


      this.indexHouse = index
      let cardCLientRect = this.$refs.cardCont.getBoundingClientRect()
      let cardInfoClientRect = e.target.getBoundingClientRect()

      this.styleData.left = event.clientX - cardCLientRect.left + 'px'
      this.styleData.top = event.clientY - cardCLientRect.top + 'px'
      //this.styleData.right = cardInfoClientRect.right - cardCLientRect.right + 'px'
    }
  }
}
</script>

 <style scoped>

  .card__house {
    background: #FFF;
    border-radius: 8px;
    padding: 10px;
    max-width: 300px
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
  }

  svg polygon {
    transition: 0.3s;
    opacity: 0 !important;
    fill: rgb(255 236 68 / 40%) !important;
  }
  svg polygon:hover {
    opacity: 1 !important
  }

  @media (max-width: 960px) {
    .card__house {
      position: fixed !important;
      right: 0 !important;
      left: auto !important;
      top: 0 !important;
    }
  }
</style>
