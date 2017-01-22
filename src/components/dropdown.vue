<template>
  <div class="drop-down" :class="{active: active}" v-on:click.stop="toggle()">
    <slot />
  </div>
</template>

<script>
import eventBus from '../event_bus';

export default {
  name: 'drop-down',
  data() {
    return { active: false }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  },
  created() {
    eventBus.$on('bodyClick', () => {
      this.active = false;
    })
  }
}
</script>
