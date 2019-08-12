<template lang="html">
  <div>
    <transition-group
      name="list"
      tag="ul"
    >
      <listItem
        v-for="(item, index) in checkOutItems"
        v-if="item.amount > 0"
        :key="index"
        :name="item.name"
        :amount="item.amount"
        @emitRemove="removeItem(item['.key']);"
      />
    </transition-group>
  </div>
</template>
<script>
import { db } from '@/firebase'
import { mapGetters } from 'vuex'

import listItem from '@/components/listItem'

export default {
  components: {
    listItem
  },
  data: () => ({
    checkOutItems: []
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
        this.$rtdbBind('checkOutItems', db.ref(`/${uid}/items`))
      }
    }
  },
  methods: {
    removeItem (key) {
      db.ref(`${this.uid}/items`)
        .child(key)
        .update({
          amount: 0
        })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(20px);
}

.list-leave-active {
  width: calc(100% - 20px);
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  transform-origin: center top;
}
</style>
