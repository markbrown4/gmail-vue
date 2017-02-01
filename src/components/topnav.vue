<template>
  <div id="nav">
    <a href class="compose" @click.prevent="compose">COMPOSE</a>
    <ul>
      <li class="active"><router-link to="/">Inbox</router-link></li>
      <li><a href>Sent Mail</a></li>
      <li><a href>Drafts</a></li>
      <li><a href>Trash</a></li>
    </ul>
  </div>
</template>

<script>
import eventBus from '../event_bus'

export default {
  name: 'topnav',
  methods: {
    compose() {
      eventBus.$emit('composeMessage')
    }
  }
}
</script>
