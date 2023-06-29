let initialData:Category[] = [
   {categoryName:'Drink'},
   {categoryName:'Meat'},
   {categoryName:'Snack'},

  ];
  const categoriessReducer = (state: Category[] = initialData, action: Action) => {
    switch (action.type) {
      case "ADD":
        return [...state, {categoryName: action.data}];
      case "UPDATE":{
        let dd =state.find(p => p.categoryName === action.data.name) 
        dd!.categoryName = action.data.newName
        return [...state]
      }
      case "REMOVE":return state.filter(p => p.categoryName!== action.data)
      default:
        return state;
    }
  };
  
  export default categoriessReducer;
  