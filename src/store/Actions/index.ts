import { Dispatch } from "redux"

export const chooseCart = (cartId:string) =>{
  return {
    type:"CHOOSE_CART",
    data:cartId
  }
}
//////////////////////////////

export const updateCartProduct = (cartId:string, productId:string, payload:any) =>{
  return {
    type:'UPDATE_CART_PRODUCT',
    data:{cartId,productId,payload}
  }
}
export const  deleteCartProduct = (cartId:string, productId:string) =>{
  return {
    type:"DELETE_CART_PRODUCT",
    data:{cartId, productId}
  }
}
export const createCart = (id:string) => {
  return {
    type: "CREATE_CART",
    data: {
      cartId: id,
      products: [],
      description: "",
      tax: 0,
      discount: 0,
    } as Cart,
  };
};
export const updateCart = (cartId: string, payload:any) => {
  return {
    type: "UPDATE_CART",
    data: { cartId, payload },
  };
};
export const addProductToCart = (cartId: string, product: Product) => {
  return {
    type: "ADD_TO_CART",
    data: { cartId, product },
  };
};

export const checkCart = (cartId: string) => {
  return {
    type: "CHECK_CART",
    data: cartId,
  };
};
////////////////////////////////////////
export const addProduct = (product: Product) => {
  return {
    type: "ADD_PRODUCT",
    data: product,
  };
};
export const removeProduct = (id: string) => {
  return {
    type: "REMOVE_PRODUCT",
    data: id,
  };
};
export const updateProduct = (id: string, newProduct: Product) => {
  return {
    type: "UPDATE_PRODUCT",
    data: { id, newProduct },
  };
};
////////////////////////////////////////

export const addCategory = (name: string) => {
  return {
    type: "ADD_CATEGORY",
    data: name,
  };
};

export const updateCategory = (name: string, newName: string) => {
  return {
    type: "UPDATE_CATEGORY",
    data: { name: name, newName: newName },
  };
};
export const removeCategory = (name: string) => {
  return {
    type: "REMOVE_CATEGORY",
    data: name,
  };
};
////////////////////////////////////////

export const addUnit = (unit: UnitOfMeasure) => {
  return {
    type: "ADD_UNIT",
    data: unit,
  };
};

export const updateUnit = (name: string, newUnit: UnitOfMeasure) => {
  return {
    type: "UPDATE_UNIT",
    data: { name: name, newUnit: newUnit },
  };
};
export const removeUnit = (name: string) => {
  return {
    type: "REMOVE_UNIT",
    data: name,
  };
};
