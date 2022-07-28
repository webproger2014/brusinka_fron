  <template>
  <div class="uk-background-muted uk-padding">
    <div class="uk-child-width-1-2@m uk-child-width-1-1@s" uk-grid>
      <div>
        <div class="fs20 fs30@m fnt-bld uk-margin-medium-bottom">
          {{ formName }}
        </div>
        <div class="uk-margin-small-bottom">
          Ваш ежемесячный платеж составит:
        </div>
        <div class="fs20 fs30@m fnt-semi uk-margin-medium-bottom">
          = от {{ result | price }} тыс. <span class="uk-text-uppercase">р</span>
        </div>
        <button class="btn btn__tpl2 btn__green uk-text-uppercase fs14 fs16@s" @click="openModal">{{ btnName }}</button>
      </div>

      <div class="uk-grid uk-grid-small">
        <div class="uk-width-1-1 uk-margin-small-bottom">
          <div class="">Сумма</div>
          <div class="uk-margin-small-top">
            <input class="uk-range" type="range" min="50000" max="5000000" step="10000" v-model="price" @input="calc">
          </div>
          <div class="uk-inline uk-width-1-1 uk-margin-small-top">
            <span class="uk-form-icon uk-form-icon-flip uk-icon__cl-green">р.</span>
            <input class="uk-input" type="text" v-model="price" @input="calc">
          </div>
        </div>
        <div class="uk-width-1-2@s uk-margin-small-bottom">
          <div>Взнос</div>
          <input class="uk-range uk-margin-small-top" type="range" min="50000" max="5000000" step="10000" v-model="payment" @input="calc">
          <div class="uk-inline uk-margin-small-top uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip uk-icon__cl-green">р.</span>
            <input class="uk-input" type="text" v-model="payment" @input="calc">
          </div>
        </div>
        <div class="uk-width-1-2@s">
          <div>Период</div>
          <input class="uk-range uk-margin-small-top" type="range" min="1" max="50" step="1" v-model="period" @input="calc">
          <div class="uk-inline uk-margin-small-top uk-width-1-1">
            <span class="uk-form-icon uk-form-icon-flip uk-icon__cl-green">лет</span>
            <input class="uk-input" type="text" v-model="period" @input="calc">
          </div>
        </div>
      </div>
    </div>

    <div class="uk-grid uk-grid-small">
      <div class="">
        * Первоначальный взнос 25%
      </div>
      <div class="">
        * Сумма ипотеки с гос поддержкой по ставке 5.9 % 3 000 000 р.
      </div>
    </div>
    
  </div>
</template>

<script>
import input from '../filters/Input.js'

export default {
  name: 'ipoteka',
  mixins: [input],
  props: {
    sum: {
      default: 1000000,
    },
    percent: {
      default: 5.9,
    },
    title: {
      default: 'Купить в ипотеку'
    },
    btnName: {
      default: 'Индивидуальный расчет'
    },
    year: {
      type: Number,
      default: 20,
    },
    classId: {
      type: Number,
    },
    staffId: {
      type: Number
    },
    managerId: {
      type: Number
    },
    sourceId: {
      type: Number
    }
  },
  data() {
    return {
      result: 0,
      price: this.sum,
      period: this.year,
      payment: 50000,
      formName: 'Купить эту квартиру в ипотеку',
    }
  },

  created() {
    this.payment = this.sum*25/100
    this.calc()
    if (this.title) {
      this.formName = this.title
    }
  },

  methods: {
    calc() {
      let summ = this.price - this.payment;
      let percent = this.percent/12/100;
      let period = this.period * 12;
      let kof = percent * Math.pow(1 + percent, period)  / (Math.pow(1 + percent, period) - 1)
      this.result = parseInt(kof * summ);
    },

    openModal() {
      let msg = `Сумма объекта: ${this.sum} \nПервоначальный взнос: ${this.payment} \nПериод: ${this.period} \nПроцентная ставка: ${this.percent} \nОплата в месяц: ${this.result}`

      let lead = {
        formName: this.formName,
      }

      if (this.staffId !== undefined) {
        lead.staffId = this.staffId
      }

      if (this.managerId !== undefined) {
        lead.managerId = this.managerId
      }

      if (this.classId !== undefined) {
        lead.classId = this.classId
      }

      if (this.sourceId !== undefined) {
        lead.sourceId = this.sourceId
      }

      this.$root.$refs.modalDefault.openModal(lead, msg);
    }
  }
}
</script>
