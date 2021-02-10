<template>
  <div
    id="app"
    class="font-mono max-h-screen fixed top-0 left-0 right-0 bottom-0"
  >
    <header
      class="fixed flex justify-center items-center w-full top-0 left-0 h-14 bg-black text-white"
    >
      <router-link
        :to="{ path: '/' }"
        class="title"
      >
        <h1 class="text-xl">shopcart.me</h1>
      </router-link>
    </header>
    <main class="fixed z-10 top-14 bottom-14 left-0 w-full">
      <router-view class="bg-transparent" />
    </main>
    <footer
      v-if="$route.meta.requiresAuth"
      class="fixed flex h-14 bottom-0 left-0 bg-black text-white w-full items-center justify-center"
    >
      <bottom-nav />
    </footer>
    <SASModal />
  </div>
</template>
<script type="text/javascript">
import bottomNav from '@/components/Footer'
import SASModal from '@/components/SAS/SASModal'

export default {
  components: {
    bottomNav,
    SASModal
  }
}
</script>
