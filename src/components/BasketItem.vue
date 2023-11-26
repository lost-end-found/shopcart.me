<template >
  <div class="flex items-center bg-white border border-gray-200/40 shadow h-14 pr-4 rounded-md">
    <div class="flex space-x-3 justify-between w-full">
      <div class="shrink-0 text-center w-11">
        <span class="o-type-item">{{ amount }}</span>
      </div>
      <div class="flex-grow flex justify-center flex-col" @click="editItem()">
        <div class="text-left text-base">
          {{ name }}
        </div>
        <div class="text-left text-xs text-gray-400">
          {{ item.category }}
        </div>
      </div>
      <div class="shrink-0">
        <div class="flex justify-items-end items-center">
          <SasButton
            v-if="hasRemoveButton"
            name="button"
            @click="emitRemove()"
          >
            <img
              class="mx-auto w-6"
              src="../assets/icons/trash.svg"
              alt="trash icon"
            />
          </SasButton>
          <SasButton v-if="hasButtons" class="mr-2" @click="emitMinus()">
            <img
              src="../assets/icons/minus-white.svg"
              width="24px"
              class="mx-auto w-6"
              alt="decrease amount"
            />
          </SasButton>
          <SasButton v-if="hasButtons" @click="emitPlus()">
            <img
              src="../assets/icons/plus-white.svg"
              class="mx-auto w-6"
              alt="increase amount"
            />
          </SasButton>
        </div>
      </div>
    </div>
    <DialogRoot v-model:open="editItemOpen">
      <DialogTrigger />
      <DialogPortal>
        <DialogOverlay class="DialogOverlay" />
        <Transition name="slide-up">
          <DialogContent class="DialogContent">
            <DialogTitle />
            <DialogDescription />
            <EditItem :item="item" @closeEditItem="editItem" />
            <DialogClose class="absolute top-2 right-2" />
          </DialogContent>
        </Transition>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<script setup>
import { defineProps, computed, watch, ref, toRefs } from "vue";
import SasButton from "./SAS/SASButton.vue";
import EditItem from "./EditItem.vue";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: null,
  },
  category: {
    type: String,
    default: "Uncategorized",
  },
  hasButtons: {
    type: Boolean,
    default: false,
  },
  hasRemoveButton: {
    type: Boolean,
    default: false,
  },
});

const editItemOpen = ref(false);

const { item, name, amount, category, hasButtons, hasRemoveButton } =
  toRefs(props);

const isHomePage = computed(() => {
  return $route.path === "/basket";
});

const editItem = () => {
  editItemOpen.value = !editItemOpen.value;
};

const emit = defineEmits(["emitMinus", "emitPlus", "emitRemove"]);

const emitMinus = () => {
  emit("emitMinus");
};

const emitPlus = () => {
  emit("emitPlus");
};

const emitRemove = () => {
  emit("emitRemove");
};
</script>
<style scoped>
/* styles.css */
.DialogOverlay {
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
}

.DialogContent {
  @apply bg-white rounded-t-lg overflow-hidden w-full min-w-min max-w-md z-10 fixed bottom-0 left-1/2 transform -translate-x-1/2;
}
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-300 transform translate-y-0;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply transition-all duration-300 transform translate-y-full;
}
</style>