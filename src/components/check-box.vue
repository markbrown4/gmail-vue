<template>
<span
  class="check"
  :class="{
    'some-selected': someSelected && !selected,
    'selected': selected,
  }"
  @click.stop.prevent="onChange"
></span>
</template>

<style lang="scss" scoped>
.check {
  float: left;
  height: 11px;
  width: 11px;
  background: rgba(#fff, .2);
  border: 1px solid rgba(155, 155, 155, .57);
  margin: 1px 10px 0 0;
  position: relative;
  &:hover {
    box-shadow: inset 0 2px 2px rgba(#000, .1);
  }
  &:after {
    display: none;
    content: '';
    position: absolute;
    height: 21px;
    width: 21px;
    top: -5px;
    left: -5px;
    background: url(/static/icons/checkmark.png);
  }
}
.selected, .some-selected {
  background: rgba(#fff, .7);
  &:after {
    display: block;
  }
}
.some-selected:after {
  background: url(/static/icons/checkmark-partial.png);
}
</style>

<script>
export default {
  name: 'CheckBox',
  props:['selected', 'someSelected', 'onChange']
}
</script>
