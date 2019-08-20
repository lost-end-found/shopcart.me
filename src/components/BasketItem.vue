<template lang="html">
  <div class="u-flex u-ai-center c-basket__item">
    <div class="o-media">
      <div
        class="o-media__fixed"
        style="width: 38px"
      >
        <span class="u-p o-type-item">{{ amount }}</span>
      </div>
      <div class="o-media__fluid">
        <div class="u-text-left o-type-item">
          {{ name }}
        </div>
        <div class="u-text-left o-type-label u-color-light-grey">
          {{ category }}
        </div>
      </div>
      <div class="o-media__fixed">
        <div
          v-if="hasButtons"
          class="u-flex u-jc-end u-ai-center"
        >
          <!-- <sas-button
            name="button"
            @click.native="emitRemove();"
          >
            🗑
          </sas-button> -->
          <sas-button
            v-if="isHomePage"
            class="u-mr"
            @click.native="emitMinus();"
          >
            -
          </sas-button>
          <sas-button
            v-if="isHomePage"
            @click.native="emitPlus();"
          >
            +
          </sas-button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import SasButton from '@/components/SAS/SASButton'

export default {
  components: {
    SasButton
  },
  props: {
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
.c-basket {
  &__item {
    height: 60px;
    background: rgba(255,255,255,0.00);
box-shadow: 0 1px 0 0 rgba(0,0,0,0.08);
  }
}
</style>
