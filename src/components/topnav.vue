<template>
  <div id="nav">
    <a href class="compose">COMPOSE</a>
    <ul>
      <li class="active"><router-link to="/">Inbox</router-link></li>
      <li><a href>Sent Mail</a></li>
      <li><a href>Drafts</a></li>
      <li><a href>Trash</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'topnav'
}
</script>
