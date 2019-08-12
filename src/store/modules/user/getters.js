const uid = (state) => {
  if (state.user) {
    return state.user.uid
  }
  return null
}

export default {
  uid
}
