<template>
    <div v-if="this.$store.state.invoices.error">The following error has occurred when trying to fetch the invoices:\n {{ invoices.data }}</div>
    <div v-else-if="! invoiceSearchResults.length" class="text-center">There are no results.</div>
    <div v-else v-for="invoice in invoiceSearchResults" :key="invoice.id" class="flex justify-between border-2 rounded-md mx-8 my-4 px-1">
        <div class="flex justify-between items-center space-x-4">
            <p class="font-bold">#{{ invoice.invoice_id }}</p>
            <p>Due {{ formatDate(invoice.due) }}</p>
            <p>{{ invoice.name }}</p>
        </div>
        <div class="flex justify-between items-center space-x-4">
            <p>£{{ invoice.invoice_total }}</p>
            <StatusIcon :statusName="invoice.status_name"></StatusIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
        </div>
    </div>
</template>

<script>
import StatusIcon from './StatusIcon.vue';

export default {
    components: { StatusIcon},
    // props: ['invoices'],
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: "2-digit", month: "long", year: "numeric" };
            return date.toLocaleDateString("en-US", options);  
        }
    },
    computed: {
        invoiceSearchResults() {
            return this.$store.getters.invoiceSearchResults;
        }
    }
}
</script>