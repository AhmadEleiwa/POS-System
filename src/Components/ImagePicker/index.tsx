import { ChangeEvent, FC, useState } from "react";
import style from "./style.module.css";
import { useField } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface props {
  name: string;
}
const ImagePicker: FC<props> = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const clickHandler = () => {
    const doc = document.getElementsByName(name);
    doc[0].click();
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let image = event.target.files![0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      helpers.setValue({ img: image, preview: fileReader.result });
    };
    fileReader.readAsDataURL(image);
  };
  return (
    <div className={style.imagePicker}>
      <input
        type="file"
        onChange={onChangeHandler}
        className={style.imageInput}
        name={name}
      />
      <div onClick={clickHandler} className={style.image}>
        {field.value.preview ? (
          <img src={field.value.preview} alt="" />
        ) : (
          <FontAwesomeIcon cursor={"pointer"} fontSize={80} icon={faImage} />
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
