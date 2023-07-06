import carts from "../../Static/Carts.json";

const cartsReducer = (state: Cart[] = carts, action: Action) => {
  switch (action.type) {
    case "CREATE_CART":
      return [...state, action.data];
    case "ADD_TO_CART": {
      return state.map(c => {
        if(c.cartId ===  action.data.cartId){
          let isFound = c.products.find(p => p.id === action.data.product.id)
          if(isFound){
            return {...c , products:c.products.map(p =>{
              if(p.id === isFound?.id){
                return {...p, qty:p.qty+1}
              }
              return p
            })}
          }else{
            c ={...c, products:[...c.products, {...action.data.product,qty:1}]}
          }
          
        }
        return c
      });
    }
    case "UPDATE_CART_PRODUCT": {
      let cart = state.find((p) => p.cartId === action.data.cartId) as Cart;
      let x = cart.products.map((p) => {
        if (action.data.productId === p.id) {
          return { ...p, ...action.data.payload};
        }
        return p;
      });
      let newCarts = state.map((c) => {
        if (action.data.cartId === c.cartId) {
          return { ...c, products: x };
        }
        return c;
      }); 
      return newCarts;
    }
    case "DELETE_CART_PRODUCT": {
      let cart = state.find((p) => p.cartId === action.data.cartId) as Cart;
      let x = cart.products.filter((p) => p.id !== action.data.productId);
      let newCarts = state.map((c) => {
        if (action.data.cartId === c.cartId) {
          return { ...c, products: x };
        }
        return c;
      }); 
      return newCarts;
    }
    case "UPDATE_CART": {
      return state.map(c => {
        if(c.cartId === action.data.cartId){
          return {...c,  ...action.data.payload}
        }
        return c
      });
    }
    case "CHECK_CART":
      return state.filter((p) => p.cartId !== action.data);
    default:
      return state;
  }
};

export default cartsReducer;
