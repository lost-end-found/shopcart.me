<template>
  <div>
    <div class="c-modal__header u-pv u-flex u-jc-between">
      <div />
      <input
        v-model="name"
        class="o-type-h1 u-text-center"
        :placeholder="item.name"
        @blur="editName;"
        @keydown.enter="editName"
      >
      <div
        class="u-p"
        @click="$store.dispatch('modal/deleteModal')"
      >
        <img src="@/assets/icons/close.svg" alt="close modal">
      </div>
    </div>
    <div class="u-p u-text-left">
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
        class="o-type-label u-color-grey"
        placeholder="Add description here"
        @blur="editDescription"
        @keydown.prevent.enter="editDescription"
      />
    </div>
    <div class="c-modal__footer u-p u-text-left">
      <sas-button
        class="u-ph"
        @click.native="deleteItem"
      >
        Delete item
      </sas-button>
    </div>
  </div>
</template>
<script>
import SASButton from '@/components/SAS/SASButton.vue'
import { db } from '@/firebase'
import autosize from 'autosize'
export default {
  name: 'EditItem',
  components: {
    'sas-button': SASButton
  },
  props: {
    'item': {
      type: Object,
      required: true,
      default: function () {
        return ''
      }
    }
  },
  data: () => ({
    name: '',
    description: '',
    categories: [],
    selectedCategory: ''
  }),
  mounted () {
    this.$rtdbBind('categories', db.ref(`/${this.$store.state.user.user.uid}/categories`))
    this.name = this.item.name
    this.selectedCategory = this.item.category

    if (this.item.description) {
      this.description = this.item.description
    }
    setTimeout(() => {
      autosize(this.$refs.refDescription)
    }, 100)
  },
  destroyed () {
    autosize.destroy(this.$refs.refDescription)
  },
  methods: {
    createNewCategory (newCategory) {
      db.ref(`${this.$store.state.user.user.uid}/categories`).push({
        name: newCategory
      })
    },
    updateCategory (e) {
      if (e) {
        db.ref(`${this.$store.state.user.user.uid}/items`)
          .child(this.item['.key'])
          .update({
            category: e.name
          })
      }
    },
    deleteItem () {
      const confirmDelete = confirm('Are you sure you want to delete this item?')
      if (confirmDelete === true) {
        db.ref(`${this.$store.state.user.user.uid}/items`)
          .child(this.item['.key'])
          .remove()
          .then(e => {
            this.$store.dispatch('modal/deleteModal')
          })
      } else {

      }
    },
    editDescription (e) {
      db.ref(`${this.$store.state.user.user.uid}/items`)
        .child(this.item['.key'])
        .update({
          description: e.target.value
        })
    },
    editName (e) {
      db.ref(`${this.$store.state.user.user.uid}/items`)
        .child(this.item['.key'])
        .update({
          name: e.target.value
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.c-modal__header {
  border-bottom: 1px solid rgba(#000, 0.1);
}
textarea {
  width: 100%;
  outline: none;
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  resize: none;
  overflow: scroll;
  border: none;
  background-color: rgba(0, 0, 0, 0.02);
  padding: 4px;
  margin-top: 8px;
  border-radius: 4px;
  transition: box-shadow ease 300ms;
  &:focus {
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }
}
</style>
