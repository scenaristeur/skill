<template>
    <div v-if="loading == true">
        ... Loading
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
    data() {
        return {
            loading: false,
            users: []
        }
    },
    async mounted() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            console.log("getUsers")
            try {
                this.loading = true
                //const { user } = this.session

                const { data, error, status } = await supabase
                    .from('users')
                    .select(`username, website, avatar_url`)
                /*.eq('id', user.id)
                .single()*/

                if (error && status !== 406) throw error

                if (data) {
                    console.log(data)
                    this.users = data
                    /*.map(x=>{
                        x.src = this.downloadImage(x.avatar_url)
                    })*/
                    /*     username.value = data.username
                         website.value = data.website
                         avatar_url.value = data.avatar_url */
                }
            } catch (error) {
                alert(error.message)
            } finally {
                this.loading = false
            }
        },
        async downloadImage(path) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) throw error
                let img_url = URL.createObjectURL(data)
                console.log(img_url)
                return img_url
            } catch (error) {
                console.error('Error downloading image: ', error.message)
                return null
            }
        }

    }
}


</script>