<template lang="html">
  <div class="newItem bottom-14 w-full left-0 fixed flex justify-center items-center">
    <div class="p-4 bg-black rounded-md shadow-lg">
      <input
        ref="NewItem"
        v-model="addNewItem"
        type="text"
        name=""
        class="rounded-md"
        autofocus
        placeholder="Start here..."
        @keydown.esc="closeNewItem();"
        @keydown.enter="addItem(), closeNewItem();"
      >
      <button
        type="button"
        name="button"
        class="bg-black transition-colors border-white border-2 border-solid rounded-md mt-4"
        @click="addItem(), closeNewItem();"
      >
        Add new item
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { db } from '@/firebase'

export default {
  data: () => ({
    addNewItem: ''
  }),
  mounted () {
    // do something after mounting vue instance
    this.$refs.NewItem.focus()
  },
  methods: {
    addItem () {
      db.ref(`${store.state.user.user.uid}/items`).push({
        name: this.addNewItem,
        category: 'Uncategorized',
        amount: 0,
        description: ''
      })
      this.addNewItem = ''
    },
    closeNewItem () {
      this.$emit('closeNewItem')
    }
  }
}
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
