import { supabase } from '../../supabase'

const state = () => ({
    todos: []
})

const mutations = {
  setTodos(state, t){
    state.todos = t
  },
}

const actions = {
  /**
 * Retrieve all todo for the signed in user
 */
async fetchTodos(context) {
  try {
    const { data: todos, error } = await supabase.from('todos').select('*').order('id')

    if (error) {
      console.log('error', error)
      return
    }
    // handle for when no todos are returned
    if (todos === null) {
      context.commit('setTodos', [])
      return
    }
    context.commit('setTodos', todos)
    return todos
  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
},
/**
 *  Add a new todo to supabase
 */
async addTodo(context, todo){
  try {
    const { data, error } = await supabase.from('todos').insert(todo).single()

    if (error) {
      alert(error.message)
      console.error('There was an error inserting', error)
      return null
    }

    console.log('created a new todo', data)
    context.dispatch('fetchTodos')
    return data
  } catch (err) {
    alert('Error')
    console.error('Unknown problem inserting to db', err)
    return null
  }
},
/**
 * Targets a specific todo via its record id and updates the is_completed attribute.
 */
async updateTaskCompletion( context,data) {
 
  const {todo, isCompleted} = data
  console.log(data, todo, isCompleted)
  try {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', todo.id)
      .single()

    if (error) {
      alert(error.message)
      console.error('There was an error updating', error)
      return
    }

    console.log('Updated task', todo.id)
    context.dispatch('fetchTodos')
  } catch (err) {
    alert('Error')
    console.error('Unknown problem updating record', err)
  }
},

/**
 *  Deletes a todo via its id
 */
async  deleteTodo(context,todo) {
  try {
    await supabase.from('todos').delete().eq('id', todo.id)
    console.log('deleted todo', todo.id)
    context.dispatch('fetchTodos')
  } catch (error) {
    console.error('error', error)
  }
}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
