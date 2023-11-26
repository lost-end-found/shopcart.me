<template >
  <div class="bottom-nav flex w-full h-full items-center">
    <router-link to="/checkout">
      Check Out
    </router-link>
    <router-link to="/basket">
      Bakset
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.bottom-nav {
  justify-content: space-around;
  a {
    color: #fff;
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &.router-link-exact-active {
      background: lighten(#000, 10%);
      text-decoration: line-through;
    }
  }
}
</style>
