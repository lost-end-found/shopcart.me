<template>
  <div id="">
    <div class="c-modal__header u-pv u-flex u-jc-between">
      <div></div>
      <h1>Edit Item</h1>
      <div @click="$store.dispatch('modal/deleteModal')" class="u-p">
        X
      </div>
    </div>
    <div class="u-p u-text-left">
      <p class="o-type-item">
        {{ item.category }}
      </p>
      <p class="o-type-label u-color-light-grey">
        # description
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditItem',
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

  })
}
</script>
<style lang="scss" scoped>
.c-modal__header {
  border-bottom: 1px solid rgba(#000, 0.1);
}
</style>
