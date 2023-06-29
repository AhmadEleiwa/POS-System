import Categoris from '../../Static/Categories.json'

  const categoriessReducer = (state: Category[] = Categoris, action: Action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
        return [...state, {categoryName: action.data}];
      case "UPDATE_CATEGORY":{
        let dd =state.find(p => p.categoryName === action.data.name) 
        dd!.categoryName = action.data.newName
        return [...state]
      }
      case "REMOVE_CATEGORY":return state.filter(p => p.categoryName!== action.data)
      default:
        return state;
    }
  };

  
  export default categoriessReducer;
  