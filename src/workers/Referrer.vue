<template>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      ref: '',
      refs: [],
      date: []
    }
  },
  created() {

    let referrer = []
    let refs = localStorage.getItem('referrer')
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    this.date = date

    if (refs) {
      referrer = JSON.parse(refs);
    }

    referrer.push({
      url: location.href,
      date: date
    })
    localStorage.setItem('referrer', JSON.stringify(referrer))
  }
}
</script>
