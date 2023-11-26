<template>
  <div id="list">
    <div
      v-if="itemsInBasket > 0"
      class=""
    >
      <div
        v-for="i in itemsGroups"
        :key="i.key"
      >
        <div class="category-name">
          <span>{{ i }}</span>
        </div>
        <div
          v-for="item in items"
          :key="item.key"
        >
          <div
            v-if="item.amount > 0 && item.category === i"
            class="item"
          >
            <span class="name">{{ item.name }}</span>
            <div class="right-align">
              <span>{{ item.amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No items in the basket
    </div>
  </div>
</template>
<script>
import {
  firebaseApp
} from '../firebase'
const db = firebaseApp.database()
var itemsRef = db.ref('items')
export default {
  name: 'List',
  data: () => ({
    items: []
  }),
  computed: {
    itemsInBasket: function itemsInBasket () {
      let item = ''
      let nOfItems = ''
      for (item of this.items) {
        if (item.amount > 0) {
          nOfItems++
        }
      }
      return nOfItems
    },
    itemsGroups: function itemsGroups () {
      let item = ''
      let categories = []
      for (item of this.items) {
        categories.push(item.category)
      }
      return Array.from(new Set(categories))
    }
  },
  created () {
    this.$bindAsArray('items', itemsRef)
  }
}
</script>
<style media="screen" lang="scss" scoped>
.category-name {
    text-align: center;
    margin: 0 auto;
    display: block;
    position: relative;
    max-width: 35rem;
    z-index: 1;
    span {
        background-color: #181818;
        padding: 0.5rem;
    }
    &:after {
        left: 0;
        z-index: -1;
        top: 0.5rem;
        position: absolute;
        content: '';
        width: 100%;
        border-bottom: 1px #fff solid;
    }
}
.item {
  padding: 10px 20px;
  margin: 8px auto;
  max-width: 35rem;
  border-radius: 8px;
  background: #2b2b2b;
  border: 1px #2b2b2b solid;
  user-select: none;
  display: flex;
  justify-content: space-between;
    * {
      display: inline-block;
    }
}
</style>
