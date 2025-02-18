import React, { useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Select from "react-select";
import { Button, Checkbox, Input } from 'rsuite';
import {
    API_ADD_BANDING,
    API_SUB_CATEGORIES_NAME
}
    from '../../../config/Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const BandingForm = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const initialValues = {
        banding_name: "",
        banding_short_code: "",
        sub_category_id: "",
        is_active: 1,
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({})
    const [subName, setSubName] = useState([])

    useEffect(() => {
        fetchSubCategoryName();
    }, [])

    const fetchSubCategoryName = () => {
        axios.get(API_SUB_CATEGORIES_NAME)
            .then((res) => {
                const result = res?.data?.data?.map(item => ({
                    value: item.sub_category_id,
                    label: item.sub_category_name
                }));
                setSubName(result);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const {
            banding_name,
            banding_short_code,
            sub_category_id,

        } = formValues;
        const errors = {};
        let isValid = true;

        if (!banding_name) {
            isValid = false;
            errors.banding_name = "Banding Name is required.";
        }
        if (!banding_short_code) {
            isValid = false;
            errors.banding_short_code = "Short code is required.";
        }
        if (!sub_category_id) {
            isValid = false;
            errors.sub_category_id = "Sub category is required.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            banding_name: formValues.banding_name,
            banding_short_code: formValues.banding_short_code,
            sub_category_id: formValues.sub_category_id.value,  
            is_active: 1,
        }

        try {
            const res = await axios.post(API_ADD_BANDING, payload);
            if (res.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormValues(initialValues)

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
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Banding</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw" }}>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Banding Name"
                                            value={formValues.banding_name || ""}
                                            onChange={(value) => handleChange("banding_name", value)}
                                            autoComplete='off'
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.banding_name && errors.banding_name}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Banding short code "
                                            value={formValues.banding_short_code || ""}
                                            onChange={(value) => handleChange("banding_short_code", value)}
                                            autoComplete='off'
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.banding_short_code && errors.banding_short_code}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", alignItems: "center", paddingRight: "0.3vw" }}>
                                        <Select
                                            options={subName}
                                            isSearchable={true}
                                            placeholder="Sub category"
                                            value={formValues.sub_category_id || ""}
                                            onChange={(value) => handleChange("sub_category_id", value)}
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
                                        <div className="text-danger fs-12">
                                            {!formValues.sub_category_id && errors.sub_category_id}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Checkbox
                                            style={{ fontSize: "1vw" }}
                                            value={formValues.is_active || ""}
                                            checked={Boolean(formValues.is_active)}
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

export default BandingForm