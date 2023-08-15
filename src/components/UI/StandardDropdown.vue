<template>
    <label :for="title">{{ title }}</label>
    <select id>
        <option :key="option" v-for="option in options" value="">{{ option }}</option>
    </select>
</template>

<script>
    export default {
        props: ['title', 'options']
    }
</script>

<style>

</style>