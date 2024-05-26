<template>
    <div class="w-full">
        <h1 class="mb-12 font-bold text-6xl">My interests</h1>
        <div class="flex gap-2 my-2">
            <input v-model="name" class="rounded w-full p-2" type="text" placeholder="What are you interested in?"
                @keyup.enter="insertInterest" />
            <button @click="insertInterest" class="btn-black">
                Add
            </button>
        </div>

        <div class="bg-black shadow overflow-hidden rounded-md">
            <!-- {{  myInterests }} -->
            <ul  >
               <!-- {{  myInterest}} -->
                <!-- <Todo :todo="todo" /> -->
                <Interest :interest="myInterest" v-for="(myInterest, index) in myInterests" :key="index"/>
            </ul>
        </div>
    </div>
</template>
  
<script>
import Interest from './Interest.vue'
export default {
    name: 'MyInterests',
    components: {
        Interest,
    },
    data() {
        return {
            name: ''
        }
    },
    async created() {
   
        await this.update()
    },
    methods: {
        async update() {
            this.$store.dispatch('interests/fetchMyInterests')
        },
        async insertInterest() {
            // Guard for short task descriptions which will fail db policy.
            if (this.name.length <= 3) {
                alert('Please make your interest a little more descriptive')
                return
            }
            // Type check to ensure user is still logged in.
            if (this.session === null) {
                alert('Please log in again')
                return
            }
            try {
                // Try and write the data to the database.
                const interest = { user_id: this.session.user.id, name: this.name }
                this.$store.dispatch('interests/addInterest', interest)
                this.name = ''
            } catch (err) {
                console.error('Unknown error when adding interest', err)
            }
        }
    },
    computed: {
    myInterests() {
      return this.$store.state.interests.myInterests
    },
    session() {
      return this.$store.state.core.session
    },
}

}
</script>
  