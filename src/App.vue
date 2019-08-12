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
  },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700");
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
.vb > .vb-dragger {
    z-index: 10;
    width: 12px;
    margin: 4px;
    height: calc(100% - 20px);
    right: 0px;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(#000,.4);
    margin: 2px;
    border-radius: 20px;
    height: calc(100% - 20px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(#000,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(#000,1);
    margin: 0px;
    height: calc(100% - 20px);
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(#000,1);
    margin: 0px;
    height: calc(100% - 20px);
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(#000,1);
}
</style>
