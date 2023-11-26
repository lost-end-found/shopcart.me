<template>
  <div
    id="shopping-item"
    class="shopping-area"
  >
    <div
      v-for="item in newItems"
      v-if="item.category === $route.params.category"
      class="item login"
      :category="item.category"
    >
      <v-touch
        ref="swiper"
        class="vtouch"
        :pan-options="{ direction: 'horizontal', pointer: 0, threshold: 0 }"
        :uid="item['.key']"
        :amount="item.amount"
        @pan="removeItemSwipe"
        @panend="removeStyle"
      >
        <div class="name-container">
          <input
            v-model="item.name"
            placeholder="Add New Item"
            @keyup.enter="updateItem(item)"
            @blur="updateItem(item)"
          >
        </div>
        <div class="right-align">
          <div
            class="button"
            @click="minus(item)"
          >
            -
          </div>
          <span>{{ item.amount }}</span>
          <div
            class="button"
            @click="plus(item)"
          >
            +
          </div>
        </div>
      </v-touch>
    </div>
    <div
      v-show="isNewItemFocused"
      class="focus-overlay"
    />
    <div
      class="addItem-container"
      :class="{ active: isNewItemFocused }"
    >
      <input
        v-show="isNewItemFocused"
        id="addItem"
        ref="newItemRef"
        v-model="newItem"
        placeholder="Add New Item"
        @focus="isNewItemFocused = true"
        @blur="isNewItemFocused = false"
        @keydown.esc="removeFocus"
        @keyup.enter="addItem"
      >
      <div
        v-show="!isNewItemFocused"
        class="addItem-button"
        @click="
          isNewItemFocused = true;
          addFocus();
        "
      />
    </div>
  </div>
</template>
<script>
import { firebaseApp } from '../firebase'
const db = firebaseApp.database()
var itemsRef = db.ref('items')

export default {
  name: 'ShoppingItem',

  data: () => ({
    newItems: [],
    newItem: '',
    isNewItemFocused: false
  }),
  created () {
    this.$bindAsArray('newItems', itemsRef)
  },
  methods: {
    removeFocus () {
      this.$refs.newItemRef.blur()
    },
    addFocus () {
      this.$nextTick(() => this.$refs.newItemRef.focus())
    },
    plus (item) {
      itemsRef.child(item['.key']).update({
        amount: ++item.amount
      })
    },
    minus (item) {
      if (item.amount > 0) {
        itemsRef.child(item['.key']).update({
          amount: --item.amount
        })
      }
    },
    addItem (item) {
      itemsRef.push({
        name: this.newItem,
        category: this.$route.params.category,
        amount: '0'
      })
      this.newItem = ''
    },
    updateItem (item) {
      itemsRef.child(item['.key']).update({
        name: item.name
      })
    },
    removeItemSwipe (i) {
      if (i.center.x !== 0) {
        var draggableItem = i.target.closest('.item')
        draggableItem.classList.add('draggable')
        draggableItem.setAttribute(
          'style',
          'transform: translateX(' + i.deltaX * 0.5 + 'px)'
        )
        if (i.deltaX <= -80) {
          draggableItem.classList.add('toRemove')
        } else {
          draggableItem.classList.remove('toRemove')
        }
      }
    },
    removeStyle (i) {
      var draggableItem = i.target.closest('.item')
      var key = i.target.closest('.vtouch').getAttribute('uid')
      var newAmount = i.target.closest('.vtouch').getAttribute('amount')
      draggableItem.setAttribute('style', '')
      draggableItem.classList.remove('draggable')

      if (i.deltaX > 30) {
        itemsRef.child(key).update({
          amount: ++newAmount
        })
      }
      if (i.deltaX < -30 && newAmount > 0) {
        itemsRef.child(key).update({
          amount: --newAmount
        })
      }
      if (i.deltaX < -80) {
        itemsRef.child(key).remove()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  .vtouch {
    height: 100%;
  }
  margin: 8px;
  max-width: 35rem;
  border-radius: 8px;
  position: relative;
  background: #2b2b2b;
  height: 48px;
  font-size: 14px;
  border-bottom: #181818 solid 1px;
  padding-left: 8px;
  transition: transform ease-out 0.2s;
  box-shadow: 0 1px 14px 0 rgba(0, 0, 0, 0.1);
  &.draggable {
    transition: background ease 0.2s;
    &.toRemove {
      background: #ec5f4a;
      &::after {
        position: absolute;
        right: -32px;
        top: 0;
        line-height: 48px;
        font-size: 28px;
        font-family: "FontAwesome";
        content: "\f2ed";
      }
    }
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

.right-align {
  position: absolute;
  right: 0;
}

.addItem,
.addItem-button {
  border-radius: 8px;
  border: none;
  display: inline-block;
  padding: 8px;
}
.addItem-button {
  margin-left: 8px;
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all ease 0.4s;
  border: 1px solid rgba(#565656, 0.7);
  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
/* .fade-leave-active below version 2.1.8 */
.fade-leave-to {
  opacity: 0;
}
.addItem-container {
  z-index: 2;
  position: fixed;
  bottom: 60px;
  height: 3rem;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  transition: all ease 0.4s;
  background: rgba(#1e1e1e, 1);
  #addItem {
    background: darken(#2b2b2b, 4%);
    color: #fff;
    outline: none;
    width: 100vw;
    border: none;
    padding: 1rem;
  }
  .addItem-button {
    &:after {
      content: "Add Item";
    }
  }
  @media (max-width: 768px) {
    background: none;
    justify-content: flex-end;
    padding: 0;
    .addItem-button {
      width: 2rem;
      height: 2rem;
      padding: 0;
      margin: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:after {
        content: "+";
      }
    }
  }
}
.focus-overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#1e1e1e, 0.9);
}
</style>
