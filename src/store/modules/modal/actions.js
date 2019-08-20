const addModal = (context, payload) => {
  context.commit('ADD_MODAL', payload)
}

const deleteModal = (context, payload) => {
  context.commit('DELETE_MODAL', payload)
}
const cancelModal = (context) => {
  context.commit('CANCEL_MODAL')
}

export default {
  addModal,
  deleteModal,
  cancelModal
}
