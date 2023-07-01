import initialData from '../../Static/Products.json'
const productsReducer = (state: Product[] = initialData, action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.data];
    case "UPDATE_PRODUCT": {
      let dd = state.map((p) => {
        if(p.id === action.data.id)
          return {...p, ...action.data.newProduct}
        return p
      });
  
      return [...dd];
    }
    case "REMOVE_PRODUCT":
      return state.filter((p) => p.id !== action.data);
    default:
      return state;
  }
};

export default productsReducer;
