<template>
  <TheHeader></TheHeader>
  <InvoiceList :invoices="invoices"></InvoiceList>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
import InvoiceList from './components/Invoices/InvoiceList.vue';

export default {
  components: {
    TheHeader,
    InvoiceList
  },
  data() {
    return {
      invoices: {
        error: false,
        data: []
      },
    }
  },
  created() {
    fetch('https://invoicing-api.dev.io-academy.uk/invoices')
      .then(res => res.json())
      .then(res => {
        this.invoices.data = res.data;
        // console.log(res.data);
      })
      .catch(err => {
        this.invoices.error = true;
        this.invoices.data = err;
      })
  }
}
</script>


<style scoped>
</style>
