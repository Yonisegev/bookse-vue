<template>
  <section class="about flex column align-center">
    <h1>Meet the team</h1>
    <h3>Yehonathan Segev</h3>
    <img :src="memberPhoto" alt="" />
    <p>
      Full stack developer with a passion to tackling challenges and a knack for
      creating attractive user interfaces. Experienced in writing single page
      applications using the latest frontend frameworks and backend
      technologies.
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      intervalId: 0,
    };
  },
  computed: {
    memberPhoto() {
      return require("../assets/img/Yoni.jpg");
    },
  },
  created() {
    this.intervalId = setInterval(() => {
      console.log("Check out my GitHub @ https://github.com/Yonisegev");
    }, 2000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
};
</script>