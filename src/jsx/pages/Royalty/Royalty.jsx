import React, { useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Button, Input } from 'rsuite';
import {
    API_ADD_ROYALTY
}
    from '../../../config/Api';
import Swal from 'sweetalert2';
import axios from 'axios';


const Royalty = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const initialValues = {
        sales_amount: "",
        royalty_point: "",
        exchange_rate: "",
        royalty_amount: "",
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

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
            sales_amount,
            royalty_point,
            exchange_rate,
            royalty_amount

        } = formValues;
        const errors = {};
        let isValid = true;

        if (!sales_amount) {
            isValid = false;
            errors.sales_amount = "Sales amount is required.";
        }
        if (!royalty_point) {
            isValid = false;
            errors.royalty_point = "Royalty point is required.";
        }
        if (!exchange_rate) {
            isValid = false;
            errors.exchange_rate = "Exchange rate is required.";
        }
        if (!royalty_amount) {
            isValid = false;
            errors.royalty_amount = "Royalty amount is required.";
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
            sales_amount: formValues.sales_amount,
            royalty_point: formValues.royalty_point,
            exchange_rate: formValues.exchange_rate,
            royalty_amount: formValues.royalty_amount
        }

        try {
            const res = await axios({
                method: "POST",
                url: API_ADD_ROYALTY,
                data: payload,
            });

            if (res.data.status) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setFormValues(initialValues);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "An error occurred",
                    showConfirmButton: true,
                })
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error during registration.');
        }
    };

    return (
        <>
            <PageTitle activeMenu={"Royalty"} />

            <div className="cardWrapper" style={{ Height: "100vh" }}>
                <div className="wrapper">
                    <div className="cards" style={cardsContainerStyle}>
                        <div
                            className={`contactInfoCard cardnew accordion`}
                        >
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Royalty</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ height: "2.5vw", marginBottom: "1.3vw", display: "flex", gap: "0.5vw" }}>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type="text"
                                            placeholder="Sales Amount"
                                            value={formValues.sales_amount || ""}
                                            onChange={(value) => handleChange("sales_amount", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.sales_amount && errors.sales_amount}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Royalty Points"
                                            value={formValues.royalty_point || ""}
                                            onChange={(value) => handleChange("royalty_point", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.royalty_point && errors.royalty_point}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Exchange Rate"
                                            value={formValues.exchange_rate || ""}
                                            onChange={(value) => handleChange("exchange_rate", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.exchange_rate && errors.exchange_rate}
                                        </div>
                                    </div>
                                    <div className="input-fields" style={{ width: "20vw" }}>
                                        <Input
                                            type='text'
                                            placeholder="Royalty Amount"
                                            value={formValues.royalty_amount || ""}
                                            onChange={(value) => handleChange("royalty_amount", value)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                fontSize: "1.1vw",
                                                outline: "none",
                                                borderBottom: "0.01vw solid black"
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.royalty_amount && errors.royalty_amount}
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

export default Royalty;