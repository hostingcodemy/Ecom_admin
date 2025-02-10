import React, { useState } from 'react'
import PageTitle from '../../layouts/PageTitle'
import Select from "react-select";
import { Button, Checkbox, Input } from 'rsuite';
import { IoAdd } from "react-icons/io5";

const ItemForm = (props) => {
  let cardsContainerStyle = {
    marginTop: "0",
    transition: "margin-top 0.4s ease-in-out",
  };

  const initialValues = {
    category_name: "",
    category_short_code: "",
    group: "",
    sub_group: "",
    // opening_quantity: "0.00",
    // opening_value: "0.00",
    belongs_under: "",
    photo: null,
    is_active: 1,
    belongs_to: ""
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    if (name === "photo" && value instanceof File) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const {
      category_name,
      category_short_code,
      opening_quantity,
      opening_value,
      photo,

    } = formValues;
    const errors = {};
    let isValid = true;

    if (!category_name) {
      isValid = false;
      errors.category_name = "Name is required.";
    }
    if (!category_short_code) {
      isValid = false;
      errors.category_short_code = "Short code is required.";
    }
    if (!opening_quantity) {
      isValid = false;
      errors.opening_quantity = "Quantity is required.";
    }
    if (!opening_value) {
      isValid = false;
      errors.opening_value = "Value is required.";
    }
    if (!photo) {
      isValid = false;
      errors.photo = "Photo is required.";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // const formData = new FormData();
    // if (formValues.photo) {
    //    formData.append('photo', formValues.photo);
    // }
    // formData.append('game_name', formValues.game_name);

    // try {
    //    const response = await axios.post("", formData);
    //    if (response.status === 200) {
    //       Swal.fire({
    //          position: "top-end",
    //          icon: "success",
    //          title: "Game created successfully!",
    //          showConfirmButton: false,
    //          timer: 1500,
    //       });
    //       navigate("/list-game");
    //    }
    // } catch (error) {
    //    Swal.fire({
    //       position: "top-end",
    //       icon: "error",
    //       title: "An error occurred.",
    //       text: error.response?.data?.message || "Please try again.",
    //       showConfirmButton: true,
    //    });
    // }
  };
  return (
    <>
      <PageTitle activeMenu={"Category Add"} />
      <div className="cardWrapper" style={{ Height: "100vh" }}>
        <div className="wrapper">
          <div className="cards" style={cardsContainerStyle}>
            <div
              className={`contactInfoCard cardnew accordion`}
            >
              <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Item</h4>
              <div className="accordion-content">
                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", justifyContent: "space-between" }}>
                  <div className="input-fields" style={{ width: "17vw" }}>
                    <Input
                      type='text'
                      placeholder="Item Name"
                      value={formValues.category_name || ""}
                      onChange={(value) => handleChange("category_name", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.category_name && errors.category_name}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "14vw" }}>
                    <Input
                      type='text'
                      placeholder="Alias"
                      value={formValues.category_short_code || ""}
                      onChange={(value) => handleChange("category_short_code", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.category_short_code && errors.category_short_code}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "20vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isClearable={true}
                      isSearchable={true}
                      placeholder="Group"
                      value={formValues.business_source || ""}
                      onChange={(value) => handleChange("business_source", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "17vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "20vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Sub Group Name"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "17vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div>
                </div>

                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="input-fields" style={{ width: "12vw" }}>
                    <Input
                      type='text'
                      placeholder="Short Name"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "18vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Category Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "15vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "18vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Subcategory Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "15vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "15vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Unit"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "12vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "13vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Stock Item"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "13vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="input-fields" style={{ width: "11vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "11vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                  </div>
                  <div className="input-fields" style={{ width: "12vw" }}>
                    <Input
                      type='text'
                      placeholder="Item Code"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "12vw" }}>
                    <Input
                      type='text'
                      placeholder="Sale Rate"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "12vw" }}>
                    <Input
                      type='text'
                      placeholder="MRP"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  {/* <div className="input-fields" style={{ width: "18vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Category Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "15vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div> */}
                  <div className="input-fields" style={{ width: "13vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Alternate UOM"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "13vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Checkbox
                      style={{ fontSize: "1vw" }}
                      value={formValues.is_active || ""}
                      checked={formValues.is_active}
                    >
                      Availability
                    </Checkbox>
                  </div>
                </div>

                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="input-fields" style={{ width: "10vw" }}>
                    <Input
                      type='text'
                      placeholder="HSN Code"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "8vw" }}>
                    <Input
                      type='text'
                      placeholder="Alternate QTY"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "14vw" }}>
                    <Input
                      type='text'
                      placeholder="Bar Code"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "9vw" }}>
                    <Input
                      type='text'
                      placeholder="Minimum Stock"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "12vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Conversion UOM"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "12vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                  </div>
                  {/* <div className="input-fields" style={{ width: "18vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Category Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "15vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div> */}
                  <div className="input-fields" style={{ width: "18vw" }}>
                    <Input
                      type='file'
                      value={formValues.photo || null}
                      onChange={(value) => handleChange("photo", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.photo && errors.photo}
                    </div>
                  </div>
                </div>

                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="input-fields" style={{ width: "12vw" }}>
                    <Input
                      type='text'
                      placeholder="Maximum Stock"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "8vw" }}>
                    <Input
                      type='text'
                      placeholder="Coversion QTY"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "14vw" }}>
                    <Input
                      type='text'
                      placeholder="Re-order Level"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  <div className="input-fields" style={{ width: "14vw" }}>
                    <Input
                      type='text'
                      placeholder="Min Order Quantity"
                      value={formValues.opening_quantity || ""}
                      onChange={(value) => handleChange("opening_quantity", value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "1.1vw",
                        outline: "none",
                        borderBottom: "0.01vw solid black"
                      }}
                    />
                    <div className="text-danger fs-12">
                      {!formValues.opening_quantity && errors.opening_quantity}
                    </div>
                  </div>
                  {/* <div className="input-fields" style={{ width: "18vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                    <Select
                      //options={gameTypeOptions}
                      isSearchable={true}
                      placeholder="Category Type"
                      value={formValues.sub_group || ""}
                      onChange={(value) => handleChange("sub_group", value)}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: 'none',
                          boxShadow: 'none',
                          backgroundColor: 'transparent',
                          height: "1vw",
                          width: "15vw",
                          fontSize: "0.9vw",
                          borderBottom: "0.01vw solid black"
                        })
                      }}
                    />
                    <div className="addIcon">
                      <IoAdd size={20} />
                    </div>
                  </div> */}
                  <div className="form-group">
                    <Checkbox
                      style={{ fontSize: "1vw" }}
                      value={formValues.is_active || ""}
                      checked={formValues.is_active}
                    >
                      Top Selling Item
                    </Checkbox>
                  </div>
                  <div className="form-group">
                    <Checkbox
                      style={{ fontSize: "1vw" }}
                      value={formValues.is_active || ""}
                      checked={formValues.is_active}
                    >
                      Discount Allowed
                    </Checkbox>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div style={{ borderTop: "0.01vw solid #FF8F53", paddingTop: "0.5vw", display: "flex", justifyContent: "flex-end", marginTop: "1vw" }}>
            <div>
              <Button
                color="orange"
                appearance="primary"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemForm;