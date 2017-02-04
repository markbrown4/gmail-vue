<template>
  <div v-on:click="bodyClick">
    <TopHeader />
    <SubHeader />
    <TopNav />
    <div class="content">
      <router-view><router-view>
    </div>
    <Compose />
    <Flash />
  </div>
</template>

<style lang="scss" scoped>
.content {
  overflow: auto;
  overflow-x: hidden;
  margin: 0 15px 0 185px;
}
</style>

<script>
import '../scss/app.scss'
import eventBus from '../event_bus'

import TopHeader from './topheader'
import TopNav from './topnav'
import SubHeader from './subheader'
import Flash from './flash'
import Compose from './compose'

export default {
  name: 'app',
  components: {
    TopHeader,
    TopNav,
    SubHeader,
    Flash,
    Compose
  },
  methods: {
    bodyClick() {
      eventBus.$emit('bodyClick')
    }
  }
}
</script>
