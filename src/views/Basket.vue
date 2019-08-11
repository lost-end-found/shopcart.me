<template>
  <div
    v-bar
    class="basket"
  >
    <ul>
      <li
        v-for="item in items"
        :key="item.key"
      >
        <v-touch
          ref="swiper"
          :pan-options="{direction: 'horizontal', pointer: 0, threshold: 0}"
          :uid="item['.key']"
          :amount="item.amount"
          class="v-touch"
          @pan="removeItemSwipe"
          @panend="removeStyle(item)"
        >
          <listItem
            :key="item.key"
            :name="item.name"
            :amount="item.amount"
            @emitMinus="minus(item);"
            @emitPlus="plus(item);"
            @emitRemove="removeItem(item);"
          />
        </v-touch>
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
import store from '../store'

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
      // ...
    })
  },
  created () {
    this.$bindAsArray('items', db.ref(`/${this.uid}/items`))
  },
  methods: {
    removeItemSwipe (i) {
      if (i.center.x !== 0) {
        var draggableItem = i.target.closest('.v-touch')
        draggableItem.classList.remove('draggableEnd')
        draggableItem.classList.add('draggable')
        draggableItem.setAttribute('style', 'transform: translateX(' + (i.deltaX * 0.5) + 'px)')
        if (i.deltaX <= -80) {
          draggableItem.classList.add('toRemove')
        } else {
          draggableItem.classList.remove('toRemove')
        }
      }
    },
    removeStyle (i, item) {
      var $self = this
      var draggableItem = i.target.closest('.v-touch')
      var key = draggableItem.getAttribute('uid')
      var newAmount = draggableItem.getAttribute('amount')
      draggableItem.setAttribute('style', '')
      draggableItem.classList.remove('draggable')
      if (i.deltaX > 30) {
        this.p
      }
      if (i.deltaX < -30 && newAmount > 0) {
        db.ref(`${this.uid}/items`).child(key)
          .update({
            amount: --newAmount
          })
      }
      draggableItem.classList.add('draggableEnd')
      // if (i.deltaX < -80) {
      //   db.ref(`${this.uid}/items`).child(key).remove()
      // }
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
.v-touch {
    &.draggable {
        transition: background ease 0.2s;
        &.toRemove {
            > * {
              background: #EC5F4A !important;
            }
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
    &.draggableEnd {
      transition: all ease 100ms !important;
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
