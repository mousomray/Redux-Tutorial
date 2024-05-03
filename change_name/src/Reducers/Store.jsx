import { configureStore } from '@reduxjs/toolkit';

import useReducer from './useReducer';
export const Store = configureStore({
    reducer: useReducer,

})
