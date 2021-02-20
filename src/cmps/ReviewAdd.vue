<template>
  <section class="review-add flex justify-center">
    <Dialog
      header="Your Review"
      :visible.sync="isModalOpen"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form @submit.prevent="saveReview" class="flex column align-center">
        <inputText
          placeholder="Fullname"
          type="text"
          v-model="review.fullname"
          required
        />
        <Rating v-model="review.rating" :cancel="false" />
        <input
          title="Read at"
          type="date"
          name="date"
          v-model="review.readAt"
          placeholder="Read at"
          required
        />
        <Textarea
          v-model="review.txt"
          placeholder="Your review..."
          :autoResize="true"
          rows="3"
          cols="20"
          required
          spellcheck="false"
          autocomplete="false"
        />
        <div class="form-actions">
          <Button
            type="button"
            label="Close"
            icon="pi pi-times"
            @click="closeModal"
            class="p-button-text close"
          />
          <Button
            type="submit"
            label="Save"
            icon="pi pi-check"
            class="save"
            autofocus
          />
        </div>
      </form>
    </Dialog>
  </section>
</template>

<script>
import moment from "moment";
import bookService from "@/services/bookService.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Rating from "primevue/rating";
import Textarea from "primevue/textarea";
export default {
  data() {
    return {
      review: {
        fullname: "",
        rating: 5,
        readAt: this.currDate(),
        txt: "",
      },
      isModalOpen: true,
    };
  },
  methods: {
    currDate() {
      return moment(Date.now()).format("YYYY-MM-DD");
    },
    async saveReview() {
      await bookService.addReview(this.bookId, this.review);
      const emptyReview = bookService.getEmptyReview();
      emptyReview.readAt = this.currDate();
      this.review = emptyReview;
      this.$emit("addReview");
      this.$store.dispatch({
        type: "setMsg",
        msg: {
          type: "success",
          str: "Review added succesfully",
        },
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
  computed: {
    bookId() {
      return this.$route.params.id;
    },
  },
  components: {
    Dialog,
    Button,
    InputText,
    Rating,
    Textarea,
  },
};
</script>

<style lang="scss">
.p-dialog-mask {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.p-dialog-header-icons {
  display: none !important;
}

.p-rating-icon {
  box-shadow: none !important;
  color: gold !important;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    margin-bottom: 0 !important;
    box-shadow: none !important;
  }
}
</style>