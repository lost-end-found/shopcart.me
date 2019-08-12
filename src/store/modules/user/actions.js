const validate = (context, payload) => new Promise((resolve, reject) => {
  context.commit('UPDATE_USER', payload)
})

export default {
  validate
}
