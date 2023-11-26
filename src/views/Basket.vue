<template>
  <div class="max-h-full p-2">
    <ul class="space-y-2">
      <li v-for="(item, index) in items" :key="index">
        <BasketItem
          :key="item.id"
          :name="item.name"
          :amount="item.amount"
          :category="item.category"
          :item="item"
          has-buttons
          @emitMinus="minus(item)"
          @emitPlus="plus(item)"
          @emitRemove="removeItem(item)"
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
      type="button"
      name="button"
      class="w-14 h-14 z-10 fixed bottom-3 font-size-20 flex justify-center items-center line-height-60 border-radius-30 border-none position-fixed z-99 left-1/2 rounded-full transform -translate-x-1/2 transition-all ease-out bg-white shadow"
      @click="newItemIsOpen = !newItemIsOpen"
      :class="{ 'rotate-45': newItemIsOpen }"
    >
      <img class="w-6" src="../assets/icons/plus.svg" alt="add new item" />
    </button>
    <NewItem
      v-if="newItemIsOpen"
      @closeNewItem="newItemIsOpen = !newItemIsOpen"
    />
  </div>
</template>

<script setup>
import BasketItem from "../components/BasketItem.vue";
import NewItem from "../components/NewItem.vue";
import { db } from "../firebase";
import { collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUser, useDocument, useCollection } from "vuefire";
import { ref } from "vue";

const user = await getCurrentUser();
const uid = user.uid;

const newItemIsOpen = ref(false);

const itemsCollection = collection(db, "items", uid, "items");
const items = useCollection(itemsCollection);

const plus = (item) => {
  item.amount++;
  const docRef = doc(db, "items", uid, "items", item.id);
  updateDoc(docRef, {
    amount: item.amount,
  });
};

const minus = (item) => {
  if (item.amount === 0) {
    return;
  }
  item.amount--;
  const docRef = doc(db, "items", uid, "items", item.id);
  updateDoc(docRef, {
    amount: item.amount,
  });
};

const removeItem = (item) => {
  const docRef = doc(db, "items", uid, "items", item.id);
  deleteDoc(docRef);
};

</script>

<style media="screen" lang="scss">
.c-add {
  font-size: 20px;
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
  transition: all ease-out 200ms;
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
</style>
