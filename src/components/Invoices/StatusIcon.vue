<template>
    <div class="flex items-center justify-center border-2 rounded mx-2 my-1 p-1 w-40" :class="styleClasses">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="4" :fill="svgColor" />
        </svg>
        <p>{{ statusName }}</p>
    </div>
</template>

<script>
export default {
    props: ['statusName'],
    computed: {
        svgColor() {
            switch(this.statusName) {
                case 'Paid':
                    return 'rgb(74 222 128)';
                case 'Pending':
                    return 'rgb(250 204 21)';
                case 'Cancelled':
                    return 'rgb(220 38 38)'
                default:
                    return 'rgb(82 82 82)'
            }
        },
        styleClasses() {
            switch(this.statusName) {
                case 'Paid':
                    return 'border-green-400 text-green-400';
                case 'Pending':
                    return 'border-yellow-400 text-yellow-400';
                case 'Cancelled':
                    return 'border-red-600 text-red-400';
                default:
                    return 'border-neutral-600 text-neutral-400';
            }
        }
    }
}
</script>