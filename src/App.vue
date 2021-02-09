<template>
  <div id="app">
    <header class="fixed flex justify-center items-center w-full top-0 left-0 h-14 bg-black text-white">
      <router-link
        :to="{ path: '/' }"
        class="title"
      >
        <h1>shopcart.me</h1>
      </router-link>
    </header>
    <main class="fixed z-10 top-14 bottom-14 left-0 w-full">
      <router-view class="bg-white" />
    </main>
    <footer class="fixed flex h-14 bottom-0 left-0 bg-black text-white w-full items-center justify-center" v-if="$route.meta.requiresAuth">
      <bottom-nav />
    </footer>
    <SASModal />
  </div>
</template>
<script type="text/javascript">
import bottomNav from '@/components/bottomFooter'
import SASModal from '@/components/SAS/SASModal'

export default {
  components: {
    bottomNav,
    SASModal
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700&display=swap&subset=greek");
body,
html {
  font-family: "Ubuntu Mono", monospace;
}
#app {
  font-family: "Ubuntu Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  * {
    font-family: "Ubuntu Mono", monospace;
  }
}

button {
  cursor: pointer;
}
</style>
