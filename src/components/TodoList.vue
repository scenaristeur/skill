<template>
    <div class="w-full">
        <h1 class="mb-12 font-bold text-6xl">Todo list.</h1>
        <div class="flex gap-2 my-2">
            <input v-model="task" class="rounded w-full p-2" type="text" placeholder="What are you thinking about?"
                @keyup.enter="insertTask" />
            <button @click="insertTask" class="btn-black">
                Add
            </button>
        </div>

        <div class="bg-black shadow overflow-hidden rounded-md">
            <ul v-for="(todo, index) in todos" :key="index">
                <Todo :todo="todo" />
            </ul>
        </div>
    </div>
</template>
  
<script>
import Todo from './Todo.vue'
export default {
    name: 'TodoList',
    components: {
        Todo,
    },
    props: {
        session: Object
    },
    data() {
        return {
            task: ''
        }
    },
    async created() {
        await this.update()
    },
    methods: {
        async update() {
            this.$store.dispatch('todos/fetchTodos')
        },
        async insertTask() {
            // Guard for short task descriptions which will fail db policy.
            if (this.task.length <= 3) {
                alert('Please make your task a little more descriptive')
                return
            }
            // Type check to ensure user is still logged in.
            if (this.session === null) {
                alert('Please log in again')
                return
            }
            try {
                // Try and write the data to the database.
                const todo = { user_id: this.session.user.id, task: this.task }
                this.$store.dispatch('todos/addTodo', todo)
                this.task = ''
            } catch (err) {
                console.error('Unknown error when adding todo', err)
            }
        }
    },
    computed: {
    todos() {
      return this.$store.state.todos.todos
    },
}

}
</script>
  