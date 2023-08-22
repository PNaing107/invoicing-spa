<template>
    <div v-if="this.$store.state.invoices.error">The following error has occurred when trying to fetch the invoices:\n {{ invoices.data }}</div>
    <div v-else-if="! paginatedResult.length" class="text-center">There are no results.</div>
    <div v-else v-for="invoice in paginatedResult" :key="invoice.id" class="flex justify-between border-2 rounded-md mx-8 my-4 px-1" @click="showModal(invoice.id)">
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
    <Modal v-show="isModalVisable" @close="closeModal">
            <template v-slot:header>
                <p class="font-bold">{{ invoiceData.error ? "An Error has occured whilst trying to fetch the data." : '#' + invoiceData.data.invoice_id }}</p>
            </template>

            <template v-slot:body>
                <p v-if="invoiceData.error">{{ invoiceData.data }}</p>
                <div class="mx-2">
                    <div class="flex justify-between">
                    <div class="mr-8">
                        <div>
                            <p class="font-semibold">From</p>
                            <p>Kermit the Frog</p>
                            <p>Kermit's Swamp</p>
                            <p>Beverly Hills</p>
                            <p>California</p>
                        </div>
                        <div>
                            <p class="font-semibold mt-1">To</p>
                            <p>{{ invoiceData.data.name }}</p>
                            <p>{{ invoiceData.data.street_address }}</p>
                            <p>{{ invoiceData.data.city }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold">Status</p>
                        <StatusIcon :statusName="invoiceData.data.status_name" class="mx-0"></StatusIcon>
                        <p class="font-semibold">Created</p>
                        <p>{{ formatDate(invoiceData.data.created) }}</p>
                        <p class="font-semibold">Due</p>
                        <p>{{ formatDate(invoiceData.data.due) }}</p>
                    </div>
                </div>
                <table class="w-full divide-y divide-solid text-center border-separate border-spacing-y--1">
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                    <tr v-for="detail in invoiceData.data.details" :key="detail.description ? detail.description : Math.ceil(Math.random()*100)">
                        <td>{{ detail.description }}</td>
                        <td>{{ detail.quantity }}</td>
                        <td>{{ detail.rate }}</td>
                        <td>£{{ detail.total }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Paid to Date</td>
                        <td>£{{ invoiceData.data.paid_to_date }}</td>
                    </tr>
                    <tr :class="totalDueColor(invoiceData.data.status_name)">
                        <td></td>
                        <td></td>
                        <td class="font-semibold">Total Due</td>
                        <td>£{{ invoiceData.data.invoice_total - invoiceData.data.paid_to_date }}</td>
                    </tr>
                </table>
                <div v-if="invoiceData.data.status_name === 'Pending'">
                    <p v-if="paymentIsOverdue(invoiceData.data.due)" class="mt-1">This payment is overdue.</p>
                </div>
                </div>
            </template>

            <template v-slot:footer>

            </template>
    </Modal>
</template>

<script>
import StatusIcon from './StatusIcon.vue';
import Modal from '../UI/Modal.vue';

export default {
    components: { StatusIcon, Modal },
    data() {
        return {
            isModalVisable: false,
            invoiceData: {
                error: false,
                data: {}
            }
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: "2-digit", month: "long", year: "numeric" };
            return date.toLocaleDateString("en-US", options);  
        },
        showModal(id) {
            fetch(`https://invoicing-api.dev.io-academy.uk/invoices/${id}`)
                .then(res => res.json())
                .then(res => this.invoiceData.data = res.data)
                .catch(err => {
                    this.invoiceData.error = true;
                    this.invoiceData.data = err.message;
                })
            
            this.isModalVisable = true;
        },
        closeModal() {
            console.log('close');
            this.isModalVisable = false;
        },
        totalDueColor(status) {
            switch(status) {
                case 'Paid':
                    return 'bg-green-400';
                case 'Pending':
                    return 'bg-yellow-400';
                case 'Cancelled':
                    return 'bg-neutral-600';
            }
        },
        paymentIsOverdue(dateString) {
            const date = new Date(dateString);
             return date < Date.now();
        }
    },
    computed: {
        paginatedResult() {
            return this.$store.getters.paginatedResult;
        }
    }
}
</script>