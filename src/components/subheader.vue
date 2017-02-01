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
    selectedThreadIds() {
      return this.$store.state.selectedThreadIds
    },
    page() {
      return this.$store.state.page
    },
    someSelected() {
      return this.selectedThreadIds.length > 0
    },
    noneSelected() {
      return this.selectedThreadIds.length == 0
    },
    allSelected() {
      return this.selectedThreadIds.length > 0 && this.selectedThreadIds.length == this.threads.length
    }
  },
  methods: {
    selectAll() {
      this.$store.commit('THREADS_SELECT_ALL')
    },
    selectNone() {
      this.$store.commit('THREADS_SELECT_NONE')
    },
    selectUnread() {
      this.$store.commit('THREADS_SELECT_UNREAD')
    },
    selectRead() {
      this.$store.commit('THREADS_SELECT_READ')
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
