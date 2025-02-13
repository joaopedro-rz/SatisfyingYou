import {createSlice} from '@reduxjs/toolkit';

const initialState = { email: null };

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.email = action.payload;
    },
    resetLogin: () => initialState, 
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;