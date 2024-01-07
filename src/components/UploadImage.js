import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    if (image) {
      const apiUrl = "https://api.imgbb.com/1/upload";
      const apiKey = "b7424c6aa6bf3ab8f5c2a405e70531a2";

      const formData = new FormData();
      formData.append("key", apiKey);
      formData.append("image", image);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("Image upload result:", result);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    } else {
      console.warn("No image selected.");
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Selected"
          style={{ width: "200px" }}
        />
      )}
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default UploadImage;
