<template>
  <div id="compose" style="display: none">
    <div class="header">
      <a class="close">×</a>
      <h2>New Message</h2>
    </div>
    <div>
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
    <div>
      <input id="message_subject" class="full" placeholder="Subject">
    </div>
    <div>
      <textarea id="message_body" placeholder="Body"></textarea>
    </div>
    <div class="footer">
      <input type="submit" class="btn primary-btn" value="Send">
    </div>
  </div>
</template>

<script>
import DropDown from './dropdown'

export default {
  name: 'compose',
  components: {
    DropDown
  }
}
</script>
