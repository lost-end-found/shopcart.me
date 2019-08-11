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
  name: 'PDSButton',
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
  appearance: none;
  display: inline-block;
  border-radius: 3px;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  padding: 8px 16px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition-property: background, border, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  outline: none;
  border: 0;

  &.is-disabled {
    cursor: default;
    pointer-events: none;
  }
}

.c-button--default {
  background: linear-gradient(-180deg, #ffffff 0%, #f8f7fa 100%);
  border: 1px solid #d0cfd4;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  // color: $color-ink;

  &:hover {
    background: linear-gradient(-180deg, #fafbfc 0%, #ebeff2 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    background: #f4f6f8;
    border: 1px solid #d0cfd4;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
    border: 1px solid #e4e3e6;
  }
}

.c-button--primary {
  color: #fff;
  background: linear-gradient(-180deg, #916dff 0%, #6234d4 100%);
  border: 1px solid #5a3dcc;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
    inset 0 1px 0 1px rgba(255, 255, 255, 0.06);

  &:hover {
    background: linear-gradient(-180deg, #6234d4 0%, #391395 100%);
    border: 1px solid #331d8f;
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  }

  &:active {
    background: linear-gradient(-180deg, #5a3dcc 0%, #5a3dcc 100%);
    border: 1px solid #331d8f;
    box-shadow: inset 0 2px 1px 0 #331d8f;
  }

  &.is-disabled {
    background: #aaa1ff;
    border: 1px solid #9e95ed;
  }
}

.c-button--destructive {
  background: linear-gradient(-180deg, #ffffff 0%, #f8f7fa 100%);
  border: 1px solid #d0cfd4;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  color: #e0442f;

  &:hover {
    // border: 1px solid #E0442F;
    background: linear-gradient(-180deg, #fafbfc 0%, #ebeff2 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    // border: 1px solid #E0442F;
    background: #f4f6f8;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
    border: 1px solid #e4e3e6;
  }
}

.c-button--danger {
  background-image: linear-gradient(-180deg, #ff6e5e 0%, #f3301d 100%);
  border: 1px solid #e0442f;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
    inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  color: #fff;

  &:hover {
    background-image: linear-gradient(-180deg, #e0442f 0%, #bf231b 100%);
    border: 1px solid #bf231b;
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  }

  &:active {
    background-image: linear-gradient(0deg, #e0442f 0%, #bf231b 100%);
    border: 1px solid #bf231b;
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.1),
      inset 0 1px 0 1px rgba(255, 255, 255, 0.09);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
    border: 1px solid #e4e3e6;
  }
}

.c-button--success {
  background: linear-gradient(-180deg, #ffffff 0%, #f8f7fa 100%);
  border: 1px solid #d0cfd4;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  color: #0da16d;

  &:hover {
    // border: 1px solid #0DA16D;
    background: linear-gradient(-180deg, #fafbfc 0%, #ebeff2 100%);
    box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }

  &:active {
    // border: 1px solid #0DA16D;
    background: #f4f6f8;
    box-shadow: inset 0 1px 1px 0 rgba(99, 115, 129, 0.6),
      inset 0 1px 4px 0 rgba(99, 115, 129, 0.2);
  }

  &.is-disabled {
    color: #d0cfd4;
    background: #f9fafb;
    border: 1px solid #e4e3e6;
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
