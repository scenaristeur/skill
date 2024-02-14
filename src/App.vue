<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import Profiles from './components/Profiles.vue'
import { supabase } from './supabase'
import TodoList from './components/TodoList.vue'
import Graph from './components/Graph.vue'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
    <Graph v-if="session" :session="session"/>
    <TodoList v-if="session" :session="session"/>
    <Profiles v-if="session" :session="session"/>

  </div>
</template>