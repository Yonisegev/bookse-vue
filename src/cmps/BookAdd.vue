<template>
  <section class="book-add flex column align-center justify-center">
    <span class="p-input-icon-left">
      <i class="pi pi-plus" />
      <InputText
        @input="debounceFunc"
        v-model="searchTerm"
        type="text"
        placeholder="Add book"
      />
    </span>
    <ul v-show="googleBooks.length" class="google-books">
      <li
        @click="onAddBook(book)"
        v-for="book in googleBooks"
        :key="book.etag"
        class="gbook-list-item"
      >
        {{ book.volumeInfo.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import InputText from "primevue/inputtext";
import bookService from "@/services/bookService.js";
import { debounce as _debounce } from "lodash";

export default {
  data() {
    return {
      searchTerm: "",
      googleBooks: [],
    };
  },
  methods: {
    async fetchGoogleBooks() {
      const results = await bookService.fetchGoogleBooks(this.searchTerm);
      this.googleBooks = results;
    },
    debounceFunc() {
      const delayedFunc = _debounce(this.fetchGoogleBooks, 500);
      delayedFunc();
    },
    async onAddBook(book) {
      await this.$store.dispatch({ type: "saveGoogleBook", book });
      this.$store.dispatch({
        type: "setMsg",
        msg: {
          type: "success",
          str: `${book.volumeInfo.title} added succesfully`,
        },
      });
    },
  },
  components: {
    InputText,
  },
};
</script>