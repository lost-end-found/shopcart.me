<template >
  <div class="">
    <basket-item
      v-for="item in items"
      :key="item.key"
      :item="item"
      :name="item.name"
      :category="item.category"
      :amount="item.amount"
    />
  </div>
</template>

<script>
import BasketItem from '@/components/BasketItem.vue'
import {
  firebaseApp
} from '../firebase'
const db = firebaseApp.database()
var items = db.ref('items')

export default {
  components: {
    BasketItem
  },

  created () {
    this.$bindAsArray('items', items)
  },
  methods: {
    test () {
      console.log(this)
    }
  }
}
</script>

<style lang="css">
</style>
