<template lang="html">
  <div>
    <transition-group
      name="list"
      tag="ul"
    >
      <li
        v-for="(item, index) in items.filter(item => item.amount > 0)"
        :key="index"
      >
        <basket-item
          :key="index"
          :name="item.name"
          :amount="item.amount"
          @emitRemove="removeItem(item['.key']);"
        />
      </li>
    </transition-group>
  </div>
</template>
<script>
import { db } from '@/firebase'
import { mapGetters, mapState } from 'vuex'

import BasketItem from '@/components/BasketItem'

export default {
  components: {
    BasketItem
  },
  data: () => ({
    items: []
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
        }
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
