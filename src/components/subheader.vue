<template>
  <div class="sub-header">
    <h1 class="app-name"><span>V</span>mail</h1>
    <div class="paging" v-if="page">
      <strong>{{ page.from }}-{{ page.to }}</strong>
      of
      <strong>{{ page.count }}</strong>
      <div class="split-btn">
        <a href class="btn btn-mini" title="Previous"><Icon name="prev" /></a>
        <a href class="btn btn-mini" title="Next"><Icon name="next" /></a>
      </div>
    </div>
    <router-link to="/" v-if="$route.name != 'inbox'" class="btn" title="Back to Inbox"><Icon name="back" /></router-link>
    <DropDown class="btn" v-if="$route.name == 'inbox'">
      <CheckBox :onChange="() => bulkToggle()" :selected="allSelected" :someSelected="someSelected" />
      <Icon name="down" />
      <ul>
        <li><a @click="selectAll">All</a></li>
        <li><a @click="selectNone">None</a></li>
        <li><a @click="selectRead">Read</a></li>
        <li><a @click="selectUnread">Unread</a></li>
      </ul>
    </DropDown>
    <div class="split-btn" v-if="$route.name == 'thread' || someSelected">
      <a href class="btn" title="Archive"><Icon name="archive" /></a>
      <a href class="btn" title="Report Spam"><Icon name="spam" /></a>
      <a href class="btn" title="Delete"><Icon name="delete" /></a>
    </div>
    <a href class="btn" v-if="$route.name == 'inbox' && this.noneSelected"><Icon name="refresh" /></a>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/common';

.sub-header {
  padding: 8px 30px 8px 200px;
  border-bottom: 1px solid #e5e5e5;
  height: 30px;
}
.app-name {
  margin: 0 0 0 -170px;
  line-height: 32px;
  color: $red;
  float: left;
}
.paging {
  float: right;
  line-height: 32px;
  .split-btn {
    float: right;
    margin: 0 0 0 10px;
    line-height: 1.2;
  }
  .btn {
    .icon { opacity: .5 }
    &:hover .icon {
      opacity: .9;
    }
  }
  .inactive {
    cursor: default;
    .icon { opacity: .3 }
    &:hover .icon {
      opacity: .3;
    }
  }
}
</style>

<script>
import DropDown from './drop-down'
import Icon from './icon'
import CheckBox from './check-box'

import store from '../store'

export default {
  name: 'subheader',
  components: {
    DropDown,
    Icon,
    CheckBox
  },
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
  }
}
</script>
