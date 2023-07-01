let initialData = [
  {
    title: "burger",
    price: 2.33,
    id: "1",
    media: "https://picsum.photos/200/300",
    unitOfMeasure: {
      unitOfMeasureName: "0.5kg",
      baseUnitOfMeasure: "g",
      conversionFactor: 500,
    },
    category: { categoryName: "Meat" },
  },
  {
    title: "Coco cola",
    price: 1,
    id: "2",
    media: "https://picsum.photos/200/301",
    unitOfMeasure: {
      unitOfMeasureName: "330ml",
      baseUnitOfMeasure: "l",
      conversionFactor: 0.33,
    },
    category: { categoryName: "Drink" },
  },
  {
    title: "Coco cola",
    price: 1,
    id: "3",
    media: "https://picsum.photos/200/302",
    unitOfMeasure: {
      unitOfMeasureName: "1.5l",
      baseUnitOfMeasure: "l",
      conversionFactor: 1.5,
    },
    category: { categoryName: "Drink" },
  },
];
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
