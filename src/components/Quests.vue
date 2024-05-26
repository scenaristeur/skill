<template>
    <div>
<h1>Quests</h1>
{{ quests}}
    </div>
</template>

<script>
    export default {
        name: "Quests",
        async created() {
            await this.update()
        },
        methods:{   
            async update() {
                this.$store.dispatch('quests/fetchQuests')
            }
    },
    computed:{
        quests(){
            return this.$store.state.quests.quests
        }
    }
}
</script>

<style scoped>

</style>