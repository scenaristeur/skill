<template>
    <div class="w-full">
        <h1 class="mb-12 font-bold text-6xl">Todo List.</h1>
        <div class="flex gap-2 my-2">
            <input v-model="task" class="rounded w-full p-2" type="text" placeholder="What do you need to?"
                @keyup.enter="insertTask" />
            <button @click="insertTask" class="btn-black">
                Add
            </button>
        </div>

        <div class="bg-white shadow overflow-hidden rounded-md">
            <ul v-for="(todo, index) in allTodos" :key="index">
                <Todo :todo="todo" @update="update" />
            </ul>
        </div>
    </div>
</template>
  
<script>
/* eslint-disable @typescript-eslint/camelcase */
//import { defineComponent, ref } from 'vue'
import Todo from './Todo.vue'
import { allTodos, fetchTodos, addTodo } from './vueutils/useTodo'
//import { userSession } from '@/vuetils/useAuth'

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
            allTodos: [],
            task: ''
        }
    },
    async created() {
        await this.update()
    },
    methods: {
        async update() {
            this.allTodos = await fetchTodos()
            console.log("allTodos", this.allTodos)
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
                const todo = await addTodo({ user_id: this.session.user.id, task: this.task })
                this.update()
              /*  console.log("todo", todo)
                // If there was no response, don't do anything.
                if (!todo) {
                    return
                }
                // Otherwise, push the response into allTodos.
                let todos = this.allTodos
                todos.push(todo)
                this.allTodos = todos*/

                // Reset input field.
                this.task = ''
            } catch (err) {
                console.error('Unknown error when adding todo', err)
            }
        }
    }

}
</script>
  