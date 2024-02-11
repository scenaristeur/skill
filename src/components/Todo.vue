<template>
    <li
      class="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div class="flex items-center px-4 py-4 sm:px-6">

        <div style="margin-right: 10px;">
          <input
            @click="updateTaskCompletion()"
            class="cursor-pointer"
            type="checkbox"
            :checked="todo['is_complete']"
          />
        </div>

        
        <div class="min-w-0 flex-1 flex items-center">
          <div class="text-sm leading-5 font-medium truncate">{{ todo.task }}</div>
        </div>

        <button @click="clearTodo" class="w-4 h-4 ml-2 border-2 hover:border-black rounded">
          <!--<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" aria-label="delete">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>-->
          <span style="font-size:20px">
            &#x1f5d1;
        </span>
  
        </button>
      </div>
    </li>
  </template>
  
  <script >

  import { updateTaskCompletion, deleteTodo } from './vueutils/useTodo'
  import { allTodos } from './vueutils/useTodo'
  
  export default {
    name: 'Todo',
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },
    created() {
      this.allTodos = allTodos
      console.log("allTodos in Todo.vue", this.allTodos)
    },
    methods:{
        async clearTodo() {
        await deleteTodo(this.todo)
       /* .then(() => {
          allTodos.value = allTodos.value.filter(todo => todo.id != props.todo.id)
        })*/
        this.$emit('update')
      },
      async updateTaskCompletion() {
        let is_complete = !this.todo['is_complete']
       await  updateTaskCompletion(this.todo, is_complete)
        this.$emit('update')
      }
    }
  /*  setup(props) {
      // Removes todo from supbase and also from app state
      function clearTodo() {
        deleteTodo(props.todo).then(() => {
          allTodos.value = allTodos.value.filter(todo => todo.id != props.todo.id)
        })
      }
  
      return { updateTaskCompletion, clearTodo }
    },*/
  }
  </script>
  
  <style lang="scss" scoped></style>
  