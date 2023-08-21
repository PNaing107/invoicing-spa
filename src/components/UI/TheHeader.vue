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
                <StandardButton :title="'New Invoice'" :type="'btn-primary'"></StandardButton>
            </nav>
            <div class="flex flex-col">
                <p>{{ paginationStateString }}</p>
                <div v-if="!paginationStateString.includes('All')" class="flex">
                    <StandardButton v-if="showPreviousPageButton" :title="'Previous'" :type="'btn-secondary'" class="mr-1" @click="pageHandler('decrement')"></StandardButton>
                    <StandardButton v-if="showNextPageButton" :title="'Next'" :type="'btn-secondary'" class="grow" @click="pageHandler('increment')"></StandardButton>
                </div>
            </div>
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
            paginationOptions: [5,10,20,50, 'All']
        }
    },
    methods: {
        pageHandler(direction) {
            if(direction === 'increment') {
                this.$store.commit('incrementPage');
            } else {
                this.$store.commit('decrementPage');
            }
        }
    },
    computed: {
        unpaidInvoiceCount() {
            return this.$store.getters.unpaidInvoiceCount;
        },
        paginationStateString() {
            return this.$store.getters.paginationStateString;
        },
        showNextPageButton() {
            return this.$store.state.paginationState.pageCount > this.$store.state.paginationState.currentPage;
        },
        showPreviousPageButton() {
            return this.$store.state.paginationState.currentPage > 1;
        }
    }
}
</script>

<style>

</style>