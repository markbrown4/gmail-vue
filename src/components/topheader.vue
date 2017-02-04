<template>
  <div class="header">
    <span class="logo"><img src="/static/logo.png"></span>
    <DropDown class="account-nav">
      <img class="avatar" src="/static/avatars/me.jpg">
      <ul class="align-right">
        <li><a href>Mark Brown &lt;markbrown4@gmail.com&gt;</a></li>
        <li><a href>Mark Brown &lt;mark@inspire9.com&gt;</a></li>
        <li><a href>Mark Brown &lt;mark@adioso.com&gt;</a></li>
      </ul>
    </DropDown>
    <form class="search">
      <input class="search-input" name="query" @input="search">
      <button type="submit" class="search-btn primary-btn">
        <span class="icon-search"></span>
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
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 16px;
  margin-top: -3px;
  background: url(/static/icons/search.png) 50% 50% no-repeat;
  background-size: auto 15px;
}
</style>

<script>
import DropDown from './dropdown'

export default {
  name: 'topheader',
  components: {
    DropDown
  },
  methods: {
    search(event) {
      this.$store.dispatch('search', event.target.value)
    }
  }
}
</script>
