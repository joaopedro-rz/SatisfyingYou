import {configureStore} from "@reduxjs/toolkit";
import pesquisaSlice from "./PesquisaSlice"
import loginSlice from "./LoginSlice";


export const Store = configureStore({
    reducer:{
        pesquisa: pesquisaSlice,
        login: loginSlice
    },
})
