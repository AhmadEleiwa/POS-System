import carts from "../../Static/Carts.json";

const selectedCartReducer = (state: string ="", action: Action) => {
  switch (action.type) {
    case "CHOOSE_CART":
      return action.data;
    default:
      return state;
  }
};

export default selectedCartReducer;
