import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCroppedImg from "./cropImage";

const ImageCrop = ({ setStudent_image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);

    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setStudent_image(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "d" || event.key === "D") {
      showCroppedImage();
      setImage("");
    }
  };

  const handleCancel = () => {
    // Clear the input file and reset the state
    setImage("");
    setCroppedImage("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels("");
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setImage(URL.createObjectURL(e.target.files[0]));
        }}
        onKeyDown={handleKeyDown}
      />

      {image && (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={2.5 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )}
      {image && (
        <div
          style={{
            position: "fixed",
          }}
        >
          <div>
            <button
              onClick={() => {
                showCroppedImage();
                setImage("");
              }}
            >
              Crop
            </button>
            <button style={{ backgroundColor: "red" }} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <img src={croppedImage} alt="" style={{ width: "200px" }} />

      {croppedImage && (
        <div>
          <div>
            <button style={{ backgroundColor: "red" }} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCrop;
