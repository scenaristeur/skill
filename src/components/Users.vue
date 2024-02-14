<template>
    <div v-if="loading == true">
        ... Loading users
    </div>
    <div v-else>
        <h1>Users</h1>
        <div v-for="user in users" :key="user.id">
            <h2>{{ user.username }}</h2>
            <p>{{ user.website }}</p>
            <!--<img :src="user.avatar_url" alt="Avatar" />
            {{user}}-->
        </div>
    </div>
</template>


<script>
import { supabase } from '../supabase'
export default {
    name: "Users",
    props: {
        session: Object
    },
    async mounted() {
        this.$store.dispatch('users/fetchUsers')
    },
    computed: {
        users() {
            return this.$store.state.users.users
        },
        loading() {
            return this.$store.state.users.loading
        },
    }
}


</script>