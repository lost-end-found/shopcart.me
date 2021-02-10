<template lang="html">
  <div class="flex items-center c-basket__item h-14">
    <div class="o-media">
      <div
        class="o-media__fixed text-center"
        style="width: 44px"
      >
        <span class="o-type-item">{{ amount }}</span>
      </div>
      <div
        class="o-media__fluid"
        @click="editItem(item)"
      >
        <div class="text-left text-base">
          {{ name }}
        </div>
        <div class="text-left text-xs text-gray-400">
          {{ item.category }}
        </div>
      </div>
      <div class="o-media__fixed">
        <div
          class="flex justify-items-end items-center"
        >
          <sas-button
            v-if="hasRemoveButton"
            name="button"
            @click.native="emitRemove();"
          >
            <img
              class="mx-auto w-6"
              src="@/assets/icons/trash.svg"
              alt="trash icon"
            >
          </sas-button>
          <sas-button
            v-if="hasButtons"
            class="mr-2"
            @click.native="emitMinus();"
          >
            <img
              src="@/assets/icons/minus-white.svg"
              width="24px"
              class="mx-auto w-6"
              alt="decrease amount"
            >
          </sas-button>
          <sas-button
            v-if="hasButtons"
            @click.native="emitPlus();"
          >
            <img
              src="@/assets/icons/plus-white.svg"
              class="mx-auto w-6"
              alt="increase amount"
            >
          </sas-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SasButton from '@/components/SAS/SASButton'
import EditItem from '@/components/EditItem'

export default {
  components: {
    SasButton
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: null
    },
    category: {
      type: String,
      default: 'Uncategorized'
    },
    hasButtons: {
      type: Boolean,
      default: false
    },
    hasRemoveButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isHomePage: function isHomePage () {
      return this.$route.path === '/basket'
    }
  },
  methods: {
    editItem (item) {
      this.$store.dispatch('modal/addModal', {
        content: EditItem,
        props: {
          item: item
        }
      })
    },
    emitMinus () {
      this.$emit('emitMinus')
    },
    emitPlus () {
      this.$emit('emitPlus')
    },
    emitRemove () {
      this.$emit('emitRemove')
    }
  }
}
</script>
<style lang="scss">
.c-basket {
  &__item {
    background: rgba(255, 255, 255, 0);
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }
}
</style>
