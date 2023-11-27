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
      class="w-14 h-14 z-10 fixed bottom-3 text-xl flex justify-center items-center line-height-60 border-radius-30 border-none position-fixed z-99 left-1/2 rounded-full transform -translate-x-1/2 transition-all ease-out bg-white shadow"
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
import { collection, doc, addDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getCurrentUser, useDocument, useCollection } from "vuefire";
import { ref } from "vue";

const user = await getCurrentUser();
const uid = user.uid;

const newItemIsOpen = ref(false);

const itemsCollection = collection(db, "items", uid, "items");
const items = useCollection(itemsCollection);

const categoriesCollection = collection(db, "categories", uid, "categories");
const categories = useCollection(categoriesCollection);

const defaultCategories = [
  "Beverages",
  "Bread/Bakery",
  "Canned/Jarred Goods",
  "Dairy",
  "Dry/Baking Goods",
  "Frozen Foods",
  "Meat",
  "Produce",
  "Cleaners",
  "Paper Goods",
  "Personal Care",
  "Other",
  "Uncategorized"
];

// when firebase is ready, check if categories exis

const checkCategories = async () => {
  const collectionRef = collection(db, "categories", uid, "categories");
  const collectionSnapshot = await getDocs(collectionRef);
  if (collectionSnapshot.empty) {
    defaultCategories.forEach((category) => {
      addDoc(collectionRef, {
        name: category,
      });
    });
  }
};

checkCategories();

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