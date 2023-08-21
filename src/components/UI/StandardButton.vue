<template>
    <button :class="type">{{ title }}</button>
</template>

<script>
    export default {
        props: ['title','type']
    }
</script>

<style>

</style>