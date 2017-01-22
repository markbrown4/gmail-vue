<template>
  <div id="thread" v-if="thread">
    <h1>{{ thread.messages[0].subject }}</h1>
    <ul class="messages">
      <li v-for="message, index in thread.messages" :class="{ active : message.active }" v-on:click="toggleActive(message)">
        <div class="thread-tools">
          <time>
            {{ message.createdAt | smartDate }}
            ({{ message.createdAt | timeAgo }})
          </time>
          <div class="split-btn" v-if="message.active">
            <a href class="btn"><i class="icon icon-reply"></i></a>
            <DropDown class="btn btn-mini">
              <i class="icon icon-down"></i>
              <ul class="align-right">
                <li><a href>Reply</a></li>
                <li><a href>Reply all</a></li>
                <li><a href>Forward</a></li>
              </ul>
            </DropDown>
          </div>
        </div>
        <img class="avatar" :src="message.from.avatarUrl">
        <div class="from">
          <span class="name">{{ message.from | smartName }}</span>
          <span class="email">&lt;{{ message.from.email }}&gt;</span>
        </div>
        <div class="to" v-if="message.active">to
          <span v-for="person, index in message.to">{{ person | smartName(false) }}{{ index == message.to.length - 1 ? '': ', ' }}</span>
        </div>
        <div class="body" v-html="message.active ? message.body : message.snippet"></div>
      </li>
    </ul>
    <div class="reply">
      <img :src="currentUser.avatarUrl" class="avatar">
      <div class="reply-box">
        <p>Click here to <a href>Reply</a>, <a href>Reply to all</a> or <a href>Forward</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from './dropdown'

export default {
  name: 'thread',
  created() {
    this.$store.dispatch('fetchThread', this.$route.params.id)
  },
  computed: {
    currentUser() {
      return window.currentUser
    },
    thread() {
      const thread = this.$store.state.thread
      if (thread) {
        thread.messages[thread.messages.length - 1].active = true
      }

      return thread
    }
  },
  methods: {
    toggleActive(message) {
      this.$set(message, 'active', !message.active)
    }
  },
  components: {
    DropDown
  }
}
</script>
