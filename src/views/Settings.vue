<template>
  <div class="settings">
    <button @click="logout()">
      Logout
    </button>
  </div>
</template>

<script setup>
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import {
  signOut,
} from 'firebase/auth'

const router = useRouter()

const logout = () => {
  signOut(auth)
  .then(() => {
    console.log('Signed out')
    router.push('/')
  })
  .catch((reason) => {
    console.error('Failed sign', reason)
    error.value = reason
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.settings {
  margin: 0 auto;
  max-width: 72.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
button {
  cursor: pointer;
  background: #000;
  border: 2px solid #fff;
  color: #fff;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  &:hover {
    background: #fff;
    color: #000;
  }
}
</style>
