<template>
  <div
    v-bar
    class="basket"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          v-hammer:pan="onPan"
          v-hammer:panend="onPanEnd"
          class="js-item"
          :uid="item['.key']"
          :amount="item.amount"
        >
          <listItem
            :key="item.key"
            :name="item.name"
            :amount="item.amount"
            @emitMinus="minus(item);"
            @emitPlus="plus(item);"
            @emitRemove="removeItem(item);"
          />
        </div>
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
import listItem from '@/components/listItem'
import addNewItem from '@/components/addNewItem'

import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
  components: {
    listItem,
    addNewItem
  },
  data: () => ({
    items: [],
    newItemIsOpen: false
  }),
  computed: {
    ...mapGetters({
      uid: 'user/uid'
    })
  },
  watch: {
    uid: {
      // call it upon creation too
      immediate: true,
      handler (uid) {
        this.$rtdbBind('items', db.ref(`/${uid}/items`))
      }
    }
  },
  methods: {
    onPan (event) {
      console.log(event)
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
    z-index: 10;
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
    span {
        height: 32px;
        width: 32px;
        display: inline-block;
        text-align: center;
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
