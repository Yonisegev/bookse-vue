<template>
  <ul class="book-list flex justify-center">
    <book-preview
      v-for="book in books"
      :book="book"
      :key="book._id"
      @remove="remove"
    ></book-preview>
  </ul>
</template>

<script>
import BookPreview from "@/cmps/BookPreview";
export default {
  props: {
    books: Array,
  },
  methods: {
    remove(bookId) {
      this.$emit("remove", bookId);
    },
  },
  components: {
    BookPreview,
  },
};
</script>