import actions from './actions'
// import getters from './getters';
import mutations from './mutations'

export const state = {
  modal: {
    content: null,
    props: null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  // getters,
  mutations
}
