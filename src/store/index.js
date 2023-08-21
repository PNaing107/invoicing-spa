import { createStore } from "vuex";

const store = createStore(
    {
        state() {
            return {
                invoices: {
                    error: false,
                    data: []
                },
                sortBy: '',
                filterBy: 'View All',
                resultsPerPage: 'All',
                paginationState: {
                    pageCount: 1,
                    currentPage: 1,
                    resultCount: 0
                },
            }
        },
        mutations: {
            updateSortBy(state, {option}) {
                state.sortBy = option;
            },
            updateFilterBy(state, {option}) {
                state.filterBy = option;
            },
            updateResultsPerPage(state, {option}) {
                state.resultsPerPage = option;
            },
            incrementPage(state) {
                if(state.paginationState.currentPage < state.paginationState.pageCount) {
                    state.paginationState.currentPage++;
                }
            },
            decrementPage(state) {
                if(state.paginationState.currentPage > 1) {
                    state.paginationState.currentPage--;
                }
            },
        },
        actions: {
            fetchInvoices(context) {
                fetch('https://invoicing-api.dev.io-academy.uk/invoices')
                .then(res => res.json())
                .then(res => {
                  context.state.invoices.data = res.data;
                })
                .catch(err => {
                  context.state.invoices.error = true;
                  context.state.invoices.data = err;
                })
            },
            selectionHandler(context, {group, option}) {
                switch(group) {
                    case 'Sort By':
                        context.commit('updateSortBy', {option: option});
                        break;
                    case 'Filter By Status':
                        context.commit('updateFilterBy',  {option: option});
                        break;
                    case 'Results per Page':
                        context.commit('updateResultsPerPage',  {option: option});
                        break;
                    default:
                        console.log('Error: Unknown selection (store.selectionHandler)');
                }
            }
        },
        getters: {
            unpaidInvoiceCount(state) {
                return state.invoices.data.filter(invoice => {return invoice.status == 2}).length;
            },
            filteredResults(state) {
                if(state.filterBy === 'View All') {
                    return state.invoices.data;
                } else {
                    return state.invoices.data.filter((invoice) => {
                        return invoice.status_name === state.filterBy;
                    });
                }
            },
            sortedResults(state, getters) {
                const filteredResults = getters.filteredResults;

                return (() => {
                    switch(state.sortBy) {
                        case 'Invoice Total (ascending)':
                            return filteredResults.sort((a, b) => parseFloat(a.invoice_total) - parseFloat(b.invoice_total));
                        case 'Invoice Total (descending)':
                            return filteredResults.sort((a, b) => parseFloat(b.invoice_total) - parseFloat(a.invoice_total));
                        case 'Date Due (ascending)':
                            return filteredResults.sort((a, b) => new Date(a.due) - new Date(b.due));
                        case 'Date Due (descending)':
                            return filteredResults.sort((a, b) => new Date(b.due) - new Date(a.due));
                        default:
                            return filteredResults;
                    }
                })();
            },
            paginatedResult(state, getters) {
                const sortedResults = getters.sortedResults;

                if(state.resultsPerPage === 'All') {
                    return sortedResults;
                } else {
                    state.paginationState.resultCount = sortedResults.length;

                    // number of pages
                    const pageCount = Math.ceil(sortedResults.length / state.resultsPerPage);
                    state.paginationState.pageCount = pageCount;

                    // extracted portion of results
                    const start = (state.paginationState.currentPage - 1) * state.resultsPerPage;
                    const end = start + state.resultsPerPage;

                    return sortedResults.slice(start, end);
                }
            },
            paginationStateString(state) {
                if(state.resultsPerPage === 'All') {
                    return 'Showing All Results';
                } else {
                    if(state.paginationState.currentPage === state.paginationState.pageCount) {
                        return `Showing ${(state.paginationState.currentPage - 1) * state.resultsPerPage + 1} to ${state.paginationState.resultCount} out of ${state.paginationState.resultCount}`;
                    }
                    return `Showing ${(state.paginationState.currentPage - 1) * state.resultsPerPage + 1} to ${state.paginationState.currentPage * state.resultsPerPage} out of ${state.paginationState.resultCount}`;
                }
            }
        }
    }
)

export default store;