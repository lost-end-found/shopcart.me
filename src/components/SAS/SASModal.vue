<script>
/**
 * This component is responsible to show and hide modals in the app by animating them and applying overlays to the page content.
 *
 * Modals are stored in Vuex ```modal``` store module. **We can store only one modal at a time and we do not support multiple modals funcionality**.
 *
 * * In order to create a modal you have to dispatch the following store action:
 *  ```this.$store.dispatch('modal/addModal', modalObject)```
 *
 * * In order to destroy a modal you have to dispatch the following store action:
 *  ```this.$store.dispatch('modal/deleteModal')```
 *
 * The ```modalObject``` parameter is a JS object that contains the following:
 *
 * ```
 *  {
 *    content: VueComponent // the Vue component that will be rendered inside the modal.
 *  }
 * ```
 *
 * Altough you can add whatever you want inside the modal, make sure to include the [SASModalHeader](#pdsmodalheader) and [SASModalFooter](#pdsmodalfooter) components and read carefully our [design guidelines]() and
 */

import { mapState } from 'vuex'

export default {
  name: 'SASModal',
  computed: {
    // get modal instance
    ...mapState({
      modal: state => state.modal.modal
    }),
    activeModal () {
      if (this.modal && this.modal.content) {
        return true
      }
      return false
    }
  },
  watch: {
    // Toggle body HTML class to block scroll
    modal (newModal) {
      if (newModal) {
        document.body.classList.add('has-modalOpen')
      } else {
        document.body.classList.remove('has-modalOpen')
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.dispatch('modal/deleteModal')
    }
  }
}
</script>

<template>
  <div @keydown.esc="closeModal()">
    <!-- Page content wrapper -->
    <div
      :class="{'is-modalOpen': activeModal}"
      class="PDS-Modal__ContentWrapper"
    >
      <slot name="content" />
    </div>

    <slot />

    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="activeModal"
        class="PDS-Modal__Backdrop"
        @click="closeModal"
      />
    </transition>

    <transition name="slide">
      <!-- Modal container -->
      <div
        v-if="activeModal"
        class="PDS-Modal-Dialog__Container"
      >
        <!-- Modal Window -->
        <div
          class="PDS-Modal-Dialog__Modal"
          role="dialog"
          tabindex="0"
          :style="[modal.width ? {maxWidth: modal.width + 'px'} : '' ]"
        >
          <component
            :is="modal.content"
            v-bind="modal.props"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>

.has-modalOpen {
  #main {
    filter: blur(2px);
  }
}

// Backdrop
.PDS-Modal__Backdrop {
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  background: rgba(74, 71, 87, 0.5);
  backface-visibility: hidden;
  will-change: opacity;
}

// Modal dialog container
.PDS-Modal-Dialog__Container {
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: -100%;
  left: 0;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all ease 300ms;
}
.has-modalOpen {
  .PDS-Modal-Dialog__Container {
    bottom: 0;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.PDS-Modal-Dialog__Modal {
  outline: none;
  position: fixed;
  overflow: auto;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.22),
    0 31px 41px 0 rgba(33, 43, 54, 0.08);
  background: #fff;
  position: relative;
  max-width: 640px;
  width: 100%;
  margin: auto;
  border-radius: 6px 6px 0 0 ;
  position: relative;
}

.slide-enter-to, .slide-leave {
   bottom: 0 !important;
   overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   transition: all ease 300ms;
   bottom: -100% !important;
}
</style>
