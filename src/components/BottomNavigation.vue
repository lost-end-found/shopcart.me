<template>
  <div id="bottom-nav">
    <div class="mobile-bottom-bar">
      <router-link
        active-class
        class="footer-link"
        to="/list"
      >
        <span class="footer-text">List</span>
      </router-link>
      <router-link
        active-class
        class="footer-link"
        to="/categories"
      >
        <span class="footer-text">To Buy</span>
      </router-link>
      <router-link
        active-class
        class="footer-link"
        to="/settings"
      >
        <span class="footer-text">Settings</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomNav',
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>

.footer-link {
  text-decoration: none;
}

$primary-color: rgba(#2B2B2B, 1);
$mobile-bottom-bar-primary-dark: darken($primary-color, 1%);

.mobile-bottom-bar {
    background: $primary-color;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .footer-link {
        flex: 1 1 auto;
        height: 60px;
        text-align: center;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        &:active,
        &:focus, &.router-link-exact-active {
            background: $mobile-bottom-bar-primary-dark;
        }
    }

    .footer-text {
        position: relative;
        font-size: 12px;
        color: #fff;
    }
}
</style>
