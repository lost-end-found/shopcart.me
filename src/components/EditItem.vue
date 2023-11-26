<template>
  <div>
    <div class="flex justify-between items-center border-b border-black/10">
      <input
        v-model="name"
        class="text-center border-none max-w-[calc(100%-50px)] w-full text-2xl font-bold]"
        :placeholder="item.name"
        @blur="editName"
        @keydown.enter="editName"
      >
      <div
        class="p-2"
        @click="emit('closeEditItem')"
      >
        <img
          src="../assets/icons/close.svg"
          alt="close modal"
        >
      </div>
    </div>
    <div class="px-4 text-left">
      <v-select
        v-model="selectedCategory"
        label="name"
        taggable
        :options="categories"
        @input="updateCategory"
      />

      <textarea
        ref="refDescription"
        v-model="description"
        class="text-black rounded-md bg-black/5 w-full p-2 mt-2"
        placeholder="Add description here"
        @blur="editDescription"
        @keydown.prevent.enter="editDescription"
      />
    </div>
    <div class="p-4 text-left">
      <SASButton
        class="px-4 py-2"
        @click="deleteItem"
      >
        Delete item
      </SASButton>
    </div>
  </div>
</template>
<script setup>
import SASButton from './SAS/SASButton.vue'
import { onMounted, toRefs, onUnmounted, ref } from 'vue';
import { db } from '../firebase/index'
import autosize from 'autosize'
import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getCurrentUser, useDocument, useCollection } from "vuefire";


const user = await getCurrentUser();
const uid = user.uid;



const refDescription = ref(null)
const props = defineProps({
  item: Object
})

const { item } = toRefs(props)

const name = ref(item.value.name)
const description = ref(item.value.description)
const categories = []
const selectedCategory = ''
const docRef = doc(db, "items", uid, "items", item.value.id);

const emit = defineEmits(["closeEditItem"]);

const createNewCategory = (newCategory) => {
  db.ref(`${$store.state.user.user.uid}/categories`).push({
    name: newCategory
  })
}

const updateCategory = (e) => {
  if (e) {
    updateDoc(docRef, {
      category: e
    });
  }
}

const deleteItem = () => {
  const confirmDelete = confirm('Are you sure you want to delete this item?')
  if (confirmDelete === true) {
    deleteDoc(docRef)
  } else {

  }
}

const editDescription = (e) => {
  updateDoc(docRef, {
    description: e.target.value
  });
}

const editName = (e) => {
  updateDoc(docRef, {
    name: e.target.value
  });
}

onMounted(() => {
  // $rtdbBind('categories', db.ref(`/${$store.state.user.user.uid}/categories`))
  // name = item.name
  // selectedCategory = item.category

  // if (item.description) {
  //   description = item.description
  // }
  // setTimeout(() => {
  //   autosize($refs.refDescription)
  // }, 100)
})

onUnmounted(() => {
  autosize.destroy(refDescription.value)
})
</script>