<template>
  <div v-if="txt" class="txt-container">
    <div class="flex justify-center">
      <p>{{ bookDesc }}</p>
    </div>
    <Button
      @click="toggleDescription"
      class="p-button-sm p-button-text"
      :class="btnClass"
    />
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  props: {
    txt: String,
  },
  data() {
    return {
      isLongTxtShown: false,
    };
  },
  methods: {
    toggleDescription() {
      this.isLongTxtShown = !this.isLongTxtShown;
    },
  },
  computed: {
    bookDesc() {
      let desc = "";
      if (this.isLongTxtShown) desc = this.txt;
      else desc = this.txt.substring(0, 50) + "...";
      return desc;
    },
    btnClass() {
      return this.isLongTxtShown
        ? "pi pi-angle-double-up"
        : "pi pi-angle-double-down";
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss">
.txt-container {
  width: 100%;

  button {
    width: 100%;
    box-shadow: none !important;
  }
}
</style>