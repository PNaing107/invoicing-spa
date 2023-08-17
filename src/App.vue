<template>
  <!-- <TheHeader :unpaid="unpaidInvoiceCount"></TheHeader> -->
  <!-- <InvoiceList :invoices="invoices"></InvoiceList> -->
  <TheHeader></TheHeader>
  <InvoiceList></InvoiceList>
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

    }
  },
  created() {
    this.$store.dispatch('fetchInvoices');
  },
}
</script>


<style scoped>
</style>
