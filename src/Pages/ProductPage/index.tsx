import React, { ChangeEvent, FC, useEffect, useState } from "react";
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
import {
  addProduct,
  removeProduct,
  set_categories,
  set_products,
  set_units,
  updateProduct,
} from "../../store/Actions";
import { productShcema } from "../../schema";
import Select from "../../Components/Select";
import SearchField from "../../Components/SearchField";
import useSnackbar from "../../context/Snackbar/useSnackbar";
import { productApi } from "../../services/productApi";
import { categoryApi } from "../../services/categoryApi";
import { unitApi } from "../../services/unitApi";

const ProductPage: FC = () => {
  const snack = useSnackbar();
  const theme = useTheme();
  const [selectedProduct, setSlectedProduct] = useState<string>("");
  const dispatch = useDispatch();

  const products = useSelector<RootState>(
    (state) => state.productsReducer
  ) as Product[];
  const categories = useSelector<RootState>(
    (state) => state.categoriessReducer
  ) as Category[];
  const unitOfMeasures = useSelector<RootState>(
    (state) => state.unitOfMeasureReducer
  ) as UnitOfMeasure[];

  const selectProductHandler = (id: string) => {
    setSlectedProduct(id);
  };

  let selectedItem = products.find((p) => p.id === selectedProduct);
  let submitAction: "add" | "update" | "delete" | undefined = undefined;
  const [searchValue, setSearcchValue] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    unitOfMeasure: "all",
  });

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

  useEffect(() => {
    categoryApi
      .getAll()
      .then((data) => dispatch(set_categories(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch categories");
      });
    productApi
      .getAll()
      .then((data) => dispatch(set_products(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch products");
      });
    unitApi
      .getAll()
      .then((data) => dispatch(set_units(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch units");
      });
  }, [dispatch]);

  const onSubmitHandler = (values: any) => {
    let formData = new FormData();
    formData.append("productName", values.title);
    formData.append("productCategory", values.category);
    formData.append("unitOfMeasure", values.unit);
    formData.append("productPrice", values.price);
    formData.append("image", values.image.img);

    if (submitAction === "add") {
      productApi
        .create(formData)
        .then((res) => {
          snack.onResponse({
            message: "Product " + res.id + " have been Created",
            status: 200,
          });
          dispatch(
            addProduct({
              id: res.id,
              title: values.title,
              price: values.price,
              category: { categoryName: values.category } as Category,
              media: values.image.preview,
              unitOfMeasure: unitOfMeasures.find(
                (p) => p.unitOfMeasureName === values.unit
              ) as UnitOfMeasure,
            } as Product)
          );
        })
        .catch((err) => {
          snack.onResponse({
            message: err.response?.data?.message || "Error creating product",
            status: err.response?.status || 500,
          });
        });
    } else if (submitAction === "update") {
      productApi
        .update(values.id, formData)
        .then((res) => {
          snack.onResponse({
            message: res.message,
            status: 200,
          });
          dispatch(
            updateProduct(values.id, {
              id: values.id,
              title: values.title,
              price: values.price,
              category: { categoryName: values.category } as Category,
              media: values.image.preview,
              unitOfMeasure: unitOfMeasures.find(
                (p) => p.unitOfMeasureName === values.unit
              ) as UnitOfMeasure,
            } as Product)
          );
        })
        .catch((err) => {
          snack.onResponse({
            message: err.response?.data?.message || "Error updating product",
            status: err.response?.status || 500,
          });
        });
    } else if (submitAction === "delete") {
      productApi
        .delete(values.id)
        .then((res) => {
          snack.onResponse({
            message: res.message,
            status: 200,
          });
          dispatch(removeProduct(values.id));
        })
        .catch((err) => {
          snack.onResponse({
            message: err.response?.data?.message || "Error deleting product",
            status: err.response?.status || 500,
          });
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
    <div className={style.container}>
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
            price: selectedItem ? selectedItem.price : 0.99,
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