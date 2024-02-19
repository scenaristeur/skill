import { supabase } from '../../supabase'

const state = () => ({
    locations: [],
    location: {},
    loading: false
})

const mutations = {
  setLocations(state, u){
    state.users = u
  },
}

const actions = {
  async getNearestLocations(context, pos){
    const { data, error } = await supabase.rpc('nearby_users', pos
    // {
    //   lat: 40.807313,
    //   long: -73.946713,
    // }
    )

    console.log("getNearestLocations",data)
  },

async saveLocation(context, location){
  let l= `POINT(${location.longitude} ${location.latitude})`
  let loc = {location: l,user_id: context.rootState.core.session.user.id}
  console.log("location",loc)
  try {
   
    const { data, error } = await supabase.from('users_locations').upsert(loc).eq('user_id',loc.user_id).select()

    let pos ={lat: location.latitude, long: location.longitude}
    context.dispatch("getNearestLocations",pos)


    if (error) {
      console.log("error",error)
      return
    }
  console.log("upserted",data)


}catch(e) {
  console.log("error",e)
}
}
//   async fetchUsers(context) {
//     console.log("fetchUsers")
//     try {
//         context.state.loading = true
//         //const { user } = this.session

//         const { data, error, status } = await supabase
//             .from('users')
//             .select(`id, username, website, avatar_url`)
//         /*.eq('id', user.id)
//         .single()*/

//         if (error && status !== 406) throw error

//         if (data) {
//             console.log(data)
//             context.commit('setUsers', data)
//             /*.map(x=>{
//                 x.src = this.downloadImage(x.avatar_url)
//             })*/
//             /*     username.value = data.username
//                  website.value = data.website
//                  avatar_url.value = data.avatar_url */
//         }
//     } catch (error) {
//         alert(error.message)
//     } finally {
//         context.state.loading = false
//     }
// },


}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
