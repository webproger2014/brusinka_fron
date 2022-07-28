export default {
  data() {
    return {
      formatPhone: '',
      cadastralNumber: '',
    }
  },
  methods: {
    phoneMask(val) {
      let currentPhone = "";
      this.formatPhone = val.replace(/[\D]/gi, "");
      if (this.formatPhone.length >= 0) {
        if (
          this.formatPhone.startsWith("7") ||
          this.formatPhone.startsWith("8")
        )
          this.formatPhone = this.formatPhone.slice(1);
        currentPhone += "+7";
      }
      if (this.formatPhone.length >= 1) {
        currentPhone += `(${this.formatPhone.slice(0, 3)}`;
      }
      if (this.formatPhone.length > 3) {
        currentPhone += `) ${this.formatPhone.slice(3, 6)}`;
      }
      if (this.formatPhone.length > 6) {
        currentPhone += `-${this.formatPhone.slice(6, 8)}`;
      }
      if (this.formatPhone.length > 8) {
        currentPhone += `-${this.formatPhone.slice(8, 10)}`;
      }
      if (this.formatPhone.length == 10) {
        this.inputs.phone = this.inputs.phone.slice(0, 10);
      }
      this.inputs.phone = currentPhone;
    },
    cadastralMask(val) {
      let currentNumber = "";
      this.formatNumber = val.replace(/[\D]/gi, "");
      if (this.formatNumber.length > 0) {
        currentNumber += this.formatNumber.slice(0, 2)
      }
      if (this.formatNumber.length > 2) {
        currentNumber += `:${this.formatNumber.slice(2, 4)}`;
      }
      if (this.formatNumber.length > 4) {
        currentNumber += `:${this.formatNumber.slice(4, 11)}`;
      }
      if (this.formatNumber.length > 11) {
        currentNumber += `:${this.formatNumber.slice(11, 15)}`;
      }
      this.inputs.cadastral_number = currentNumber;
    }
  },
  watch: {
    'inputs.phone'(val) {
      this.phoneMask(val);
    },
    'inputs.cadastral_number'(val) {
      this.cadastralMask(val)
    }
  },
};