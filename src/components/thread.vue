<template>
  <div class="thread" v-if="thread">
    <h1>{{ thread.messages[0].subject }}</h1>
    <ul class="messages">
      <li v-for="message, index in thread.messages" class="message" :class="{ active : message.active }" @click="toggleActive(message)">
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
          <span class="email" v-if="message.active">&lt;{{ message.from.email }}&gt;</span>
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

<style lang="scss" scoped>
h1 {
  padding-left: 10px;
}
.avatar {
  float: left;
  margin-left: -42px;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.from {
  margin: 0 5px 5px 0;
}
.to {
  color: #777;
  padding: 0 0 10px;
}
.name {
  color: #222;
  font-weight: bold;
}
.body {
  color: #555;
}
.email {
  color: #555
}
.message {
  white-space: nowrap;
  padding: 10px 20px 10px 52px;
  border-top: 1px solid #e5e5e5;
  background: #f5f5f5;
  cursor: pointer;
  time {
    margin-right: -20px;
    padding-right: 20px;
  }
  &.active {
    background: #fff;
    padding-bottom: 30px;
    white-space: normal;
    cursor: default;
    time {
      width: auto;
      background: inherit;
      padding: 0;
      margin: 0;
    }
    .body {
      color: #222;
    }
  }
}
.thread-tools {
  float: right;
  .split-btn {
    float: none;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 10px;
  }
}
.reply {
  border-top: 1px solid #e5e5e5;
  padding: 10px 10px 10px 52px;
  color: #999;
  a { color: inherit }
}
.reply-box {
  height: 64px;
  padding: 10px;
  border: 1px solid #e5e5e5;
}
</style>

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
