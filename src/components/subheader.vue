<template>
  <div id="sub-header">
    <h1 class="app-name"><span>V</span>mail</h1>
    <div class="paging" v-if="page">
      <strong>{{ page.from }}-{{ page.to }}</strong>
      of
      <strong>{{ page.count }}</strong>
      <div class="split-btn">
        <a href class="btn btn-mini" title="Previous"><i class="icon icon-prev"></i></a>
        <a href class="btn btn-mini" title="Next"><i class="icon icon-next"></i></a>
      </div>
    </div>
    <router-link v-if="$route.name != 'inbox'" class="btn" to="/" title="Back to Inbox"><i class="icon icon-back"></i></router-link>
    <DropDown class="btn" v-if="$route.name == 'inbox'">
      <a v-on:click.stop="bulkToggle" class="check" :class="{ 'all-selected': this.allSelected, 'some-selected': this.someSelected }"></a>
      <i class="icon icon-down"></i>
      <ul>
        <li><a v-on:click="selectAll">All</a></li>
        <li><a v-on:click="selectNone">None</a></li>
        <li><a v-on:click="selectRead">Read</a></li>
        <li><a v-on:click="selectUnread">Unread</a></li>
      </ul>
    </DropDown>
    <div class="split-btn" v-if="$route.name == 'thread' || someSelected">
      <a href class="btn" title="Archive"><i class="icon icon-archive"></i></a>
      <a href class="btn" title="Report Spam"><i class="icon icon-spam"></i></a>
      <a href class="btn" title="Delete"><i class="icon icon-delete"></i></a>
    </div>
    <a href class="btn" v-if="$route.name == 'inbox' && this.noneSelected"><i class="icon icon-refresh"></i></a>
  </div>
</template>

<script>
import DropDown from './dropdown'
import store from '../store'

export default {
  name: 'subheader',
  computed: {
    threads() {
      return this.$store.state.threads
    },
    page() {
      return this.$store.state.page
    },
    someSelected() {
      const selected = this.threads.filter(thread => thread.selected).length
      return selected > 0
    },
    noneSelected() {
      const selected = this.threads.filter(thread => thread.selected).length
      return selected == 0
    },
    allSelected() {
      const selected = this.threads.filter(thread => thread.selected).length
      return this.threads.length > 0 && selected == this.threads.length
    }
  },
  methods: {
    selectAll() {
      console.log('all')
      this.$store.state.threads.forEach(thread => {
        this.$set(thread, 'selected', true)
      })
    },
    selectNone() {
      this.$store.state.threads.forEach(thread => {
        this.$set(thread, 'selected', false)
      })
    },
    selectUnread() {
      this.$store.state.threads.forEach(thread => {
        this.$set(thread, 'selected', thread.unread)
      })
    },
    selectRead() {
      this.$store.state.threads.forEach(thread => {
        this.$set(thread, 'selected', !thread.unread)
      })
    },
    bulkToggle() {
      if (this.noneSelected) {
        this.selectAll()
      } else {
        this.selectNone()
      }
    }
  },
  components: {
    DropDown
  }
}
</script>
