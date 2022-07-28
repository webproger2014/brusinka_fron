  <template>
  <div class="uk-background-muted uk-padding">
    <div class="uk-grid" uk-height-match>
      <div class="uk-width-1-3@m uk-width-1-1">
        <div class="uk-margin-small-bottom">Сумма</div>
        <input class="uk-input uk-margin-small-bottom" type="text" v-model="price" @input="calc">
        <div class="uk-margin-small-bottom">Первоначальный взнос<span> ({{ Math.round((payment * 100 / price)*100)/100 }}%)</span></div>
        <input class="uk-input uk-margin-small-bottom" type="text" v-model="payment" @input="calc">
        <div class="uk-margin-small-bottom">Период, лет</div>
        <input class="uk-input uk-margin-small-bottom" type="text" v-model="period" @input="pluralize">
        <div class="uk-margin-small-bottom uk-margin-small-top ">Cумма кредита: <span class="fnt-bld fs18">{{price - payment | price}} р.</span> </div>
        <button class="btn btn__tpl2 btn__green uk-text-uppercase fs14 fs16@s" @click="openModal">{{ btnName }}</button>
      </div>
      <div class="uk-width-2-3@m uk-width-1-1">
        <div class="uk-height-medium uk-overflow-auto">
          <ul class="uk-list uk-list-striped uk-list-collapse uk-background-default list__green">
            <li class="uk-flex uk-flex-middle uk-flex-between uk-flex-wrap" v-for="bank in banks" :key="bank.id">
              <div class="uk-flex uk-width-1-1@s uk-margin-small-top uk-margin-small-bottom uk-width-1-2@l uk-flex-middle">
                <img :src="bank.logo" width="50px" height="50px" class="uk-border-circle"></img>
                <div class="fs18 fnt-bld uk-width-1-2 uk-margin-small-left uk-margin-small-right">{{bank.bank}}</div>
              </div>
              <div class="uk-flex uk-width-1-1@s uk-margin-small-top uk-margin-small-bottom uk-width-1-2@l">
                <div class="uk-flex-column uk-width-1-3"><div class="uk-margin-small-bottom fnt-bld">Ставка</div><div> {{bank.percent}}%</div></div>
                <div class="uk-flex-column uk-width-1-3"><div class="uk-margin-small-bottom fnt-bld">Срок</div><div> {{period}}  {{plural}}</div></div>
                <div class="uk-flex-column uk-width-1-3"><div class="uk-margin-small-bottom fnt-bld">В месяц</div><div> {{calc(bank.percent) | price}} Р</div></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import input from '../filters/Input.js'

export default {
  name: 'ipoteka-calc',
  mixins: [input],
  props: {
    sum: {
      default: 1000000,
    },
    percent: {
      default: 20,
    },
    title: {
      default: 'Купить в ипотеку'
    },
    btnName: {
      default: 'Индивидуальный расчет'
    },
    year: {
      type: Number,
      default: 10,
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
    },
  },
  data() {
    return {
      result: 0,
      price: this.sum,
      period: this.year,
      payment: this.sum*0.2,
      plural: 'лет',
      banks: []
    }
  },

  created() {
    this.getData()
    this.calc()
    if (this.title) {
      this.formName = this.title
    }
  },

  methods: {
    calc(val) {
      let summ = this.price - this.payment;
      let percent = val/12/100;
      let period = this.period * 12;
      let kof = percent * Math.pow(1 + percent, period)  / (Math.pow(1 + percent, period) - 1)
      let annui = parseInt(kof * summ); //annui = аннуитетный платеж
      return annui;
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

      lead.leadTarget = 'send-quiz'

      this.$root.$refs.modalDefault.openModal(lead, msg);
    },

    pluralize() {
      let n = parseInt(this.period)

      if(n % 10 === 1 && n % 100 !== 11) {
        this.plural = 'год'
      } else if(n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        this.plural = 'года'
      } else this.plural = 'лет'
    },

    getData() {

      this.$axios
      .post("/banks/get_banks")
      .then((res) => {
        this.banks = res.data
      })

    }
  }
}
</script>

<style scoped>
/*mortgage calc bank list*/
.list__green > :nth-of-type(odd) {
  background:#e5f8f7;
}
</style>
