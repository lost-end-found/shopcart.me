<template lang="html">
  <li class="u-flex u-jc-between u-p u-m item u-ai-center">
    <div class="o-list__item u-4/9 u-text-left">
      {{ name }}
    </div>
    <div class="o-list__item u-5/9 u-flex u-jc-end u-ai-center">
      <SASButton
        size="slim"
        name="button"
        class="u-mr"
        @click.native="emitRemove();"
      >
        🗑
      </SASButton>
      <SASButton
        v-if="isHomePage"
        size="slim"
        @click.native="emitMinus();"
      >
        -
      </SASButton>
      <span class="u-p">{{ amount }}</span>
      <SASButton
        v-if="isHomePage"
        size="slim"
        @click.native="emitPlus();"
      >
        +
      </SASButton>
    </div>
  </li>
</template>

<script>
import SASButton from '@/components/SAS/SASButton'

export default {
  components: {
    SASButton
  },
  props: {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: null,
      required: false
    }
  },
  computed: {
    isHomePage: function isHomePage () {
      return this.$route.path === '/basket'
    }
  },
  methods: {
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
.item {
  list-style: none;
  border: 1px #2c3e50 solid;
  border-radius: 5px;
}
</style>
