<template>
  <div class="basket">
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
      <li
        class="c-list__item pl-11 text-base py-4 border-b"
        @click="newItemIsOpen = !newItemIsOpen"
      >
        add new
      </li>
    </ul>
    <button
      :class="{ newItemIsOpen: newItemIsOpen }"
      type="button"
      name="button"
      class="c-add"
      @click="newItemIsOpen = !newItemIsOpen;"
    >
      <img
        src="@/assets/icons/plus.svg"
        alt="add new item"
      >
    </button>
    <addNewItem
      v-if="newItemIsOpen"
      @closeNewItem="newItemIsOpen = !newItemIsOpen;"
    />
  </div>
</template>

<script>
import BasketItem from '@/components/BasketItem'
import addNewItem from '@/components/NewItem'

import { mapGetters, mapState } from 'vuex'
import { db } from '@/firebase'

export default {
  components: {
    BasketItem,
    addNewItem
  },
  data: () => ({
    items: [],
    categories: [],
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
          db.ref(user.user.uid).child('categories').once('value', function (snapshot) {
          // if data exists
            if (snapshot.exists()) {
              // get the ref (in this case /users/2) and update its contents
            } else {
              const defaultCategories = [
                'Beverages',
                'Bread/Bakery',
                'Canned/Jarred Goods',
                'Dairy',
                'Dry/Baking Goods',
                'Frozen Foods',
                'Meat',
                'Produce',
                'Cleaners',
                'Paper Goods',
                'Personal Care',
                'Other'
              ]
              defaultCategories.forEach(function (category) {
                db.ref(`${user.user.uid}/categories`).push({
                  name: category
                })
              })
            }
          })
        }
      }
    }
  },
  methods: {
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
  overflow: auto;
  ul {
    padding: 0;
    margin: 0;
  }
  .c-add {
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
    bottom: 10px;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    transition: all ease-out  200ms;
    background-color: #fff;
    box-shadow: 1px 0px 10px 5px rgba(#000, 0.1);
    img {
      width: 24px;
    }
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
