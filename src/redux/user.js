import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined,
    token: undefined
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
        state.token = action.payload
    },
    logOut: (state, action) => {
        state.token = undefined
        state.user = undefined
        action.payload()
    },
    
  },
})

export const { setUser, setToken, logOut } = userSlice.actions

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer