<template >
  <div
    class="newItem bottom-14 w-full left-0 fixed flex justify-center items-center"
  >
    <div class="p-4 bg-black rounded-md shadow-lg">
      <input
        ref="newItemElement"
        v-model="addNewItem"
        type="text"
        name=""
        class="rounded-md"
        autofocus
        placeholder="Start here..."
        @keydown.esc="closeNewItem()"
        @keydown.enter="addItem(newItem), closeNewItem()"
      />
      <ul v-if="$v.addNewItem.$error" class="space-y-2 mt-2">
        <li class="text-red-500 text-xs" v-for="(error, index) in $v.addNewItem.$errors" :key="index">
          {{ error.$message }}
        </li>

      </ul>
      <button
        type="button"
        name="button"
        class="bg-black transition-colors border-white border-2 border-solid rounded-md mt-4"
        @click="addItem(newItem)"
      >
        Add new item
      </button>
    </div>
  </div>
</template>

<script setup>
import { db } from "../firebase";
import { getCurrentUser, useDocument, useCollection } from "vuefire";
import { ref, onMounted, computed } from "vue";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  addNewItem: {
    required
  }
}

const user = await getCurrentUser();
const uid = user.uid;

const addNewItem = ref("");

const $v = useVuelidate(rules, addNewItem)

const newItemElement = ref(null);
const docRef = doc(db, "items", uid);
const docSnap = await getDoc(docRef);
const itemsCollection = collection(db, "items", uid, "items");

// Function to add an item to the collection
const addItem = async (item) => {
  $v.value.addNewItem.$touch();
  if ($v.value.addNewItem.$anyError) {
    return
  }
  await addDoc(itemsCollection, item);
  closeNewItem()
};

const emit = defineEmits(["closeNewItem"]);

// Example usage
const newItem = computed(() => {
  return {
    name: addNewItem.value,
    category: "Uncategorized",
    amount: 0,
    description: "",
  };
});

const closeNewItem = () => {
  emit("closeNewItem");
};
onMounted(() => {
  newItemElement.value.focus();
});
</script>

<style lang="scss">
.newItem {
  height: calc(var(--vh, 1vh) * 100);
  background: rgba(#000, 0.8);
  z-index: 9;
  * {
    display: block;
  }
  input {
    min-width: 300px;
    font-size: 1rem;
    padding: 1rem;
  }
  button {
    cursor: pointer;
    border: 2px solid #fff;
    color: #fff;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    &:hover {
      background: #fff;
      color: #000;
    }
  }
}
</style>
