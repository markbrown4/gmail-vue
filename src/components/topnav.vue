<template>
  <div class="nav">
    <a class="compose" @click.stop="compose">COMPOSE</a>
    <ul>
      <li class="active"><router-link to="/">Inbox</router-link></li>
      <li><a>Sent Mail</a></li>
      <li><a>Drafts</a></li>
      <li><a>Trash</a></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/common';

.nav {
  float: left;
  width: 150px;
  margin: 10px 20px 15px 30px;
}
ul {
  margin-left: -30px;
}
li.active a {
  border-left-color: $red;
  color: $red;
  font-weight: bold;
}
a {
  display: block;
  padding: 3px 3px 3px 27px;
  text-decoration: none;
  border-left: 3px solid #fff;
  color: inherit;
  &:hover {
    background: #e5e5e5;
    border-left-color: #e5e5e5;
  }
}
.compose {
  width: 100px;
  padding: 8px 10px 7px;
  margin-bottom: 15px;
  background: $red;
  background: linear-gradient(lighten($red, 5%), $red);
  border: none;
  color: #fff;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  border-radius: 2px;
  text-shadow: 0 1px 1px rgba(#000, .2);
  &:hover {
    background: linear-gradient(darken($red, 5%), darken($red, 10%));
    box-shadow: 0 1px 1px rgba(#000, .2);
  }
}
</style>

<script>
import eventBus from '../event_bus'

export default {
  name: 'topnav',
  methods: {
    compose() {
      eventBus.$emit('COMPOSE_OPEN')
    }
  }
}
</script>
