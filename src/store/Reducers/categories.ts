const categoriessReducer = (state: Category[] = [], action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return action.data;
    case "ADD_CATEGORY":
      return [...state, { categoryName: action.data }];
    case "UPDATE_CATEGORY": {
      return state.map((p) => {
        if (p.categoryName === action.data.name)
          return { categoryName: action.data.newName };
        return p;
      });
    }
    case "REMOVE_CATEGORY":
      return state.filter((p) => p.categoryName !== action.data);
    default:
      return state;
  }
};

export default categoriessReducer;
