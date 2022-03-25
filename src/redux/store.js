import { configureStore } from '@reduxjs/toolkit'
import cart from './cart'
import user from './user'

export default configureStore({
  reducer: {
      cart: cart,
      user: user,
  },
})