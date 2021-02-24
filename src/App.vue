<template>
  <div
    id="app"
    class="font-mono max-h-screen fixed top-0 left-0 right-0 bottom-0"
  >
    <header
      class="fixed w-full top-0 left-0 h-14 bg-black text-white"
    >
      <router-link
        :to="{ path: '/' }"
        class="text-lg absolute left-1/2 transform -translate-x-1/2 top-4"
      >
        <h1 class="text-xl">
          shopcart.me
        </h1>
      </router-link>
      <router-link :to="{ name: 'settings'}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-6  absolute right-4 top-4"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </router-link>
    </header>
    <main class="fixed z-10 top-14 bottom-14 left-0 w-full overflow-visible">
      <router-view class="bg-transparent overflow-y-auto" />
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
  },
  mounted () {
    let vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.body.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      document.body.style.setProperty('--vh', `${vh}px`)
    })
  }
}
</script>
