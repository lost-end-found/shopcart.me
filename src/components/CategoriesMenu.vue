<template>
  <div class="navigation">
    <div
      class="burger"
      :class="{active: burgerOpen}"
      @click="burgerOpen = !burgerOpen"
    >
      <span />
    </div>
    <div
      v-show="burgerOpen"
      id="nav-menu"
      class="menu"
    >
      <div
        class="fixed top-0 left-0 h-screen w-screen"
        @click="burgerOpen = !burgerOpen"
      />
      <router-link
        class="link"
        :to="{ path: 'categories'}"
      >
        All Categories
      </router-link>
      <router-link
        v-for="category in categories"
        :key="category.key"
        class="link"
        :to="{path: category.url}"
      >
        {{ category.url }}<span
          class="deleteCategory"
          @click="deleteCategory(category)"
        />
      </router-link>
      <input
        v-model="newCategory"
        type="text"
        name=""
        value=""
        placeholder="Add Category"
        @keydown.enter="addCategory()"
      >
    </div>
  </div>
</template>
<script>
import {
  firebaseApp
} from '@/firebase'
const db = firebaseApp.database()
var categories = db.ref('categories')

export default {
  name: 'NavMenu',
  data: () => ({
    categories: [],
    category: '',
    newCategory: '',
    burgerOpen: false,
    newCategoryShow: false
  }),
  created () {
    this.$bindAsArray('categories', categories)
  },
  methods: {
    addCategory (newCategory) {
      categories.push({
        url: this.newCategory
      })
      this.newCategory = ''
    },
    deleteCategory (category) {
      categories.child(category['.key']).remove()
    }
  }
}
</script>
<style lang="scss" scoped>
.burger {
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    position: relative;
    display: block;
    width: 20px;
    height: 4px;
    background: #fff;
    transition: all .2s ease-in-out;

    &:before, &:after {
      position: absolute;
      background: #fff;
      content: '';
      width: 20px;
      height: 4px;
      transition: all .2s ease-in-out;
    }

    &:before {
      top: -8px;
    }

    &:after {
      top: 8px;
    }
  }
}

.burger.active {
  span {
    background: transparent;

    &:before {
      transform: rotate(45deg) translate(5px, 6px);
    }

    &:after {
      transform: rotate(-45deg) translate(5px, -6px);
    }
  }
}
.navigation {
    position: fixed;
    z-index: 0;
    // background: #1E1E1E;
    // box-shadow: 0 1px 14px 0 rgba(0,0,0,0.10);
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    .menu {
      background: darken(#2b2b2b, 5%);
      position: fixed;
      top: 60px;
      height: calc(100% - 120px);
      width: 200px;
      display: flex;
      flex-direction: column;
      input, button {
        position: relative;
      }
    }
    .link {
      text-decoration: none;
        position: relative;
        &:hover {
            .deleteCategory {
                opacity: 1;
            }
        }
        .deleteCategory {
            opacity: 0;
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            cursor: pointer;
            &:after {
                content: "\f146";
                font-family: "FontAwesome";
            }
        }
    }
    a {
        color: #fff;
        padding: 10px 20px;
        border-left: 1px solid #181818;
        text-transform: capitalize;
        &:last-child {
            border-right: 1px solid #181818;
        }
        &.router-link-exact-active {
            background: #fff;
            color: #181818;
            + .deleteCategory {
                color: #181818;
            }
        }
    }
    input {
      color: #fff;
      padding: 10px 20px;
      border-left: 1px solid #181818;
      background: lighten(#2b2b2b, 10%);
      border: none;
      &:focus {
        background: lighten(#2b2b2b, 20%);
        color: darken(#2b2b2b, 10%)
      }
    }
}

.plus {
    padding: 0;
    margin: 0 auto;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
        content: "+";
    }
}
</style>
