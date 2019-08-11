<template lang="html">
  <section>
    <list-item
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
import ListItem from '@/components/ListItem.vue'
import {
  firebaseApp
} from '@/firebase'
const db = firebaseApp.database()
var categories = db.ref('items')

export default {
  name: 'NavMenu',
  components: {
    ListItem
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
