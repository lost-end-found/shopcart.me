<template>
  <div id="app">
    <header>
      <router-link
        :to="{ path: '/' }"
        class="title"
      >
        <h1>Shopping App</h1>
      </router-link>
    </header>
    <main>
      <router-view class="app-body" />
    </main>
    <footer v-if="$route.meta.requiresAuth">
      <bottom-nav />
    </footer>
  </div>
</template>
<script type="text/javascript">
import bottomNav from '@/components/bottomFooter'

export default {
  components: {
    bottomNav
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700&display=swap&subset=greek');
body, html {
  margin: 0;
  padding: 0;
}
html {
  overflow-y: hidden;
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
header {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #000;
}

header a {
  font-weight: bold;
  color: #fff;
}
main {
  .app-body {
    background: #fff;
  }
  padding-top: 60px;
  // padding-bottom: 60px;
}

footer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #000;
  color: #fff;
}
button {
  cursor: pointer;
}
</style>
