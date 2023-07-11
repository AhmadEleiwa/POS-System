import React, { ChangeEvent, FC, useState } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import ProductRow from "../../Components/ProductRow";
import Button from "../../Components/Button";
import TextField from "../../Components/TextField";
import { Form, Formik } from "formik";
import SelectField from "../../Components/SelectFeild";
import ImagePicker from "../../Components/ImagePicker";
import { addProduct, removeProduct, updateProduct } from "../../store/Actions";
import { productShcema } from "../../schema";
import Select from "../../Components/Select";
import SearchField from "../../Components/SearchField";
import axios from "axios";
/**
 * ## Product Page
 * Product page the page that allow to handle the Product itself in the system.
 * By edit, delete or create new product. The product can take these values.
 * ```ts
 * type Product = {
 * productName: string,
 * productCode: string,
 * productCategory: Category,
 * productImage: string,
 * ProductPrice, double,
 * unitOfMeasure: UnitOfMeasure,
 * }
 * ```
 * Each Product can have one category and one unitOfMeasure.
 */
const ProductPage: FC = () => {
  const theme = useTheme();
  // selectedProduct select the product id
  const [selectedProduct, setSlectedProduct] = useState<string>("");
  const dispatch = useDispatch();
  // GET products from the redux store
  const products = useSelector<RootState>(
    (state) => state.productsReducer
  ) as Product[];
  // GET categories from the redux store
  const categories = useSelector<RootState>(
    (state) => state.categoriessReducer
  ) as Category[];
  // GET unit of measures from the redux store
  const unitOfMeasures = useSelector<RootState>(
    (state) => state.unitOfMeasureReducer
  ) as UnitOfMeasure[];
  const selectProductHandler = (id: string) => {
    setSlectedProduct(id);
  };
  // after selecting the product id we have to find the correct item
  let selectedItem = products.find((p) => p.id === selectedProduct) as Product;
  let submitAction: "add" | "update" | "delete" | undefined = undefined;
  const [searchValue, setSearcchValue] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    unitOfMeasure: "all",
  });

  // Search filters applied when the search value changed or the filtersValues changed
  let items: Product[] = [...products].filter(
    (p) =>
      (filters.category === "all"
        ? true
        : p.category.categoryName === filters.category) &&
      (filters.unitOfMeasure === "all"
        ? true
        : p.unitOfMeasure.unitOfMeasureName === filters.unitOfMeasure) &&
      (p.category.categoryName === searchValue ||
        p.title.startsWith(searchValue) ||
        (p.title + " " + p.unitOfMeasure).startsWith(searchValue) ||
        p.unitOfMeasure.unitOfMeasureName.startsWith(searchValue))
  );
  const searchHandler = (value: string) => {
    setSearcchValue(value);
  };
  const onChangeCategoryFilterHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters((p) => {
      return { ...p, category: event.target.value };
    });
  };
  const onSubmitHandler = (values: any) => {
    let formData = new FormData();
    formData.append("productName", values.title);
    formData.append("productCategory", values.category);
    formData.append("unitOfMeasure", values.unit);
    formData.append("productPrice", values.price);
    formData.append("image", values.image.img);

    if (submitAction === "add") {
      axios
        .post("http://localhost:5500/product/new", formData)
        .then((res) => {
          dispatch(
            addProduct({
              id: res.data.id,
              title: values.title,
              price:values.price,
              category: { categoryName: values.category } as Category,
              media: values.image.preview,
              unitOfMeasure: unitOfMeasures.find(
                (p) => p.unitOfMeasureName === values.unit
              ) as UnitOfMeasure,
            } as Product)
          );
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else if (submitAction === "update") {
      axios
        .post("http://localhost:5500/product/update/" + values.id, formData)
        .then((res) => {
          dispatch(
            updateProduct(values.id, {
              id: values.id,
              title: values.title,
              price:values.price,
              category: { categoryName: values.category } as Category,
              media: values.image.preview,
              unitOfMeasure: unitOfMeasures.find(
                (p) => p.unitOfMeasureName === values.unit
              ) as UnitOfMeasure,
            } as Product)
          );
        })
        .catch((err) => {
          alert(err.message);
        });
    } else if (submitAction === "delete") {
      axios
        .delete("http://localhost:5500/product/delete/" + values.id)
        .then((res) => {
          dispatch(removeProduct(values.id));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const onChangeUnitOfMeasureFilterHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters((p) => {
      return { ...p, unitOfMeasure: event.target.value };
    });
  };

  return (
    <div
      // container of the entire page excpt navbar
      className={style.container}
    >
      <div className={style.list}>
        <div className={style.filterControls}>
          <h1 style={{ color: theme.palette.textPrimary }}>EMMARKET</h1>
          <SearchField className={style.searchBar} onChange={searchHandler} />
          <Select
            onChange={onChangeCategoryFilterHandler}
            options={categories.map((cate) => {
              if (cate.categoryName)
                return { key: cate.categoryName, value: cate.categoryName };
              return { key: "", value: "" };
            })}
          />
          <Select
            onChange={onChangeUnitOfMeasureFilterHandler}
            options={unitOfMeasures.map((p) => {
              return { key: p.unitOfMeasureName, value: p.unitOfMeasureName };
            })}
          />
        </div>
        <div
          className={style.table}
          onClick={(e) => {
            e.stopPropagation();
            setSlectedProduct("");
          }}
        >
          {items.map((product) => (
            <ProductRow
              key={product.id}
              price={product.price}
              width="100%"
              onClick={(e) => {
                e.stopPropagation();
                selectProductHandler(product.id);
              }}
              title={product.title}
              media={product.media}
              unitOfMeasure={product.unitOfMeasure.unitOfMeasureName}
              category={product.category.categoryName}
            />
          ))}
        </div>
      </div>
      <div
        // the right side drawer witch have the main to handle the product functionalities
        className={style.info}
        style={{
          backgroundColor: theme.palette.paper,
          boxShadow: "0 2px 8px" + theme.palette.shadow,
        }}
      >
        <Formik
          onSubmit={onSubmitHandler}
          validationSchema={productShcema}
          enableReinitialize
          initialValues={{
            id: selectedItem?.id,
            title: selectedItem?.title,
            category: selectedItem
              ? selectedItem.category.categoryName
              : categories[0]
              ? categories[0].categoryName
              : "",
            unit: selectedItem
              ? selectedItem.unitOfMeasure.unitOfMeasureName
              : unitOfMeasures[0]
              ? unitOfMeasures[0].unitOfMeasureName
              : "",
            price: selectedItem? selectedItem.price : 0.99,
            image: { preview: selectedItem?.media, img: selectedItem?.media },
          }}
        >
          {({ handleSubmit }) => (
            <Form
              className={style.form}
              style={{ color: theme.palette.textPrimary }}
            >
              <h1>{selectedItem?.id ? "#" + selectedItem.id : "PRODUCT"}</h1>
              <ImagePicker name="image" />
              <TextField
                placeholder="Enter Product Name"
                width="100%"
                name="title"
              />
              <TextField
                placeholder="Enter Product Price"
                width="100%"
                type="number"
                name="price"
              />
              <SelectField
                width="100%"
                name="category"
                options={categories.map((p) => {
                  return { key: p.categoryName, value: p.categoryName };
                })}
              />
              <SelectField
                name="unit"
                width="100%"
                options={unitOfMeasures.map((p) => {
                  return {
                    key: p.unitOfMeasureName,
                    value: p.unitOfMeasureName,
                  };
                })}
              />
              <div className={style.controls}>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    submitAction = "add";
                    handleSubmit();
                  }}
                >
                  ADD
                </Button>
                {selectedProduct && (
                  <>
                    {" "}
                    <Button
                      fullWidth
                      onClick={() => {
                        submitAction = "update";
                        handleSubmit();
                      }}
                      variant="warning"
                    >
                      Update
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => {
                        submitAction = "delete";
                        handleSubmit();
                      }}
                      variant="error"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductPage;
