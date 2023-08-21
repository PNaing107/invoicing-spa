<template>
    <header class="p-6 border-b-4 border-indigo-400">
        <div class="flex justify-between w-full">
            <div>
                <h1 class="text-lg font-bold">Mock Invoicing App</h1>
                <h2>There are {{ unpaidInvoiceCount }} unpaid invoices</h2>
            </div>
            <nav class="flex space-x-4">
                <StandardDropdown :title="'Sort By'" :options="sortByOptions"></StandardDropdown>
                <StandardDropdown :title="'Filter By Status'" :options="filterByOptions"></StandardDropdown>
                <StandardDropdown :title="'Results per Page'" :options="paginationOptions"></StandardDropdown>
                <StandardButton :title="'New Invoice'"></StandardButton>
            </nav>
        </div>
    </header>
</template>

<script>
import StandardDropdown from './StandardDropdown.vue';
import StandardButton from './StandardButton.vue';

export default {
    components: {
        StandardDropdown,
        StandardButton
    },
    data() {
        return {
            sortByOptions: ['Invoice Total (ascending)', 'Invoice Total (descending)', 'Date Due (ascending)', 'Date Due (descending)'],
            filterByOptions: ['Paid', 'Pending', 'Cancelled', 'Overdue', 'View All'],
            paginationOptions: [5,10,20,50]
        }
    },
    computed: {
        unpaidInvoiceCount() {
            return this.$store.getters.unpaidInvoiceCount;
        }
    }
}
</script>

<style>

</style>