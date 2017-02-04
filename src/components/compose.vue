<template>
  <div class="compose" v-if="open">
    <div class="header section">
      <a class="close" @click="close">×</a>
      <h2>New Message</h2>
    </div>
    <div class="section">
      <div>
        <input class="full" name="recipients" placeholder="Recipients">
      </div>
      <div style="display: none">
        <div class="input">
          <label for="message_to">To</label>
          <div class="fit">
            <input id="message_to" class="full">
          </div>
        </div>
        <div class="input">
          <label for="message_cc">Cc</label>
          <div class="fit">
            <input id="message_cc" class="full">
          </div>
        </div>
        <div class="input">
          <label for="message_bcc">Bcc</label>
          <div class="fit">
            <input id="message_bcc" class="full">
          </div>
        </div>
        <div>
          <label>From</label>
          <a href class="bcc">Bcc</a>
          <a href class="cc">Cc</a>
          <DropDown class="from-address">
            <span>Mark Brown &lt;markbrown4@gmail.com&gt;</span>
            <i class="icon icon-down"></i>
            <ul class="align-right">
              <li><a href>Mark Brown &lt;markbrown4@gmail.com&gt;</a></li>
              <li><a href>Mark Brown &lt;mark@inspire9.com&gt;</a></li>
              <li><a href>Mark Brown &lt;mark@adioso.com&gt;</a></li>
            </ul>
          </DropDown>
        </div>
      </div>
    </div>
    <div class="section">
      <input id="message_subject" class="full" placeholder="Subject">
    </div>
    <div class="section">
      <textarea id="message_body" placeholder="Body"></textarea>
    </div>
    <div class="footer section">
      <input type="submit" class="btn primary-btn" value="Send" @click="send">
    </div>
  </div>
</template>

<script>
import eventBus from '../event_bus'
import DropDown from './dropdown'

export default {
  name: 'compose',
  components: {
    DropDown
  },
  data() {
    return { open: false }
  },
  methods: {
    close() {
      this.open = false
    },
    send() {
      this.close()
      this.$store.dispatch('flash', 'Sending...')
    }
  },
  created() {
    eventBus.$on('composeMessage', () => {
      this.open = true;
    })
  }
}
</script>

<style lang="scss" scoped>
.compose {
  background: #fff;
  box-shadow: 0 1px 2px rgba(#000, .2);
  position: fixed;
  bottom: 0;
  right: 10px;
  width: 510px;
}
.header {
  background: #404040;
  border-color: #404040;
}
.close {
  float: right;
  color: #b2b2b2;
  font: 16px/27px sans-serif;
  height: 28px;
  width: 28px;
  margin-top: -6px;
  margin-right: -6px;
  text-align: center;
  text-decoration: none;
  &:hover {
    color: #fff;
    background: #737373;
  }
}
h2 {
  font: inherit;
  color: #fff;
  margin: 0;
}
.section {
  border: 1px solid #CFCFCF;
  border-bottom: none;
  padding: 10px;
}
label {
  float: left;
  width: 40px;
}
.input {
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}
.cc, .bcc {
  float: right;
  margin-left: 5px;
}
.fit {
  overflow: hidden;
}
.from-address {
  display: inline-block;
  color: #777;
  &:hover {
    color: #222;
  }
}
.footer {
  overflow: hidden;
  background: #F5F5F5;
}
</style>
