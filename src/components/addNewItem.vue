<template lang="html">
  <div class="newItem">
    <div class="newItem_container">
      <input
        ref="NewItem"
        v-model="addNewItem"
        type="text"
        name=""
        autofocus
        placeholder="Start here..."
        @keydown.esc="closeNewItem();"
        @keydown.enter="addItem(), closeNewItem();"
      >
      <button
        type="button"
        name="button"
        @click="addItem(), closeNewItem();">
        Add new item
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { db } from "@/firebase";

export default {
  data: () => ({
    addNewItem: ""
  }),
  mounted() {
    //do something after mounting vue instance
    this.$refs.NewItem.focus();
  },
  methods: {
    addItem() {
      db.ref(`${store.state.user.user.uid}/items`).push({
        name: this.addNewItem,
        category: "Uncategorized",
        amount: 0
      });
      this.addNewItem = "";
    },
    closeNewItem() {
      this.$emit("closeNewItem");
    }
  },
};
</script>

<style lang="scss">
.newItem {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background: rgba(#000, 0.8);
  z-index: 9;
  * {
    display: block;
  }
  &_container {
    background: #000;
    padding: 1rem;
  }
  input {
    min-width: 300px;
    font-size: 1rem;
    padding: 1rem;
  }
  button {
    cursor: pointer;
    background: #000;
    border: 2px solid #fff;
    color: #fff;
    width: 100%;
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    &:hover {
      background: #fff;
      color: #000;
    }
  }
}
</style>
