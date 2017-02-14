<template>
  <ul class="threads">
    <li v-for="thread in filteredThreads" class="thread" :class="{ unread: thread.unread, selected: isSelected(thread) }">
      <router-link :to="`/threads/${thread.id}`">
        <time>{{ thread.lastMessage.createdAt | smartDate }}</time>
        <CheckBox :selected="isSelected(thread)" :onChange="() => toggleSelected(thread)" />
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

<style lang="scss" scoped>
.threads {
  border-top: 1px solid #e5e5e5;
  margin-top: 10px;
}
time {
  float: right;
  width: 55px;
  text-align: right;
  padding: 0 20px;
  background: #f5f5f5;
  position: relative;
}
.people {
  float: left;
  width: 180px;
}
.body {
  color: #777;
}
a {
  display: block;
  padding: 8px 0 8px 10px;
  color: inherit;
  text-decoration: none;
}
.thread {
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  white-space: nowrap;
  &.unread {
    background: #fff;
    time {
      background: #fff;
    }
    .subject, .name.unread, time {
      font-weight: bold;
    }
  }
  &.selected {
    background: #ffc;
    time {
      background: #ffc;
    }
  }
}
</style>

<script>
import Fuse from 'fuse.js'

import CheckBox from './check-box'

export default {
  name: 'threads',
  components: {
    CheckBox
  },
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
