import React, { useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Input, Checkbox, Button } from 'rsuite';
import Select from "react-select";
import {
    API_CATEGORIES
}
    from '../../../config/Api';
import axios from 'axios';

const SubCategoryForm = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const initialValues = {
        sub_category_name: "",
        sub_category_short_code: "",
        sub_group: "",
        opening_quantity: "",
        opening_value: "",
        photo: null,
        is_active: "",
        belongs_to: "",
        sub_type_serial: ""
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [catData, setCatData] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        axios({
            method: "GET",
            url: API_CATEGORIES,
        })
            .then((res) => {
                const result = res?.data?.data;
                const formattedData = result?.map((item) => ({
                    value: item.category_id,
                    label: item.category_name
                }));
                setCatData(formattedData);

            }).catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <PageTitle activeMenu={"Sub Category Add"} />

            <div className="cardWrapper" style={{ Height: "100vh" }}>
                <div className="wrapper">
                    <div className="cards" style={cardsContainerStyle}>
                        <div
                            className={`contactInfoCard cardnew accordion`}
                        >
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Sub Category</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw" }}>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Sub Category Name"
                                            value={formValues.sub_category_name || ""}
                                            onChange={(value) => handleChange("sub_category_name", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.sub_category_name && errors.sub_category_name}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Sub Category short code "
                                            value={formValues.sub_category_short_code || ""}
                                            onChange={(value) => handleChange("sub_category_short_code", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.sub_category_short_code && errors.sub_category_short_code}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                                        <Select
                                            isSearchable={true}
                                            placeholder="Category Type"
                                            value={formValues.belongs_to ? catData.find((item)=>item.value === formValues.belongs_to ):null}
                                            onChange={(value) => handleChange("belongs_to", value)}
                                            options={catData}
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
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Sub type serial"
                                            value={formValues.sub_type_serial || ""}
                                            onChange={(value) => handleChange("sub_type_serial", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.sub_type_serial && errors.sub_type_serial}
                                        </div>
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

export default SubCategoryForm;
