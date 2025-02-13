import {createSlice} from '@reduxjs/toolkit';

const initialState = { id: null };

const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState,
  reducers: {
    setPesquisa: (state, action) => {
      state.id = action.payload;
    },
    resetPesquisa: () => initialState, 
  },
});

export const { setPesquisa } = pesquisaSlice.actions;
export default pesquisaSlice.reducer;

