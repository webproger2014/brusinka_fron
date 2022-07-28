import { ANALITICA } from '../web/config'

let form = {
  data () {
    return {
      leadTarget: 'form-send',
      api: {
        url: 'mail/vevanta',
      },
      formName: '',
      msg: '',
      inputs: {
        phone: '',
        email: '',
        name: '',
        comment: '',
      },
      modalWindow: '',
      dataRequest: {}
    }
  },

  methods: {
    sendForm () {
      if (this.inputs.phone || this.inputs.email) {
        let msg = this.msg
        this.msg = `Форма: ${this.formName} <br/>Имя: ${this.inputs.name} <br/>Телефон: ${this.inputs.phone} <br/>E-mail: ${this.inputs.email} <br/>url: ${location.href}`
        if (msg) {
          this.msg += ` <br/>Комментарий: <br/>${msg}`;
        }

        if (this.inputs.comment) {
          this.msg += ` <br/>Комментарий клиента: ${this.inputs.comment}`
        }

        UIkit.modal(this.modalWindow || this.$root.$refs.modalDefault.$el).hide();
        setTimeout(() => {
          UIkit.modal(this.$root.$refs.modalSuccess.$el).show();
        }, 500)

        let url = new URLSearchParams(location.search)

        let utm = {
          utmSource: url.get('utm_source'),
          utmMedium: url.get('utm_medium'),
          utmCampaign: url.get('utm_campaign'),
          utmTerm: url.get('utm_term'),
          utmContent: url.get('utm_content'),
        }

        let roistat_visit = this.$cookies.get('roistat_visit')

        //> CLIENT GOOGLE ID
        let _ga = this.$cookies.get('_ga')
        let _ym_uid = this.$cookies.get('_ym_uid')

        if (_ga) {
          _ga = _ga.split('.')
          _ga = `${_ga[2]}.${_ga[3]}`
        }

        let dataRequest = {
          ...this.inputs,
          ...this.dataRequest,
          form: this.formName,
          msg: this.msg,
          url: location.href,
          staffId: 3702,
          sourceId: 83,
          company: 1948,
          roistat_visit,
          utm
        }


        if (typeof ym === 'function') {
          ym(ANALITICA.yaId, 'reachGoal', this.leadTarget)
        }

        //История просмотра посещения страниц
        let ref = localStorage.getItem('referrer')
        if (ref) {
          ref = JSON.parse(ref)
        } else {
          ref = []
        }

        this.$axios.post('https://api.vevanta.com/api/lead/add', {
          ...this.inputs,
          form: this.formName,
          msg: this.msg,
          refer: ref,
          url: location.href,
          utm_source: url.get('utm_source'),
          utm_medium: url.get('utm_medium'),
          utm_campaign: url.get('utm_campaign'),
          utm_term: url.get('utm_term'),
          utm_content: url.get('utm_content'),
          origin: 1,
           _ga,
          _ym_uid,
          roistat_visit,
        })

        this.$axios.post(this.api.url, dataRequest)
          .then((rs) => {
            this.inputs.phone = ''
            this.inputs.email = ''
            this.inputs.name = ''
            this.inputs.comment = ''
        })

        localStorage.removeItem('referrer')
        return true
      } else {
        return false
      }
    },
  }
}

export default form
