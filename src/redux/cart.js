import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.find(element=>element.product.id === action.payload.id);
      if(index === undefined)
      {
        state.cart.push({count:1,product:{...action.payload}});
        state.total += action.payload.price
        return;
      }
      if(index.count < action.payload.stock)
      {
        state.total += action.payload.price
        index.count += 1;
      }
    },
    subtractFromCart: (state, action) => {
      const index = state.cart.find(element=>element.product.id === action.payload.id);
      if(index !== undefined)
      {
        state.total -= action.payload.price
        index.count--;
        if(index.count === 0)
        {
          state.cart = state.cart.filter(element=>element !== index) 
        }
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload.toFixed(2);
    },
    clearCart: (state, action) => {
      state.total = 0;
      state.cart = [];
    },
  },
})

export const { addToCart, subtractFromCart, setTotal, clearCart } = cartSlice.actions

export const selectCart = (state) => state.cart.cart;
export const selectTotal = (state) => state.cart.total;

export default cartSlice.reducer