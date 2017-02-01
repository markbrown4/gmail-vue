<template>
  <ul id="threads">
    <li v-for="thread in filteredThreads" :class="{ unread: thread.unread, selected: isSelected(thread) }">
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

import Fuse from 'fuse.js'

export default {
  name: 'threads',
  created() {
    this.$store.dispatch('fetchThreads')
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    filteredThreads() {
      if (this.query.length === 0) {
        return this.threads
      } else {
        return new Fuse(this.threads, {
          keys: [
            'lastMessage.subject',
            'lastMessage.snippet',
            'participants.firstName',
            'participants.lastName'
          ]
        }).search(this.query)
      }
    },
    selectedThreadIds() {
      return this.$store.state.selectedThreadIds
    },
    query() {
      return this.$store.state.query
    },
  },
  methods: {
    isSelected(thread) {
      return this.selectedThreadIds.indexOf(thread.id) > -1
    },
    toggleSelected(thread) {
      this.$store.commit('THREADS_SELECT_THREAD', thread.id)
    }
  }
}
</script>
