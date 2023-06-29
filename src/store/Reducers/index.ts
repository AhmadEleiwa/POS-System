import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from './products'
import categoriessReducer from './categories'
import unitOfMeasureReducer from './unitOfMeasure'


const rootReducer = combineReducers({
    productsReducer:productsReducer,
    categoriessReducer:categoriessReducer,
    unitOfMeasureReducer:unitOfMeasureReducer

})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer