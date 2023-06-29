import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from './products'
import categoriessReducer from './categories'


const rootReducer = combineReducers({
    productsReducer:productsReducer,
    categoriessReducer:categoriessReducer,

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer