<template >
  <div class="max-h-full p-2">
    <transition-group
      name="list"
      tag="ul"
      class="space-y-2"
    >
      <li
        v-for="item in items.filter(item => item.amount > 0)"
        :key="item.id"
      >
        <BasketItem
          :key="index"
          :name="item.name"
          :amount="item.amount"
          :item="item"
          has-remove-button
          @emitRemove="removeItem(item);"
        />
      </li>
    </transition-group>
  </div>
</template>
<script setup>
import { db } from '../firebase'
import { collection, doc, updateDoc } from "firebase/firestore";
import { getCurrentUser, useCollection } from "vuefire";
import BasketItem from '../components/BasketItem.vue'

const user = await getCurrentUser();
const uid = user.uid;

const itemsCollection = collection(db, "items", uid, "items");
const items = useCollection(itemsCollection);

const removeItem = (item) => {
  item.amount--;
  const docRef = doc(db, "items", uid, "items", item.id);
  updateDoc(docRef, {
    amount: 0,
  });
};

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
