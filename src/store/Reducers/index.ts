import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from './products'

const rootReducer = combineReducers({
    productsReducer:productsReducer,

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer