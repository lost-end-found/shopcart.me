const uid = (state) => {
  return state.user ? state.user.uid : null
}

export default {
  uid
}
