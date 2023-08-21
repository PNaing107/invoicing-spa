import { createStore } from "vuex";

const store = createStore(
    {
        state() {
            return {
                invoices: {
                    error: false,
                    data: []
                },
                sortBy: 'Invoice Reference',
                filterBy: 'View All',
                resultsPerPage: 50
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
            invoiceSearchResults(state) {
                // Filter results
                let filteredResults;

                if(state.filterBy === 'View All') {
                    filteredResults = state.invoices.data;
                } else {
                    filteredResults = state.invoices.data.filter((invoice) => {
                        return invoice.status_name === state.filterBy;
                    });
                }

                // Sort results
                const sortedResults = (() => {
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

                return sortedResults;
                
                // TODO: Handle Pagination
            }
        }
    }
)

export default store;