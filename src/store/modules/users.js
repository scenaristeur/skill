import { supabase } from '../../supabase'

const state = () => ({
    users: [],
    loading: false
})

const mutations = {
  setUsers(state, u){
    state.users = u
  },
}

const actions = {
  /**
 * Retrieve all todo for the signed in user
 */
  async fetchUsers(context) {
    console.log("fetchUsers")
    try {
        context.state.loading = true
        //const { user } = this.session

        const { data, error, status } = await supabase
            .from('users')
            .select(`username, website, avatar_url`)
        /*.eq('id', user.id)
        .single()*/

        if (error && status !== 406) throw error

        if (data) {
            console.log(data)
            context.commit('setUsers', data)
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
        context.state.loading = false
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

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
