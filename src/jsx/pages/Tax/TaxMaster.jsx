import React, { useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Select from "react-select";
import { Button, Input } from 'rsuite';
import {
    API_TAX_ENTRY
}
    from '../../../config/Api';
import Swal from 'sweetalert2';

const TaxMaster = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const exemptedOption = [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" }
    ];

    const perAmountOption = [
        { label: "Percentage", value: "P" },
        { label: "Amount", value: "A" }
    ];

    const initialValues = {
        tax_name: "",
        ledger: "",
        rate: "",
        type: "",
        s_code: "",
        exempted: "",
        per_amount: "",
        from_amount: "",
        to_amount: "",
        parent_tax: "",
        remarks: "",
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({})

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
            tax_name,
            rate,
            type,
            s_code,
            exempted,
            per_amount,

        } = formValues;
        const errors = {};
        let isValid = true;

        if (!tax_name) {
            isValid = false;
            errors.tax_name = "Tax name is required.";
        }
        if (!rate) {
            isValid = false;
            errors.rate = "Rate is required.";
        }
        if (!type) {
            isValid = false;
            errors.type = "Type is required.";
        }
        if (!s_code) {
            isValid = false;
            errors.s_code = "Code is required.";
        }
        if (!exempted) {
            isValid = false;
            errors.exempted = "Exempted is required.";
        }
        if (!per_amount) {
            isValid = false;
            errors.per_amount = "Percentage or Amount is required.";
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
            tax_name: formValues.tax_name,
            ledger: formValues.ledger,
            rate: formValues.rate,
            type: formValues.type,
            s_code: formValues.s_code,
            exempted: formValues.exempted,
            per_amount: formValues.per_amount,
            from_amount: formValues.from_amount,
            to_amount: formValues.to_amount,
            parent_tax: formValues.parent_tax,
            remarks: formValues.remarks,
        };

        try {
            const res = await axios.post(API_TAX_ENTRY, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

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
            {/* <PageTitle activeMenu={"Tax Master"} /> */}

            <div className="cardWrapper" style={{ Height: "100vh" }}>
                <div className="wrapper">
                    <div className="cards" style={cardsContainerStyle}>
                        <div
                            className={`contactInfoCard cardnew accordion`}
                        >
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Tax</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw" }}>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Tax Name"
                                            value={formValues.tax_name || ""}
                                            onChange={(value) => handleChange("tax_name", value)}
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
                                            {!formValues.tax_name && errors.tax_name}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "0.3vw" }}>
                                        <Select
                                            //options={gameTypeOptions}
                                            isSearchable={true}
                                            placeholder="ledger"
                                            value={formValues.ledger || ""}
                                            onChange={(value) => handleChange("ledger", value)}
                                            autoComplete='off'
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

                                    <div className="input-fields" style={{ width: "20vw", paddingRight: "0.3vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Rate"
                                            value={formValues.rate || ""}
                                            onChange={(value) => handleChange("rate", value)}
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
                                            {!formValues.rate && errors.rate}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", paddingRight: "0.3vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Type"
                                            value={formValues.type || ""}
                                            onChange={(value) => handleChange("type", value)}
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
                                            {!formValues.type && errors.type}
                                        </div>
                                    </div>
                                </div>
                                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="S code "
                                            value={formValues.s_code || ""}
                                            onChange={(value) => handleChange("s_code", value)}
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
                                            {!formValues.s_code && errors.s_code}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Select
                                            options={exemptedOption}
                                            isSearchable={true}
                                            placeholder="Exempted"
                                            value={formValues.exempted || ""}
                                            onChange={(value) => handleChange("exempted", value)}
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
                                            {!formValues.exempted && errors.exempted}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw", paddingRight: "0.3vw" }}>
                                        <Select
                                            options={perAmountOption}
                                            isSearchable={true}
                                            placeholder="In % or Amount"
                                            value={formValues.per_amount || ""}
                                            onChange={(value) => handleChange("per_amount", value)}
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
                                            {!formValues.per_amount && errors.per_amount}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder='From Amount'
                                            value={formValues.from_amount || ""}
                                            onChange={(value) => handleChange("from_amount", value)}
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
                                            {!formValues.from_amount && errors.from_amount}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder='To Amount'
                                            value={formValues.to_amount || ""}
                                            onChange={(value) => handleChange("to_amount", value)}
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
                                            {!formValues.to_amount && errors.to_amount}
                                        </div>
                                    </div>
                                </div>
                                <div className="inputRow" style={{ height: "auto", marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Parent Tax"
                                            value={formValues.parent_tax || ""}
                                            onChange={(value) => handleChange("parent_tax", value)}
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
                                            {!formValues.parent_tax && errors.parent_tax}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Input
                                            as="textarea"
                                            placeholder="Remarks"
                                            value={formValues.remarks || ""}
                                            onChange={(value) => handleChange("remarks", value)}
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
                                            {!formValues.remarks && errors.remarks}
                                        </div>
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


export default TaxMaster;