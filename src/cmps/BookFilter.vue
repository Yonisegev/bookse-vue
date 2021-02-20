<template>
  <section class="book-filter flex column align-center">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="filterBy.name"
        @input="filtered"
        placeholder="Filter by name"
      />
    </span>
    <small>Min Price</small>
    <InputText v-model.number="filterBy.fromPrice" />
    <Slider v-model="filterBy.fromPrice" @input="filtered" />

    <small>Max Price</small>
    <InputText v-model.number="filterBy.toPrice" />
    <Slider v-model="filterBy.toPrice" @input="filtered" />
  </section>
</template>

<script>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Slider from "primevue/slider";
export default {
  data() {
    return {
      filterBy: {
        name: "",
        fromPrice: 1,
        toPrice: 500,
      },
    };
  },
  methods: {
    filtered() {
      this.$emit("filtered", { ...this.filterBy });
    },
  },
  components: {
    InputText,
    InputNumber,
    Slider,
  },
};
</script>
