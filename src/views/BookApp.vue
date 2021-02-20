<template>
  <section class="book-app">
    <book-filter @filtered="setFilter"></book-filter>
    <book-add @add="loadBooks"></book-add>
    <book-list :books="booksToShow" @remove="remove"></book-list>
  </section>
</template>

<script>
import bookService from "@/services/bookService.js";
import BookFilter from "@/cmps/BookFilter";
import BookList from "@/cmps/BookList";
import BookAdd from "@/cmps/BookAdd";
export default {
  data() {
    return {
      filterBy: null,
    };
  },
  async created() {
    this.loadBooks();
  },
  computed: {
    booksToShow() {
      return this.$store.getters.booksToShow;
    },
  },
  methods: {
    async loadBooks() {
      await this.$store.dispatch({ type: "loadBooks" });
    },
    async remove(bookId) {
      await bookService.remove(bookId);
      this.$store.dispatch({
        type: "setMsg",
        msg: {
          type: "success",
          str: `Book removed succesfully`,
        },
      });
      this.loadBooks();
    },
    setFilter(filterBy) {
      if (!filterBy.toPrice) filterBy.toPrice = 500;
      this.$store.commit({ type: "SET_FILTER", filterBy });
    },
  },
  components: {
    BookFilter,
    BookList,
    BookAdd,
  },
};
</script>