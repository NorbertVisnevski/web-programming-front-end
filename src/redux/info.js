import { createSlice } from '@reduxjs/toolkit'

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    message: "" 
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const { setMessage } = infoSlice.actions

export const selectMessage = (state) => state.info.message;

export default infoSlice.reducer