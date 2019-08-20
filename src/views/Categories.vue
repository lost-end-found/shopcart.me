<template lang="html">
  <section>
    <basket-item
      v-for="item in items"
      :key="item.key"
      :item="item"
      :name="item.name"
      :category="item.category"
      :amount="item.amount"
    />
  </section>
</template>

<script>
import BasketItem from '@/components/BasketItem.vue'
import {
  firebaseApp
} from '@/firebase'
const db = firebaseApp.database()
var categories = db.ref('items')

export default {
  name: 'NavMenu',
  components: {
    BasketItem
  },
  data: () => ({
    items: []
  }),
  created () {
    this.$bindAsArray('items', categories)
  }
}
</script>

<style lang="scss">

</style>
