import React, { useState } from 'react'
import PageTitle from '../../layouts/PageTitle'
import Select from "react-select";
import { Button, Checkbox, Input } from 'rsuite';
import {
    API_ADD_CATEGORY
}
    from '../../../config/Api';
import Swal from 'sweetalert2';

const CategoryForm = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const initialValues = {
        category_name: "",
        category_short_code: "",
        group: "",
        sub_group: "",
        opening_quantity: "0",
        opening_value: "0.00",
        belongs_under: "",
        photo_path: null,
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

        const formData = new FormData();
        if (formValues.photo_path instanceof File) {
            formData.append('photo_path', formValues.photo_path);
        }
        formData.append('category_name', formValues.category_name);
        formData.append('category_short_code', formValues.category_short_code);
        formData.append('group', formValues.group);
        formData.append('sub_group', formValues.sub_group);
        formData.append('opening_quantity', formValues.opening_quantity);
        formData.append('opening_value', formValues.opening_value);
        formData.append('belongs_to', formValues.belongs_to);
        formData.append('belongs_under', formValues.belongs_under);

        try {
            const res = await axios.post(API_ADD_CATEGORY, formData);
            if (res.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred.",
                text: error.response?.data?.message || "Please try again.",
                showConfirmButton: true,
            });
        }
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
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Category</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw" }}>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Category Name"
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
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Category short code "
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
                                            isSearchable={true}
                                            placeholder="Group Name"
                                            value={formValues.group || ""}
                                            onChange={(value) => handleChange("group", value)}
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
                                    </div>
                                </div>

                                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Opening Quantity"
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
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Opening Value"
                                            value={formValues.opening_value || ""}
                                            onChange={(value) => handleChange("opening_value", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.opening_value && errors.opening_value}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                                        <Select
                                            //options={gameTypeOptions}
                                            isSearchable={true}
                                            placeholder="Belongs under"
                                            value={formValues.belongs_under || ""}
                                            onChange={(value) => handleChange("belongs_under", value)}
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
                                    </div>
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
                                    <div className="form-group">
                                        <Checkbox
                                            style={{ fontSize: "1vw" }}
                                            value={formValues.is_active || ""}
                                            checked={formValues.is_active}
                                        >
                                            Active
                                        </Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: "0.01vw solid #FF8F53", paddingTop: "0.5vw", display: "flex", justifyContent: "flex-end" }}>
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

export default CategoryForm