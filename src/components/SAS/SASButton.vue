<template>
  <component
    :is="element"
    :to="to"
    :class="classes"
    :disabled="disabled"
    :type="computedAction"
  >
    <slot />
  </component>
</template>
<script>

export default {
  name: 'SasButton',
  props: {
    /**
     * The type of button. Available options are ```default, primary, destructive, transparent, success```
     */
    type: {
      type: String,
      default: 'default'
    },
    /**
     * The size of the button. Available options are ```slim```
     */
    size: {
      type: String,
      default: null
    },
    /**
     * ```<router-link>``` ```to``` prop. More info [here](https://router.vuejs.org/en/api/router-link.html)
     */
    to: {
      type: [String, Object],
      default: null
    },
    /**
     * Disable button
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Behaviour of the button.
     */
    action: {
      type: String,
      default: null
    }
  },
  computed: {
    classes () {
      return {
        // Type
        'c-button': true,
        'c-button--default': this.type === 'default',
        'c-button--primary': this.type === 'primary',
        'c-button--destructive': this.type === 'destructive',
        'c-button--danger': this.type === 'danger',
        'c-button--success': this.type === 'success',
        'c-button--transparent': this.type === 'transparent',

        // Size
        'c-button--slim': this.size === 'slim',

        // Disabled
        'is-disabled': this.disabled
      }
    },
    element () {
      let el = 'button'
      if (this.to) {
        el = 'router-link'
      }
      return el
    },
    computedAction () {
      let action = ''
      // If is not a link
      if (!this.to) {
        // If a specific action is defined
        if (this.action) {
          action = this.action
        } else {
          action = 'button'
        }
      }
      return action
    }
  }
}
</script>

<style lang="scss" scoped>
// Types
.c-button {
  border: none;
  &.is-disabled {
    cursor: default;
    pointer-events: none;
  }
}

.c-button--default {
  background: #000;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.18);
  border-radius: 8px;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -0.41px;
  text-align: center;
  min-height: 42px;
  min-width: 42px;
  margin: 0;
  padding: 0;
  line-height: 22px;

  &:hover {
    background: rgba(#000, 0.8);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    background: rgba(#000, 0.95);
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
    inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
  }
}

.c-button--primary {
  color: #fff;
  background: linear-gradient(-180deg, #916dff 0%, #6234d4 100%);
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
    inset 0 1px 0 1px rgba(255, 255, 255, 0.06);

  &:hover {
    // background: linear-gradient(-180deg, #6234d4 0%, #391395 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  }

  &:active {
    // background: linear-gradient(-180deg, #5a3dcc 0%, #5a3dcc 100%);
    box-shadow: inset 0 2px 1px 0 #331d8f;
  }

  &.is-disabled {
    background: #aaa1ff;
  }
}

.c-button--destructive {
  background: linear-gradient(-180deg, #ffffff 0%, #f8f7fa 100%);
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  color: #e0442f;

  &:hover {
    background: linear-gradient(-180deg, #fafbfc 0%, #ebeff2 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    background: #f4f6f8;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
  }
}

.c-button--danger {
  background-image: linear-gradient(-180deg, #ff6e5e 0%, #f3301d 100%);
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
    inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  color: #fff;

  &:hover {
    background-image: linear-gradient(-180deg, #e0442f 0%, #bf231b 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  }

  &:active {
    background-image: linear-gradient(0deg, #e0442f 0%, #bf231b 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
  }
}

.c-button--success {
  background: linear-gradient(-180deg, #ffffff 0%, #f8f7fa 100%);
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  color: #0da16d;

  &:hover {
    background: linear-gradient(-180deg, #fafbfc 0%, #ebeff2 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    background: #f4f6f8;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
  }
}

.c-button--transparent {
  color: #fff;
  background: rgba(255, 255, 255, 0.25);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }

  &.is-disabled {
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.6);
  }
}

// Sizes
.c-button--slim {
  padding: 4px 12px;
}
</style>
