<template>
  <div class="flash" v-if="flashes.length > 0">
    <div v-for="flash in flashes" class="inner">{{ flash }}</div>
  </div>
</template>

<script>
export default {
  name: 'flash',
  computed: {
    flashes() {
      return this.$store.state.flashes
    }
  }
}
</script>
