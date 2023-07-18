import React, { FC, useEffect, useState } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../../context/Theme/useTheme";
import { RootState } from "../../store/Reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import SelectField from "../../Components/SelectFeild";
import {
  schema,
  unitOfMeasureSchema,
  unitOfMeasureUpdateSchema,
} from "../../schema";
import { addUnit, removeUnit, set_units, updateUnit } from "../../store/Actions";
import SearchField from "../../Components/SearchField";
import Row from "./components/Row";
import axios from "axios";
import useSnackbar from "../../context/Snackbar/useSnackbar";
/**
 * ## Unit OF Measure
 * Unit of Measure the page that allow the use to manage the system units.
 * ```ts
 * type UnitOfMeasure = {
 * unitOfMeasureName: string,
 * baseUnitOfMeasure: string,
 * CFB: double,
 * }
 * ```
 * ### CFB
 * CFB or Conversion factor to the base unit of measure is the value of change from wieght to another in unit of measure (min to hour need 60 , 60 is the CFB)
 */
const UnitOfMeasurePage: FC = () => {
  const [status, setStatus] = useState<string>("add");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const ufms = useSelector<RootState>(
    (state) => state.unitOfMeasureReducer
  ) as UnitOfMeasure[];
  const [searchValue, setSearcchValue] = useState<string>("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const { onResponse } = useSnackbar();

  const onChangeHandler = (value: string) => {
    setSearcchValue(value);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5500/unit/units")
      .then((res) => dispatch(set_units(res.data)))
      .catch((err) => {
        alert(err.response.message);
      });
  }, [dispatch]);
  let items = [...ufms];

  items = items.filter((p) => p.unitOfMeasureName.startsWith(searchValue));
  let selectedItem = items.find((p) => p.unitOfMeasureName === selectedUnit);
  return (
    <div className={style.container}>
      <div
        className={style.cate}
        style={{
          backgroundColor: theme.palette.paper,
          boxShadow: "0 2px 8px" + theme.palette.shadow,
        }}
      >
        <div className={style.switcher}>
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faAdd}
            onClick={() => setStatus("add")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faEdit}
            onClick={() => setStatus("update")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faTrashCan}
            onClick={() => setStatus("delete")}
          />
        </div>
        {status === "add" && (
          <Formik
            onSubmit={(values) => {
              axios
                .post("http://localhost:5500/unit/new", {
                  unitOfMeasureName: values.unitOfMeasureName,
                  baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                  conversionFactor: values.CFB,
                })
                .then((res) => {
                  onResponse({
                    message: res.data.message,
                    status: res.status,
                  });
                  dispatch(
                    addUnit({
                      unitOfMeasureName: values.unitOfMeasureName,
                      baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                      conversionFactor: values.CFB,
                    })
                  );
                })
                .catch((err) => {
                  onResponse({
                    message: err.response.data.message,
                    status: err.response.status,
                  });
                });
            }}
            initialValues={{
              unitOfMeasureName: "",
              baseOfUnitOfMeasure: "",
              CFB: 0,
            }}
            validationSchema={unitOfMeasureSchema}
          >
            <Form>
              <TextField
                id="unitOfMeasureName"
                name="unitOfMeasureName"
                placeholder="Enter Unit Of Measure Name"
                width="100%"
              />
              <TextField
                id="baseOfUnitOfMeasure"
                name="baseOfUnitOfMeasure"
                placeholder="Enter Base Unit Of Measure"
                width="100%"
              />
              <TextField
                id="CFB"
                name="CFB"
                placeholder="Enter Coversion Factor"
                width="100%"
              />
              <Button type="submit" fullWidth variant="error">
                Add
              </Button>
            </Form>
          </Formik>
        )}
        {status === "update" && (
          <Formik
            onSubmit={(values) => {
              axios
                .post(
                  "http://localhost:5500/unit/update/" + values.selectedUnit,
                  {
                    unitOfMeasureName: values.unitOfMeasureName,
                    baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                    conversionFactor: values.CFB,
                  }
                )
                .then((res) => {
                  onResponse({
                    message: res.data.message,
                    status: res.status,
                  });
                  dispatch(
                    dispatch(
                      updateUnit(values.selectedUnit, {
                        unitOfMeasureName: values.unitOfMeasureName,
                        baseUnitOfMeasure: values.baseOfUnitOfMeasure,
                        conversionFactor: values.CFB,
                      })
                    )
                  );
                })
                .catch((err) => {
                  onResponse({
                    message: err.response.data.message,
                    status: err.response.status,
                  });
                });
            }}
            enableReinitialize
            initialValues={{
              unitOfMeasureName: selectedItem
                ? selectedItem.unitOfMeasureName
                : "",
              baseOfUnitOfMeasure: selectedItem
                ? selectedItem.baseUnitOfMeasure
                : "",
              CFB: selectedItem ? selectedItem.conversionFactor : 0,
              selectedUnit: ufms[0].unitOfMeasureName,
            }}
            validationSchema={unitOfMeasureUpdateSchema}
          >
            <Form>
              <SearchField width="100%" onChange={onChangeHandler} />
              <SelectField
                name="unitOfMeasureName"
                width="100%"
                options={ufms.map((p) => {
                  return {
                    key: p.unitOfMeasureName,
                    value: p.unitOfMeasureName,
                  };
                })}
              />
              <div className={style.list}>
                {items.map((p) => {
                  return (
                    <Row
                      key={p.unitOfMeasureName}
                      onClick={() => {
                        setSelectedUnit(p.unitOfMeasureName);
                      }}
                      unitOfMeasureName={p.unitOfMeasureName}
                      conversionFactor={p.conversionFactor}
                      baseUnitOfMeasure={p.baseUnitOfMeasure}
                    />
                  );
                })}
              </div>
              <TextField
                id="unitOfMeasureName"
                name="unitOfMeasureName"
                placeholder="Enter New Unit Of Measure Name"
                width="100%"
              />
              <TextField
                id="baseOfUnitOfMeasure"
                name="baseOfUnitOfMeasure"
                placeholder="Enter New Base Unit Of Measure"
                width="100%"
              />
              <TextField
                id="CFB"
                name="CFB"
                placeholder="Enter New Coversion Factor"
                width="100%"
              />
              <Button type="submit" fullWidth variant="error">
                Update
              </Button>
            </Form>
          </Formik>
        )}
        {status === "delete" && (
          <Formik
            onSubmit={(values) => {
              axios
                .delete(
                  "http://localhost:5500/unit/delete/" +
                    values.unitOfMeasureName
                )
                .then((res) => {
                  onResponse({
                    message: res.data.message,
                    status: res.status,
                  });
                  dispatch(removeUnit(values.unitOfMeasureName));
                })
                .catch((err) => {
                  onResponse({
                    message: err.response.data.message,
                    status: err.response.status,
                  });
                });
            }}
            enableReinitialize
            initialValues={{
              unitOfMeasureName: selectedItem
                ? selectedItem.unitOfMeasureName
                : "",
            }}
            validationSchema={schema}
          >
            <Form>
              <SearchField width="100%" onChange={onChangeHandler} />

              <div className={style.list}>
                {items.map((p) => {
                  return (
                    <Row
                      key={p.unitOfMeasureName}
                      onClick={() => {
                        setSelectedUnit(p.unitOfMeasureName);
                      }}
                      unitOfMeasureName={p.unitOfMeasureName}
                      conversionFactor={p.conversionFactor}
                      baseUnitOfMeasure={p.baseUnitOfMeasure}
                    />
                  );
                })}
              </div>
              <SelectField
                name="unitOfMeasureName"
                width="100%"
                options={ufms.map((p) => {
                  return {
                    key: p.unitOfMeasureName,
                    value: p.unitOfMeasureName,
                  };
                })}
              />
              <Button type="submit" fullWidth variant="error">
                Delete
              </Button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UnitOfMeasurePage;
