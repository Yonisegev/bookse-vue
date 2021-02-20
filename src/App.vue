<template>
  <section class="app">
    <user-msg :msg="userMsg" v-show="userMsg" />
    <app-header v-if="!homepagePath" />
    <router-view />
  </section>
</template>

<script>
import AppHeader from "@/cmps/AppHeader";
import UserMsg from "@/cmps/UserMsg";
export default {
  components: {
    AppHeader,
    UserMsg,
  },
  computed: {
    homepagePath() {
      return this.$route.path === "/";
    },
    userMsg() {
      return this.$store.getters.userMsg;
    },
  },
};
</script>