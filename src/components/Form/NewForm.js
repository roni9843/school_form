import React, { useState } from "react";
import styled from "styled-components";
import "./NewForm.css";
import NewImageAndCrop from "./NewImageAndCrop";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
`;

const NewForm = () => {
  // ? main state
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    fathersName: "",
    session: "",
    mothersName: "",
    father_pesha: "",
    present_address: "",
    permanent_address: "",
    ovivhaboker_nam: "",
    ovivhaboker_thikana: "",
    class: "",
    previous_school: "",
    previous_school_place: "",
    others_bro_sis: "",
    others_bro_sis_name: "",
    others_bro_sis_class: "",
    others_bro_sis_sec: "",
    dhromo: "",
    nationality: "",
    birth_certificate_number: "",
    studentRoll: "",
    studentBloodGrp: "",
  });
  const [croppedImage, setCroppedImage] = useState("");
  const [student_image, setStudent_image] = useState("");
  const [student_imageOnline, setStudent_imageOnline] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorForDup, setErrorForDup] = useState("");

  const [errors, setErrors] = useState({
    studentName: "",
    class: "",
    session: "",
    studentRoll: "",
    studentImage: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear validation errors when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      studentName: "",
      class: "",
      session: "",
      studentRoll: "",
      studentImage: "",
    };

    // Validate image
    if (!student_imageOnline) {
      newErrors.studentImage = "Please select an image.";
      isValid = false;
    }

    // Validate other required fields
    const requiredFields = ["studentName", "class", "session", "studentRoll"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, don't proceed with the submission
      return;
    }

    try {
      setLoading(true);

      const returnPostPhoto = await uploadImageOnline(student_imageOnline);

      const response = await fetch(
        "https://school-form-backend.vercel.app/api/saveFormData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            studentImage: returnPostPhoto.data.display_url,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.error) {
          // Handle the case where there's a duplicate entry
          console.error("Duplicate entry:", responseData.error);
          setErrorForDup(
            "Duplicate entry: Student information already exists."
          );

          setTimeout(() => {
            setErrorForDup("");
            setLoading(false);
          }, 5000);
          // You can display this error message to the user in your UI
        } else {
          console.log("Form data submitted successfully ", returnPostPhoto);
          setShowSuccessMessage(true);

          clearAllValue();

          setTimeout(() => {
            setShowSuccessMessage(false);
            setLoading(false);
          }, 5000);
        }
      } else {
        console.error("Failed to submit form data");
        // Handle other error cases accordingly
        setErrorForDup("Duplicate entry: Student information already exists.");
        setTimeout(() => {
          setErrorForDup("");
          setLoading(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error accordingly
      setErrorForDup("Error submitting form data. Please try again.");
      setTimeout(() => {
        setErrorForDup("");
        setLoading(false);
      }, 5000);
    }
  };

  const uploadImageOnline = async (croppedImage) => {
    if (croppedImage) {
      const apiUrl = "https://api.imgbb.com/1/upload";
      const apiKey = "b7424c6aa6bf3ab8f5c2a405e70531a2";

      const formData = new FormData();
      formData.append("key", apiKey);
      formData.append("image", croppedImage);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        return result;
      } catch (error) {
        console.error("Image upload error:", error);
      }
    } else {
      console.warn("No image selected.");
    }
  };

  const clearAllValue = () => {
    setFormData({
      studentName: "",
      dateOfBirth: "",
      fathersName: "",
      session: "",
      mothersName: "",
      father_pesha: "",
      present_address: "",
      permanent_address: "",
      ovivhaboker_nam: "",
      ovivhaboker_thikana: "",
      class: "",
      previous_school: "",
      previous_school_place: "",
      others_bro_sis: "",
      others_bro_sis_name: "",
      others_bro_sis_class: "",
      others_bro_sis_sec: "",
      dhromo: "",
      nationality: "",
      birth_certificate_number: "",
      studentRoll: "",
      studentBloodGrp: "",
    });

    setStudent_image("");
    setStudent_imageOnline("");
    document.getElementById("uploadCaptureInputFile").value = "";
    setCroppedImage("");

    // now create a success msg ..when submit btn click and success then show success msg..but success message shoud show only 10s
  };

  return (
    <FormContainer>
      <div className="p-2">
        <NewImageAndCrop
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          setStudent_image={setStudent_image}
          setStudent_imageOnline={setStudent_imageOnline}
        ></NewImageAndCrop>
        <ErrorText>{errors.studentImage}</ErrorText>
      </div>

      <Form onSubmit={handleSubmit}>
        <form className="p-3">
          {/* Your other form inputs */}
          {/* ... */}

          {/* Student Name */}
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              ছাত্র / ছাত্রীর নাম :
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              aria-describedby="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.studentName}</ErrorText>
          </div>

          {/* Class */}
          <div className="mb-3">
            <label htmlFor="class" className="form-label">
              কোন শ্রেণিতে ভর্তি হতে ইচ্ছুক :
            </label>
            <input
              type="text"
              className="form-control"
              id="class"
              name="class"
              aria-describedby="class"
              value={formData.class}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.class}</ErrorText>
          </div>

          {/* Session */}
          <div className="mb-3">
            <label htmlFor="session" className="form-label">
              Session :
            </label>
            <input
              type="text"
              className="form-control"
              id="session"
              name="session"
              aria-describedby="session"
              value={formData.session}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.session}</ErrorText>
          </div>

          {/* Student Roll */}
          <div className="mb-3">
            <label htmlFor="studentRoll" className="form-label">
              রোল :
            </label>
            <input
              type="number"
              className="form-control"
              id="studentRoll"
              name="studentRoll"
              aria-describedby="studentRoll"
              value={formData.studentRoll}
              onChange={handleInputChange}
            />
            <ErrorText>{errors.studentRoll}</ErrorText>
          </div>

          {/* Student Blood Group */}
          <div className="mb-3">
            <label htmlFor="studentBloodGrp" className="form-label">
              রক্ত গ্রুপ :
            </label>
            <input
              type="text"
              className="form-control"
              id="studentBloodGrp"
              name="studentBloodGrp"
              aria-describedby="studentBloodGrp"
              value={formData.studentBloodGrp}
              onChange={handleInputChange}
            />
          </div>
        </form>
        {showSuccessMessage && (
          <div className="success-message">Form submitted successfully!</div>
        )}
        {errorForDup && <div className="error-message">{errorForDup}</div>}

        {loading ? (
          "Loading..."
        ) : (
          <SubmitButton className="m-3" type="submit">
            Submit
          </SubmitButton>
        )}
      </Form>
    </FormContainer>
  );
};

export default NewForm;
