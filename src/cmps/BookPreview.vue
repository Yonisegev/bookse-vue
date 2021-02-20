<template>
  <div class="book-preview flex column align-center">
    <h1>{{ book.title }}</h1>
    <div class="book-img">
      <img @click="onSelectBook" :src="book.thumbnail" />
    </div>
    <h2>{{ book.listPrice.amount }}{{ currencySymbol }}</h2>
    <div class="book-actions flex">
      <Button label="Details" class="details-btn p-button-sm">
        <router-link :to="`/book/${book._id}`">Details</router-link>
      </Button>
      <Button
        label="Remove"
        class="remove-btn p-button-danger p-button-sm"
        @click="remove"
      />
    </div>
  </div>
</template>

<script>
import bookService from "@/services/bookService.js";
import Button from "primevue/button";
export default {
  props: {
    book: Object,
  },
  computed: {
    currencySymbol() {
      return bookService.getCurrencySymbol(this.book.listPrice.currencyCode);
    },
  },
  methods: {
    remove() {
      this.$emit("remove", this.book._id);
    },
    onSelectBook() {
      this.$router.push(`/book/${this.book._id}`);
    },
  },
  components: {
    Button,
  },
};
</script>