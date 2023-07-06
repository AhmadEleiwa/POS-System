import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from './products'
import categoriessReducer from './categories'
import unitOfMeasureReducer from './unitOfMeasure'
import cartsReducer from './cart'
import selectedCartReducer  from './selectedCart'


const rootReducer = combineReducers({
    productsReducer:productsReducer,
    categoriessReducer:categoriessReducer,
    unitOfMeasureReducer:unitOfMeasureReducer,
    cartsReducer:cartsReducer,
    selectedCartReducer:selectedCartReducer

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer