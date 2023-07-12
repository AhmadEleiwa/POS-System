import * as yup from "yup";

export const schema = yup.object().shape({
  category: yup.string(),
});
export const unitOfMeasureSchema = yup.object().shape({
  unitOfMeasureName: yup.string().required("Name is required field"),
  baseOfUnitOfMeasure: yup
    .string()
    .required("Base Unit of measure is required field"),
  CFB: yup.number().required("Conversion Factor base is required field"),
});

export const unitOfMeasureUpdateSchema = yup.object().shape({
  unitOfMeasureName: yup.string().required("Name is required field"),
  baseOfUnitOfMeasure: yup
    .string()
    .required("Base Unit of measure is required field"),
  CFB: yup.number().required("Conversion Factor base is required field"),
});

export const productShcema = yup.object().shape({
  title: yup.string().required("Title of product is required").min(4),
  category: yup.string().required("This Field is required"),
  price: yup.number().required("This Field is required"),
  unit: yup.string().required("This Field is required"),
});

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 charactors")
    .required("Username is requied")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(/[A-z]/, "The username must be an charactor"),
  password: yup
    .string()
    .min(8, "password must be at least 8 charactors")
    .required("password is requied")
    .matches(/^\S*$/, "Whitespace is not allowed"),
});

export const testSchema = yup.object().shape({
  testField: yup.string().required("TEST ERROR"),
});
