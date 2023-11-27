<template>
  <div class="font-mono">
    <div class="flex justify-between items-center border-b border-black/10">
      <input
        v-model="name"
        class="text-center border-none max-w-[calc(100%-50px)] w-full text-md font-mono font-bold"
        :placeholder="item.name"
        @blur="editName"
        @keydown.enter="editName"
      />
      <div class="p-2" @click="emit('closeEditItem')">
        <img src="../assets/icons/close.svg" alt="close modal" />
      </div>
    </div>

    <div class="px-4 text-left">
      <SelectRoot v-model="selectedCategory">
        <SelectTrigger
          class="inline-flex min-w-[160px] border border-black/10 w-full mt-4 items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green outline-none"
          aria-label="Customise options"
        >
          <SelectValue placeholder="Select a category...">
            {{ selectedCategory.name || categoriesData[0].name }}

          </SelectValue>
          <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
        </SelectTrigger>

        <SelectPortal>
          <SelectContent
            class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
            :side-offset="5"
          >
            <SelectScrollUpButton
              class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
            >
              <Icon icon="radix-icons:chevron-up" />
            </SelectScrollUpButton>

            <SelectViewport class="p-[5px]">
              <SelectLabel
                class="px-[25px] text-xs leading-[25px] sr-only"
              >
                Categories
              </SelectLabel>
              <SelectGroup>
                <SelectItem
                  v-for="(category, index) in categoriesData"
                  :key="index"
                  class="text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-800 data-[highlighted]:text-white"
                  :value="category"
                >
                  <SelectItemIndicator
                    class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <Icon icon="radix-icons:check" />
                  </SelectItemIndicator>
                  <SelectItemText>
                    {{ category.name }}
                  </SelectItemText>
                </SelectItem>
              </SelectGroup>
            </SelectViewport>

            <SelectScrollDownButton
              class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
            >
              <Icon icon="radix-icons:chevron-down" />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
      <textarea
        ref="refDescription"
        v-model="description"
        class="text-black rounded-md border border-black/10 text-sm bg-white w-full p-2 mt-2 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        placeholder="Add description here"
        @blur="editDescription"
        @keydown.prevent.enter="editDescription"
      />
    </div>
    <div class="p-4 text-left">
      <SASButton class="px-4 py-2" @click="deleteItem"> Delete item </SASButton>
    </div>
  </div>
</template>
<script setup>
import SASButton from "./SAS/SASButton.vue";
import { onMounted, toRefs, onUnmounted, ref, watch } from "vue";
import { db } from "../firebase/index";
import autosize from "autosize";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getCurrentUser, useDocument, useCollection } from "vuefire";
import { Icon } from "@iconify/vue";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";

const user = await getCurrentUser();
const uid = user.uid;

const refDescription = ref(null);
const props = defineProps({
  item: Object,
});

const { item } = toRefs(props);

const name = ref(item.value.name);
const description = ref(item.value.description);
const selectedCategory = ref(item.value.category);
const docRef = doc(db, "items", uid, "items", item.value.id);

const categoriesCollection = collection(db, "categories", uid, "categories");
const categoriesData = useCollection(categoriesCollection);

const emit = defineEmits(["closeEditItem"]);

// const createNewCategory = (newCategory) => {
//   db.ref(`${$store.state.user.user.uid}/categories`).push({
//     name: newCategory,
//   });
// };

const updateCategory = (e) => {
  if (e) {
    updateDoc(docRef, {
      category: e.name,
    });
  }
};

// when selectedCategory changes, update the category in the database

watch(selectedCategory, (newValue) => {
  updateCategory(newValue);
});


const deleteItem = () => {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (confirmDelete === true) {
    deleteDoc(docRef);
  } else {
  }
};

const editDescription = (e) => {
  updateDoc(docRef, {
    description: e.target.value,
  });
};

const editName = (e) => {
  updateDoc(docRef, {
    name: e.target.value,
  });
};

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
});

onUnmounted(() => {
  autosize.destroy(refDescription.value);
});
</script>