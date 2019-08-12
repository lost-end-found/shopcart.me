<template>
  <div class="signUp">
    <div class="signUp_wrapper">
      <h3>Sign-up/ Login</h3>
      <div id="firebaseui-auth-container" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'

export default {
  name: 'SignUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/basket',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start(
      '#firebaseui-auth-container',
      uiConfig,
      firebaseui.auth.CredentialHelper.GOOGLE_YOLO
    )
  }
}
</script>

<style lang="scss" scoped>
.signUp {
  height: calc(100vh - 60px);
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
