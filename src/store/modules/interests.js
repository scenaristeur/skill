import { supabase } from "../../supabase";

const state = () => ({
  interests: [],
  myInterests: []
});

const mutations = {
  setInterests(state, i) {
    state.interests = i;
  },
  setMyInterests(state, i) {
    state.myInterests = i;
  },
};

const actions = {
    /**
   * Retrieve all todo for the signed in user
   */
    async fetchMyInterests(context) {
      let session = context.rootState.core.session;
      try {
        const { data: myInterests, error } = await supabase
          .from("users_interests")
          .select(
            `user_id,
        interests(id, name),
        active`
          )
          .eq('user_id', session.user.id)
        console.log("MyInterests", myInterests);
        if (error) {
          console.log("error", error);
          return;
        }
        // handle for when no todos are returned
        if (myInterests === null) {
          context.commit("setMyInterests", []);
          return;
        }

let mI = myInterests.map(i => {
  return {
    id: i.interests.id,
    name: i.interests.name,
    active: i.active,
    user_id: i.user_id
  }
})
console.log("mI",mI)
        context.commit("setMyInterests", mI);
        //return todos
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
  /**
   * Retrieve all todo for the signed in user
   */
  async fetchInterests(context) {
    try {
      const { data: interests, error } = await supabase
        .from("users_interests")
        .select(
          `user_id,
      interests(id, name),
      active`
        );
      console.log("Interests", interests);
      if (error) {
        console.log("error", error);
        return;
      }
      // handle for when no todos are returned
      if (interests === null) {
        context.commit("setInterests", []);
        return;
      }
      context.commit("setInterests", interests);
      //return todos
    } catch (err) {
      console.error("Error retrieving data from db", err);
    }
  },
  /**
   *  Add a new todo to supabase
   */
  async addInterest(context, interest) {
    console.log("inserting", interest)
    try {
      let existing = null
      let test_if_exist = await supabase
        .from("interests")
        .select('*')
        .eq("name", interest.name)

      if (test_if_exist.data.length == 0){
        let insert_interest= await supabase
        .from("interests")
        .insert({name:interest.name})
        .single()
        console.log("created a new interest", insert_interest);

   
      }
      let getinterest = await supabase
      .from("interests")
      .select('*')
      .eq("name", interest.name)

      existing = getinterest.data[0]
      console.log("existing", existing);

      let insert_users_interests= await supabase
      .from("users_interests")
      .insert({user_id:interest.user_id, interest_id:existing.id, active:true})
      .single()

     

        context.dispatch("fetchMyInterests");
  
    } catch (err) {
      alert("Error");
      console.error("Unknown problem inserting to db", err);
      return null;
    }
  },
  /**
   * Targets a specific todo via its record id and updates the is_completed attribute.
   */
  async updateInterestSelection(context, data) {
    const { interest, active } = data;
    let session = context.rootState.core.session;
    console.log(data, interest, active);
    try {
      const { error } = await supabase
        .from("users_interests")
        .update({ active: active })
        .eq("user_id", session.user.id)
        .eq("interest_id", interest.id)
        .single();

      if (error) {
        alert(error.message);
        console.error("There was an error updating", error);
        return;
      }

      console.log("Updated interest");
      context.dispatch("fetchInterests");
    } catch (err) {
      alert("Error");
      console.error("Unknown problem updating record", err);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
