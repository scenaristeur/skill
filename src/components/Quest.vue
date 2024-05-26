<template>
<li>{{quest}}</li>
</template>

<script>
    export default {
        name: "Quest",
        props: {
      quest: {
        type: Object,
        required: true,
      },
    },
    created() {
        console.log("QUEST",this.quest)
    }
    }
</script>

<style scoped>

</style>