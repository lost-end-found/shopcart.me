<template>
  <div
    v-bar
    class="basket"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="c-list__item"
      >
        <basket-item
          :key="item.key"
          :name="item.name"
          :amount="item.amount"
          :category="item.category"
          :item="item"
          has-buttons
          @emitMinus="minus(item);"
          @emitPlus="plus(item);"
          @emitRemove="removeItem(item);"
        />
      </li>
    </ul>
    <button
      :class="{ newItemIsOpen: newItemIsOpen }"
      type="button"
      name="button"
      class="button_open-new-item"
      @click="newItemIsOpen = !newItemIsOpen;"
    >
      <span>+</span>
    </button>
    <addNewItem
      v-if="newItemIsOpen"
      @closeNewItem="newItemIsOpen = !newItemIsOpen;"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import BasketItem from '@/components/BasketItem'
import addNewItem from '@/components/addNewItem'

import { mapGetters, mapState } from 'vuex'
import { db } from '@/firebase'

export default {
  components: {
    BasketItem,
    addNewItem
  },
  data: () => ({
    items: [],
    newItemIsOpen: false
  }),
  computed: {
    ...mapGetters({
      uid: 'user/uid'
    }),
    ...mapState({
      user: 'user'
    })
  },
  watch: {
    user: {
      // call it upon creation too
      immediate: true,
      handler (user) {
        if (user.user.uid) {
          this.$rtdbBind('items', db.ref(`/${user.user.uid}/items`))
        }
      }
    }
  },
  methods: {
    onPan (event) {
      if (event.deltaX < -80) {
        event.target.closest('.js-item').classList.add('remove')
      } else {
        event.target.closest('.js-item').classList.remove('remove')
      }
      event.target.closest('.js-item').style.cssText = `transform: translateX(${event.deltaX * 0.5}px)`
    },
    onPanEnd (event) {
      event.target.closest('.js-item').style.cssText = ''
    },
    plus (item) {
      db.ref(`${this.uid}/items`)
        .child(item['.key'])
        .update({
          amount: ++item.amount
        })
    },
    minus (item) {
      if (item.amount > 0) {
        db.ref(`${this.uid}/items`)
          .child(item['.key'])
          .update({
            amount: --item.amount
          })
      }
    },
    removeItem (item) {
      db.ref(`${this.uid}/items`)
        .child(item['.key'])
        .remove()
    }
  }
}
</script>
<style media="screen" lang="scss">
.basket {
  height: calc(100vh - 120px);
  ul {
    padding: 0;
    margin: 0;
  }
  .button_open-new-item {
    font-size: 20px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 60px;
    border-radius: 30px;
    border: none;
    position: fixed;
    bottom: 30px;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    transition: all ease 0.4s;
    box-shadow: 1px 0px 10px 5px rgba(#000, 0.1);
    &:focus {
      outline: none;
    }
    &.newItemIsOpen {
      transform: translateX(-50%) rotate(45deg);
      transform-origin: center;
    }
  }
}
.js-item {
  transition: background ease 0.2s;
    &.remove {
      li {
        background: red;
      }
      transition: transform ease 100ms !important;
    }
    input {
        color: #fff;
        float: left;
        padding-left: 8px;
        line-height: 48px;
        background: transparent;
        border: none;
    }
}
</style>
