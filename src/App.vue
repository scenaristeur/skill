<template>
  <div class="container" style="padding: 50px 0 100px 0">

    <Account v-if="session" :session="session" />
    <Auth v-else />
    <Graph v-if="session" :session="session" />
    <MyInterests v-if="session"/>
    <TodoList v-if="session" :session="session" />

    <Users v-if="session" :session="session" />

  </div>
</template>


<script>
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import Users from './components/Users.vue'
import { supabase } from './supabase'
import TodoList from './components/TodoList.vue'
import Graph from './components/Graph.vue'

import MyInterests from './components/MyInterests.vue';

export default {
  name: "App",
  components: {
    Account,
    Auth,
    Users,
    TodoList,
    Graph,
    MyInterests
  },
  data() {
    return {
      session: null
    }
  },

  mounted() {
    const app = this
    supabase.auth.getSession().then(({ data }) => {
      app.session = data.session
      app.$store.commit('core/setSession', data.session)
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      app.session = _session
      app.$store.commit('core/setSession', _session)
    })
  },

}
</script>