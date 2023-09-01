<template>
<div>
    <p v-if="title"> {{ title }}</p>
    <p> {{ lead }}</p>
</div>
</template>
        
<script>
export default {
    props: {
    title: {
        type: String,
        default: '',
        required: false,
    },
    lead: {
        type: String,
        default: '',
        // required: true
    },
    },
}
</script>

