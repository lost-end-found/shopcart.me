import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
export const index = state.defaultState()

export default {
  namespaced: true,
  index,
  actions,
  getters,
  mutations
}
