<template>
  <div class="user-msg" v-if="msg">
    <Message :severity="msg.type" :closable="false">{{ msg.str }}</Message>
  </div>
</template>

<script>
import Message from "primevue/message";
export default {
  props: {
    msg: Object,
  },
  components: {
    Message,
  },
};
</script>