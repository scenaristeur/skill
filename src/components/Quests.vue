<template>
  <div class="row">
    <h1>Quests</h1>

    <div class="card p-3 m-3" style="width: 18rem" v-for="quest in quests" :key="quest.id">
      <h3>{{ quest.name }}</h3>
      <button type="button" class="btn btn-success">Découvrir</button>
    </div>
  </div>
</template>

<script>
// import Quest from './Quest.vue'
export default {
  name: "Quests",
  async mounted() {
    await this.update();
  },
  methods: {
    async update() {
      this.$store.dispatch("quests/fetchQuests");
    },
  },
  computed: {
    quests() {
      return this.$store.state.quests.quests;
    },
  },
};
</script>

<style scoped></style>
