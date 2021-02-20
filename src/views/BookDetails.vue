<template>
  <section class="book-details main-container">
    <main v-if="book" class="details-main flex column">
      <div class="book-info flex">
        <div class="main-info flex column align-center">
          <h3>{{ book.title }}</h3>
          <p>{{ authors }}</p>
          <img class="book-img" :src="book.thumbnail" />
        </div>
        <div class="more-info flex column justify-center">
          <h3>About this book</h3>
          <long-txt :txt="book.description" />
          <p>{{ pageCountTxt }}</p>

          <div class="category-list flex">
            <span v-for="(category, idx) in book.categories" :key="idx">
              <Chip :label="`#${category}`" />
            </span>
          </div>
          <p v-if="publishedDateTxt">- {{ publishedDateTxt }}</p>
          <div v-if="book.listPrice.isOnSale" class="sale-img">
            <img src="@/assets/img/sale.svg" />
          </div>
          <p :class="priceClass">
            {{ book.listPrice.amount }}{{ currencySymbol }}
          </p>
        </div>
      </div>
      <section class="book-reviews flex column align-center">
        <h3 class="reviews-heading">
          Book Reviews <i @click="openModal" class="pi pi-plus-circle"></i>
        </h3>
        <section v-if="isModalOpen" class="review-add">
          <review-add @addReview="loadBook" @close="closeModal" />
        </section>
        <div v-if="book.reviews.length">
          <div
            v-for="review in bookReviews"
            :key="review._id"
            class="review-wrapper"
          >
            <article class="review">
              <span
                @click="removeReview(review._id)"
                class="pi pi-trash"
              ></span>
              <h3>By {{ review.fullname }}</h3>
              <small>{{ review.readAt }}</small>
              <p>{{ "⭐".repeat(review.rating) }}</p>
              <h5>{{ review.txt }}</h5>
            </article>
          </div>
        </div>
        <div v-else>
          <h1 class="no-review-heading">
            No reviews yet, add yours
            <span @click="openModal">now</span>.
          </h1>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import bookService from "@/services/bookService.js";
import LongTxt from "@/cmps/LongTxt";
import ReviewAdd from "@/cmps/ReviewAdd";
import Chip from "primevue/chip";

export default {
  data() {
    return {
      book: null,
      isModalOpen: false,
    };
  },
  methods: {
    async loadBook() {
      const { id } = this.$route.params;
      this.book = await bookService.get(id);
    },
    async removeReview(reviewId) {
      await bookService.removeReview(this.book._id, reviewId);
      this.loadBook();
      this.$store.dispatch({
        type: "setMsg",
        msg: {
          type: "success",
          str: "Review deleted succesfully",
        },
      });
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  async created() {
    this.loadBook();
  },
  computed: {
    pageCountTxt() {
      if (this.book.pageCount > 500) return "Long Reading";
      else if (this.book.pageCount > 200) return "Decent Reading";
      else if (this.book.pageCount < 100) return "Light Reading";
    },
    publishedDateTxt() {
      let currYear = new Date().getFullYear();
      let year = "";
      if (currYear - this.book.publishedDate < 1) year = "New!";
      else if (currYear - this.book.publishedDate > 10) year = "Veteran Book";
      return year;
    },
    currencySymbol() {
      return bookService.getCurrencySymbol(this.book.listPrice.currencyCode);
    },
    authors() {
      return this.book.authors[1]
        ? `${this.book.authors.join(",")}`
        : `${this.book.authors.join(",")}`;
    },
    priceClass() {
      if (this.book.listPrice.amount > 150) return "red";
      else if (this.book.listPrice.amount < 20) return "green";
    },
    bookReviews() {
      return this.book.reviews;
    },
  },
  components: {
    LongTxt,
    ReviewAdd,
    Chip,
  },
};
</script>