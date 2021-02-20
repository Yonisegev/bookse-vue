import bookService from '@/services/bookService.js'
export default {
  state: {
    books: null,
    filterBy: null,
  },
  getters: {
    booksToShow(state) {
      const { books } = state
      if (!state.filterBy) return books
      const regex = new RegExp(state.filterBy.name, 'i')
      const booksToShow = books.filter(book => {
        return (
          regex.test(book.title) &&
          book.listPrice.amount >= state.filterBy.fromPrice &&
          book.listPrice.amount <= state.filterBy.toPrice
        )
      })
      return booksToShow
    },
  },
  mutations: {
    SET_BOOKS(state, payload) {
      state.books = payload.books
    },
    SET_FILTER(state, { filterBy }) {
      state.filterBy = filterBy
    },
    SAVE_BOOK(state, { book }) {
      state.books.unshift(book)
    },
  },
  actions: {
    async loadBooks(context) {
      console.log('in store load')
      const books = await bookService.query()
      context.commit({ type: 'SET_BOOKS', books })
    },
    async saveGoogleBook({ commit }, { book }) {
      const savedBook = await bookService.addGoogleBook(book)
      commit({ type: 'SAVE_BOOK', book: savedBook })
    },
  },
}
