let input = {
  filters: {
    phoneSecret(v) {
      return v ? v.toString().replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-**-**') : v
    },

    phoneType(v) {
      return v ? v.toString().replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4') : v
    },

    price(v) {
      v = v.toString().replace('.', ',')
      return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  }
}

export default input
