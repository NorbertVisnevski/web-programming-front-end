import { configureStore } from '@reduxjs/toolkit'
import cart from './cart'
import info from './info'
import user from './user'

export default configureStore({
  reducer: {
      cart: cart,
      user: user,
      info: info,
  },
})