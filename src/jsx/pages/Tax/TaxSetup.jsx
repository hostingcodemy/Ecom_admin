import React, { useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Select from "react-select";
import { Button, Input } from 'rsuite';
import {
    API_CATEGORIE_NAME,
    API_ITEM_NAME,
    API_TAX_LIST
}
    from '../../../config/Api';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const TaxSetup = (props) => {

    let cardsContainerStyle = {
        marginTop: "0",
        transition: "margin-top 0.4s ease-in-out",
    };

    const initialValues = {
        category_id: "",
        item_cd: "",
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [categoryName, setCategoryName] = useState([]);
    const [itemName, setItemName] = useState([]);
    const [taxInfo, setTaxInfo] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const selectAll = checkedItems.length === itemName.length && itemName.length > 0;

    useEffect(() => {
        fetchCategorieName();
        fetchTaxInfo();
    }, [])

    useEffect(() => {
        if (formValues.category_id) {
            fetchItemName(formValues.category_id.value);
        }
    }, [formValues.category_id]);

    const fetchCategorieName = () => {
        axios.get(API_CATEGORIE_NAME)
            .then((res) => {
                const result = res?.data?.data?.map(item => ({
                    value: item.category_id,
                    label: item.category_name
                }));
                setCategoryName(result);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const fetchItemName = (categoryId) => {
        if (!categoryId) return;

        const payload = { category_id: categoryId };

        axios.post(API_ITEM_NAME, payload)
            .then((res) => {
                const result = res?.data?.items?.map(item => ({
                    value: item.item_cd,
                    label: item.item_name
                }));
                setItemName(result);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const fetchTaxInfo = () => {
        axios.get(API_TAX_LIST)
            .then((res) => {
                const result = res?.data?.data
                setTaxInfo(result);
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

    const handleSelectAll = () => {
        if (selectAll) {
            setCheckedItems([]); 
        } else {
            setCheckedItems(itemName.map((item) => item.value)); 
        }
    };

    const handleCheckboxChange = (value) => {
        let updatedCheckedItems;

        if (checkedItems.includes(value)) {
            updatedCheckedItems = checkedItems.filter((item) => item !== value);
        } else {
            updatedCheckedItems = [...checkedItems, value];
        }

        setCheckedItems(updatedCheckedItems);
    };

    const validateForm = () => {
        const {
            category_id,
            item_cd,
        } = formValues;
        const errors = {};
        let isValid = true;

        if (!category_id) {
            isValid = false;
            errors.category_id = "Category is required.";
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <>
            <PageTitle activeMenu={"Tax Setup"} />

            <div className="cardWrapper" style={{ Height: "100vh" }}>
                <div className="wrapper">
                    <div className="cards" style={cardsContainerStyle}>
                        <div
                            className={`contactInfoCard cardnew accordion`}
                        >
                            <h4 style={{ marginBottom: "1.5vw", marginLeft: "1vw", marginTop: "2vw", fontSize: "2vw" }}>Tax Setup</h4>
                            <div className="accordion-content">
                                <div className="inputRow" style={{ marginBottom: "1.3vw", display: "flex", gap: "0.5vw", width: "100%", alignItems: "center", justifyContent: "flex-start" }}>
                                    <div className="input-fields" style={{ width: "18vw" }}>
                                        <Select
                                            isSearchable={true}
                                            placeholder="Category"
                                            value={formValues.category_id || ""}
                                            onChange={(value) => handleChange("category_id", value)}
                                            options={categoryName}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    width: "17vw",
                                                    fontSize: "0.8vw",
                                                    borderBottom: "0.01vw solid black"
                                                }),
                                            }}
                                        />
                                        <div className="text-danger fs-12">
                                            {!formValues.category_id && errors.category_id}
                                        </div>
                                    </div>
                                    {/* <div className="input-fields" style={{ width: "18vw" }}>
                                        <Select
                                            options={itemName}
                                            isSearchable={true}
                                            placeholder="Item"
                                            value={formValues.item_cd || ""}
                                            onChange={(value) => handleChange("item_cd", value)}
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
                                            {!formValues.from_amount && errors.from_amount}
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className='mt-2' style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <Table striped bordered hover style={{ width: "49%" }}>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll} 
                                                    onChange={handleSelectAll}
                                                />{" "}
                                                All
                                            </th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemName?.map((item) => (
                                            <tr key={item.value}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedItems.includes(item.value)}
                                                        onChange={() => handleCheckboxChange(item.value)}
                                                    />
                                                </td>
                                                <td>{item.label}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Table striped bordered hover style={{ width: "49%" }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxInfo?.map((tax, index) => (
                                            <tr key={tax.tax_id}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>{tax.tax_name}</td>
                                                <td>{tax.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
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
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default TaxSetup;