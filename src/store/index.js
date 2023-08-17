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
            }
        },
        getters: {
            unpaidInvoiceCount(state) {
                return state.invoices.data.filter(invoice => {return invoice.status == 2}).length;
            },
            invoiceSearchResults(state) {
                return state.invoices.data;
                // TODO: Handle Filtering, Pagination and Sorting
            }
        }
    }
)

export default store;