<template>
    <div>
        <div v-html="content"></div>
    </div>
</template>
    
<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>