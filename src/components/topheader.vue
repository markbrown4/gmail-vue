<template>
  <div class="header">
    <span class="logo"><img src="/static/logo.png"></span>
    <DropDown class="account-nav">
      <img class="avatar" :src="currentUser.avatarUrl">
      <ul class="align-right">
        <li v-for="account in currentUser.accounts">
          <a @click="message.from = account">{{ account | nameAndEmail }}</a>
        </li>
      </ul>
    </DropDown>
    <form class="search">
      <input class="search-input" name="query" @input="search">
      <button type="submit" class="search-btn primary-btn">
        <Icon name="search" />
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/common';

.header {
  @include clearfix;
  background: #f1f1f1;
  border-bottom: 1px solid #e5e5e5;
  padding: 14px 30px 12px;
}
.logo {
  float: left;
  width: 150px;
  margin: 0 20px 0 0;
  img {
    display: block;
    width: 90px;
  }
}
.account-nav {
  float: right;
}
.avatar {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  overflow: hidden;
}
.search-input {
  float: left;
  width: 510px;
  padding: 5px 7px 4px;
  border: 1px solid #d9d9d9;
  border-top-color: #c0c0c0;
  font-size: 16px;
  &:focus {
    border-color: #4d90fe;
  }
}
.search-btn {
  float: left;
  margin-left: -1px;
  border-radius: 0 3px 3px 0;
}
.icon-search {
  margin-top: -3px;
}
</style>

<script>
import Icon from './icon'
import DropDown from './dropdown'

export default {
  name: 'topheader',
  components: {
    DropDown,
    Icon
  },
  data() {
    return {
      currentUser: window.currentUser
    }
  },
  methods: {
    search(event) {
      this.$store.dispatch('search', event.target.value)
    }
  }
}
</script>
