export const addProduct = (product:Product) => {
  return {
    type: "ADD_PRODUCT",
    data:product
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
