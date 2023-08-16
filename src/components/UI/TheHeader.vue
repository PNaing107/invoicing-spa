<template>
    <header class="p-6 border-b-4 border-indigo-400">
        <div class="flex justify-around w-full">
            <div>
                <h1 class="text-lg font-bold">Mock Invoicing App</h1>
                <h2>There are 68 unpaid invoices</h2>
            </div>
            <nav class="flex space-x-4">
                <StandardDropdown :title="'Sort By'" :options="sortByOptions"></StandardDropdown>
                <StandardDropdown :title="'Filter By Status'" :options="filterByOptions"></StandardDropdown>
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
            sortByOptions: ['Invoice Reference', 'Invoice Total', 'Date Created', 'Date Due'],
            filterByOptions: ['Paid', 'Pending', 'Cancelled', 'Overdue', 'View All']
        }
    }
}
</script>

<style>

</style>