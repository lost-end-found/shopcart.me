<template lang="html">
  <div class="bottom-nav">
    <router-link to="/checkOut">
      Check Out
    </router-link>
    <router-link to="/basket">
      Bakset
    </router-link>
    <router-link to="/settings">
      Settings
    </router-link>
    <a @click="openModal">
      Modal
    </a>
  </div>
</template>

<script>
import EditItem from '@/components/EditItem.vue'

export default {
  methods: {
    openModal () {
      this.$store.dispatch('modal/addModal', {
        content: EditItem
      })
    }
  }
}
</script>

<style lang="scss">
.bottom-nav {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

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
