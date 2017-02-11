<template>
  <div class="compose" v-if="active" @click.stop>
    <div class="header section">
      <a class="close" @click="close">×</a>
      <h2>New Message</h2>
    </div>
    <div class="section">
      <div v-if="activeSection != 'to'">
        <input class="full" v-model="message.to" placeholder="Recipients" @focus="focusOnSection('to')">
      </div>
      <div v-if="activeSection == 'to'">
        <div class="input">
          <label for="message_to">To</label>
          <div class="fit">
            <input v-model="message.to" class="full" v-focus>
          </div>
        </div>
        <div class="input" v-if="ccActive">
          <label for="message_cc">Cc</label>
          <div class="fit">
            <input v-model="message.cc" class="full" v-focus>
          </div>
        </div>
        <div class="input" v-if="bccActive">
          <label for="message_bcc">Bcc</label>
          <div class="fit">
            <input v-model="message.bcc" class="full" v-focus>
          </div>
        </div>
        <div>
          <label>From</label>
          <a class="bcc" @click="bccActive = true" v-if="!bccActive">Bcc</a>
          <a class="cc" @click="ccActive = true" v-if="!ccActive">Cc</a>
          <DropDown class="from-address">
            <span>{{ message.from | nameAndEmail }}</span>
            <Icon name="down" />
            <ul class="align-right">
              <li v-for="account in currentUser.accounts">
                <a @click="message.from = account">{{ account | nameAndEmail }}</a>
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
    </div>
    <div class="section">
      <input class="full" placeholder="Subject" @focus="focusOnSection('subject')">
    </div>
    <div class="section">
      <textarea placeholder="Body" @focus="focusOnSection('body')"></textarea>
    </div>
    <div class="footer section">
      <input type="submit" class="btn primary-btn" value="Send" @click="send">
    </div>
  </div>
</template>

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

<script>
import eventBus from '../event_bus'
import DropDown from './dropdown'
import Icon from './icon'

const getInitialMessage = () => ({
  to: '',
  cc: '',
  bcc: '',
  body: '',
  from: window.currentUser
})

export default {
  name: 'compose',
  components: {
    DropDown,
    Icon
  },
  data() {
    return {
      currentUser: window.currentUser,
      message: getInitialMessage(),
      active: false,
      activeSection: 'to',
      ccActive: false,
      bccActive: false
    }
  },
  methods: {
    open() {
      this.active = true
    },
    close() {
      this.active = false
    },
    send() {
      this.close()
      this.message = getInitialMessage()
      this.$store.dispatch('flash', 'Sending...')
    },
    focusOnSection(section) {
      this.activeSection = section
      this.ccActive = this.message.cc !== ''
      this.bccActive = this.message.bcc !== ''
    }
  },
  created() {
    eventBus.$on('BODY_CLICK', this.close)
    eventBus.$on('KEYUP_ESCAPE', this.close)
    eventBus.$on('COMPOSE_OPEN', this.open)
  }
}
</script>
