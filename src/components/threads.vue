<template>
  <ul id="threads">
    <li v-for="thread in threads" :class="{ unread: thread.unread, selected: thread.selected }">
      <router-link :to="`/threads/${thread.id}`">
        <time>{{ thread.lastMessage.createdAt | smartDate }}</time>
        <span class="check" v-on:click.stop.prevent="toggleSelected(thread)"></span>
        <span class="people">
          <span class="name" :class="{unread: person.unread}" v-for="person, index in thread.participants">
            {{ person | smartName(thread.messageCount == 1) }}{{ index == thread.participants.length - 1 ? '' : ', ' }}
          </span>
          <span v-if="thread.messageCount > 1">({{ thread.messageCount }})</span>
        </span>
        <span class="subject">{{ thread.lastMessage.subject }}</span>
        <span class="body">- {{ thread.lastMessage.snippet }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'threads',
  created() {
    this.$store.dispatch('fetchThreads')
  },
  computed: {
    threads() { return this.$store.state.threads }
  },
  methods: {
    toggleSelected(thread) {
      this.$set(thread, 'selected', !thread.selected)
    }
  }
}
</script>
