<template>
  <div class="drop-down" :class="{active: active}" @click.stop="toggle()">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  cursor: pointer;
}
ul {
  position: absolute;
  z-index: 2;
  top: -9999px;
  left: 0;
  padding: 5px 0;
  background: #fff;
  border: 1px solid rgba(#000, .1);
  box-shadow: 0 1px 2px rgba(#000, .1);
  .drop-down.active & {
    top: 100%;
  }
  &.align-right {
    left: auto;
    right: 0;
  }
  a {
    display: block;
    padding: 3px 20px;
    color: #333;
    text-decoration: none;
    line-height: 1;
    white-space: nowrap;
    &:hover {
      background: #eee;
    }
  }
}
</style>

<script>
import eventBus from '../event_bus'

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
    eventBus.$on('BODY_CLICK', () => {
      this.active = false;
    })
  }
}
</script>
