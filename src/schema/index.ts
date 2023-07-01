import * as yup from "yup";
import catgoires from "../Static/Categories.json";
import unitOfMeasures from "../Static/UnitOfMeasures.json";
import products from "../Static/Products.json";

let refs = catgoires.map((p) => p.categoryName);
export const schema = yup.object().shape({
  category: yup.string().notOneOf(refs, "The name is already taken"),
});
let ufms = unitOfMeasures.map((p) => p.unitOfMeasureName);
export const unitOfMeasureSchema = yup.object().shape({
  unitOfMeasureName: yup
    .string()
    .required("Name is required field")
    .notOneOf(ufms, "The name is already taken"),
  baseOfUnitOfMeasure: yup
    .string()
    .required("Base Unit of measure is required field"),
  CFB: yup.number().required("Conversion Factor base is required field"),
});

let prodsTitle = products.map((p) => p.title);
export const productShcema = yup.object().shape({
  title: yup.string().required("Title of product is required").min(4),
  category: yup.string().required("This Field is required"),
  price: yup.number().required("This Field is required"),
  unit: yup.string().required("This Field is required"),
});

export const testSchema = yup.object().shape({
  testField: yup.string().required("TEST ERROR"),
});
