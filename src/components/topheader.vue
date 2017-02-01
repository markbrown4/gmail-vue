<template>
  <div id="header">
    <span id="logo"><img src="/static/logo.png"></span>
    <DropDown class="account-nav">
      <img class="avatar" src="/static/avatars/me.jpg">
      <ul class="align-right">
        <li><a href>Mark Brown &lt;markbrown4@gmail.com&gt;</a></li>
        <li><a href>Mark Brown &lt;mark@inspire9.com&gt;</a></li>
        <li><a href>Mark Brown &lt;mark@adioso.com&gt;</a></li>
      </ul>
    </DropDown>
    <form class="search">
      <input name="query" @input="search">
      <button type="submit" class="primary-btn">
        <span class="icon-search"></span>
      </button>
    </form>
  </div>
</template>

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
