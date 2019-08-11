import firebase from 'firebase/app'
import auth from 'firebase/auth'

const UPDATE_USER = state => {
  state.user = firebase.auth().currentUser
}

export default {
  UPDATE_USER
}
