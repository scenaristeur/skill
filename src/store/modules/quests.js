import { supabase } from "../../supabase";

const state = () => ({
  quests: ["one", "two"],
});

const mutations = {
  setQuests(state, q) {
    state.quests = q;
  },
};

const actions = {
  /**
   * Retrieve all todo for the signed in user
   */
  async fetchQuests(context) {
    //let session = context.rootState.core.session;
    try {
      const { data: quests, error } = await supabase.from("quests").select(
        `id,
        created_at,
        name`
      );
      console.log("Quests", quests);
      if (error) {
        console.log("error", error);
        return;
      }
      context.commit("setQuests", quests);
      //return todos
    } catch (err) {
      console.error("Error retrieving quests from db", err);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
