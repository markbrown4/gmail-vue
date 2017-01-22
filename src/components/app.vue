<template>
  <div id="wrapper" v-on:click="bodyClick">
    <TopHeader />
    <SubHeader />
    <TopNav />
    <div id="content">
      <router-view><router-view>
    </div>
    <Compose />
    <Flash />
  </div>
</template>

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
