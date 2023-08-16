<template>
    <div v-if="invoices.error">The following error has occurred when trying to fetch the invoices:\n {{ invoices.data }}</div>
    <div v-else v-for="invoice in invoices.data" :key="invoice.id">
        <div>
            <p>{{ invoice.invoice_id }}</p>
            <p>Due {{ invoice.due }}</p>
            <p>{{ invoice.name }}</p>
        </div>
        <div>
            <p>£{{ invoice.invoice_total }}</p>
            <div>{{ invoice.status_name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['invoices'],
}
</script>