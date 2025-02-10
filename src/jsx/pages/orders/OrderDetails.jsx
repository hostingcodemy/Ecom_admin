import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import DataTable from 'react-data-table-component';
import DataTableSettings from '../../../helpers/DataTableSettings';
import CommonLoader from '../../components/loader/CommonLoader';
import { Col, Form, Modal, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import {
    API_ALL_CUSTOMERS,
    API_CUSTOMER_ORDERS
}
    from '../../../config/Api';


const OrderDetails = (props) => {

    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const [datePart] = dateString.split(',');
        const [month, day, year] = datePart.split('/').map(num => parseInt(num));
        return `${day}/${month}/${year}`;
    };

    const customStyles = {
        headCells: {
            style: {
                brackgroundColor: "#6082b6",
                borderRight: "1px solid white",
                color: "white",
            },
        },
    };

    useEffect(() => {
        fetchCustomer();
    }, [])

    const fetchCustomer = () => {

        axios({
            method: "GET",
            url: API_ALL_CUSTOMERS,
        })
            .then((res) => {
                const result = res?.data?.findCustomers;
                setCustomerData(result);
                setLoadingIndicator(false);
            }).catch((e) => {
                console.log(e);
            })
    };

    const fetchCustomerOrder = (customerId) => {

        axios({
            method: "GET",
            url: `${API_CUSTOMER_ORDERS}/${customerId}`,
        })
            .then((res) => {
                const result = res?.data?.findCustomerOrders;
                setHistoryData(result);
            }).catch((e) => {
                console.log(e);
            })
    };

    const columns = [
        {
            name: <h5>Name</h5>,
            selector: (row) => row.first_name,
            sortable: true,
            cell: (row) => (
                <div
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => {
                        handleShow(row);
                        fetchCustomerOrder(row.customer_id);
                    }}
                >
                    {row.first_name} {row.last_name}
                </div>
            )
        },
        {
            name: <h5>Phone</h5>,
            selector: (row) => row.phone,
            sortable: true,
            cell: (row) => <div>{row.phone}</div>
        },
        {
            name: <h5>Email</h5>,
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => <div>{row.email}</div>
        }
    ];

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div>
                <Row>
                    <Col lg={6}>
                        <Form className='d-flex'>
                            <Form.Control
                                type='search'
                                placeholder='search...'
                                className='me-2 rounded-pill'
                                aria-label='search'
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    });

    return (
        <>
            <PageTitle activeMenu={"All customer"} />

            <div className='table-responsive'>
                <DataTable
                    columns={columns}
                    data={customerData}
                    customStyles={customStyles}
                    direction='auto'
                    highlightOnHover
                    persistTableHead
                    pagination
                    paginationPerPage={DataTableSettings.paginationPerPage}
                    paginationRowsPerPageOptions={
                        DataTableSettings.paginationRowsPerPageOptions
                    }
                    subHeader
                    fixedHeaderScrollHeight='400px'
                    subHeaderComponent={subHeaderComponentMemo}
                    progressPending={loadingIndicator}
                    progressComponent={
                        <CommonLoader loadingIndicator={loadingIndicator} />
                    }
                />
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Number</th>
                                <th>Order Date</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Payable Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((order, index) => (
                                <tr key={order._id || index}>
                                    <td>{order.orderId || 'N/A'}</td>
                                    <td>{typeof order.orderNumber === 'string' && order.orderNumber ? order.orderNumber : 'N/A'}</td>
                                    <td>{formatDate(order.orderDate) || 'N/A'}</td>
                                    <td>{order.productName || 'N/A'}</td>
                                    <td>{order.quantity || 0}</td>
                                    <td>{order.payableAmount || '0.00'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderDetails;