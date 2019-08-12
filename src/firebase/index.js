import Vue from 'vue'
// import VueFire from 'vuefire'
import * as firebase from 'firebase/app'
import 'firebase/database'

import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)

const config = {
  apiKey: 'AIzaSyCs2IdLfd7mDbcPHhsOMY0u_2KZIiwriic',
  authDomain: 'shopping-app-e063d.firebaseapp.com',
  databaseURL: 'https://shopping-app-e063d.firebaseio.com',
  projectId: 'shopping-app-e063d',
  storageBucket: 'shopping-app-e063d.appspot.com',
  messagingSenderId: '167034361296'
}
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export { firebaseApp, db }
