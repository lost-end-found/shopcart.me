const ADD_MODAL = (state, payload) => {
  const stateTemp = state
  stateTemp.modal = payload
}

const DELETE_MODAL = (state) => {
  const stateTemp = state
  stateTemp.modal = undefined
}

const CANCEL_MODAL = (state) => {
  const stateTemp = state
  stateTemp.action = 'cancel'
}

export default {
  ADD_MODAL,
  DELETE_MODAL,
  CANCEL_MODAL
}
