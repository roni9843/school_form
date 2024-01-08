import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCroppedImg from "./NewGetCroppedImg";

const NewImageAndCrop = ({ setStudent_image, setStudent_imageOnline }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);

    setCroppedAreaPixels(croppedAreaPixels);
  };

  // ... (previous code)

  const showCroppedImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImgBlob(
        image,
        croppedAreaPixels
      );
      const croppedImageBase64 = await convertBlobToBase64(croppedImageBlob);

      //    setCroppedImage(croppedImageBlob);
      //  setStudent_image(croppedImageBlob);

      // Upload the cropped image to ImgBB
      setStudent_imageOnline(croppedImageBase64);
    } catch (e) {
      console.error(e);
    }
  };

  const showCroppedImageOffline = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setStudent_image(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const getCroppedImgBlob = (url, pixelCrop) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          img,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          resolve(blob);
        });
      };
      img.src = url;
    });

  const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // ... (remaining code)

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
                showCroppedImageOffline();
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

export default NewImageAndCrop;
