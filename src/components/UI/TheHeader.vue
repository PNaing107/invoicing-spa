<template>
    <header>
        <div>
            <h1>Mock Invoicing App</h1>
            <controls>
                <StandardDropdown :title="'Sort By'" :options="sortByOptions"></StandardDropdown>
                <StandardDropdown :title="'Filter By Status'" :options="filterByOptions"></StandardDropdown>
                <StandardButton :title="'New Invoice'"></StandardButton>
            </controls>
        </div>
        <p>There are 68 unpaid invoices</p>
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