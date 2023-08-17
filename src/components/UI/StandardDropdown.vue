<template>
    <div class="relative inline-block text-left">
                    <div>
                        <button @click="toggleMenuItems" type="button" class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-4   bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                        {{ title }}
                        <!-- Heroicon name: chevron-down -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down pl-1" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </button>
                    </div>

                    <!--
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    -->
                    <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" :class="{hidden: toggleButtonState}">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a
                          v-for="option in options"
                          :key="option"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          href="#"
                          role="menuitem"
                          value="option"
                          @click="$emit('dropdownSelection',title,option)"
                        >
                        {{ option }}
                        </a>
                        </div>
                    </div>
                </div>
</template>

<script>
    export default {
        props: ['title', 'options'],
        data() {
            return {
                toggleButtonState: true
            };
        },
        methods: {
            toggleMenuItems() {
                this.toggleButtonState = ! this.toggleButtonState;
            }
        }
    }
</script>

<style>

</style>