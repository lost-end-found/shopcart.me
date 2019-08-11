<template lang="html">
  <div class="">
    <list-item
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
import ListItem from '@/components/ListItem.vue'
import {
  firebaseApp
} from '@/firebase'
const db = firebaseApp.database()
var items = db.ref('items')

export default {
  components: {
    ListItem
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
