<template>
    <div v-if="loading == true">
        ... Loading
    </div>
    <div v-else>
        <h1>Profiles</h1>
        <div v-for="profile in profiles" :key="profile.id">
            <h2>{{ profile.username }}</h2>
            <p>{{ profile.website }}</p>
            <!--<img :src="profile.avatar_url" alt="Avatar" />
            {{profile}}-->
        </div>
    </div>
</template>


<script>
import { supabase } from '../supabase'
export default {
    name: "Profiles",
    props: {
        session: Object
    },
    data() {
        return {
            loading: false,
            profiles: []
        }
    },
    async mounted() {
        this.getProfiles()
    },
    methods: {
        async getProfiles() {
            console.log("getProfiles")
            try {
                this.loading = true
                //const { user } = this.session

                const { data, error, status } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                /*.eq('id', user.id)
                .single()*/

                if (error && status !== 406) throw error

                if (data) {
                    console.log(data)
                    this.profiles = data
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