import React, { useRef } from "react";
import classes from "./ImageInput.module.scss";

const ImageInput = (props) => {
  const imageInputStyles = {
    width: props.size || "275px",
    height: props.size || "275px",
  };

  const fileInputRef = useRef();

  const uploadImage = () => {
    fileInputRef.current.click();
  };

  const handleOnChange = ({ target }) => {
    const fileReaderPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(target.files[0]);
    });

    fileReaderPromise.then((result) => props.onChangeHandler(result));
  };

  let image = null;
  if (props.image) {
    image = (
      <img
        src={props.image}
        alt="project logo"
        className={classes["uploaded-image"]}
      />
    );
  } else {
    image = (
      <div className={classes["default-image"]}>
        <img src="/images/image-upload.png" alt="default upload icon" />
        <span>Upload Project Image</span>
      </div>
    );
  }

  return (
    <div style={imageInputStyles} className={classes["image-input-container"]}>
      <div className={`modal ${classes["image-input"]}`} onClick={uploadImage}>
        {image}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ImageInput;
