<template>
  <div class="signUp">
    <div class="signUp_wrapper">
      <h3>Sign-up/ Login</h3>
      <button class="block" @click="signinPopup">Sign In</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import { GoogleAuthProvider } from 'firebase/auth'
const googleAuthProvider = new GoogleAuthProvider()

import {
  signInWithPopup,
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const router = useRouter()
const currentUser = useCurrentUser()
const error = ref(null)
console.log(currentUser)

function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider)
  .then(() => {
    console.log('Signed in')
    router.push('/basket')
  })
  .catch((reason) => {
    console.error('Failed sign', reason)
    error.value = reason
  })
}

// onMounted(() => {
//   const uiConfig = {
//     signInSuccessUrl: '/basket',
//     signInOptions: [
//       auth.GoogleAuthProvider.PROVIDER_ID,
//       auth.EmailAuthProvider.PROVIDER_ID
//     ]
//   };

//   const ui = new firebaseui.auth.AuthUI(auth);
//   ui.start(
//     '#firebaseui-auth-container',
//     uiConfig,
//     firebaseui.auth.CredentialHelper.GOOGLE_YOLO
//   );
// });

</script>

<style lang="scss" scoped>
.signUp {
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #000;
  &_wrapper {
    background: #000;
    border-radius: 5px;
    box-shadow: 0 5px 12px 0 rgba(#000, 0.3);
  }
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}

span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
