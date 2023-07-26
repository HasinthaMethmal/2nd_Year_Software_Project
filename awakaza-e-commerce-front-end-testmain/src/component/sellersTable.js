import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons';
import {
    Table,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

function SellersTable() {
    const [sellers, setSellers] = useState([]);
    const [view, setView] = useState('All');
    const [shouldFetch, setShouldFetch] = useState(true);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        var endPoint;
        switch (view) {
            case 'Pending':
                endPoint = 'http://localhost:3000/api/sellers/filtered?key=IsVerify&value=0';
                break;
            case 'Approved':
                endPoint = 'http://localhost:3000/api/sellers/filtered?key=IsVerify&value=1';
                break;
            default:
                endPoint = 'http://localhost:3000/api/sellers';
        }
        // console.log(`hi ${endPoint}`)
        axios.get(endPoint)
            .then((res) => {
                setSellers(res.data);
                // console.log(res.data);
            })
            .catch((err) => console.log(err));

    }, [shouldFetch, view]);

    function approve(uuid, digit) {
        axios.put(`http://localhost:3000/api/sellers/${uuid}`, { IsVerify: digit })
            .then(() => setShouldFetch(!shouldFetch))
            .catch((err) => console.log(err));
    }



    return (
        <div>
            <h1>{view}</h1>
            <div className="d-flex p-5">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{view}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setView('All')}>All</DropdownItem>
                        <DropdownItem onClick={() => setView('Pending')}>Pending</DropdownItem>
                        <DropdownItem onClick={() => setView('Approved')}>Approved</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        {view === 'All' ? <th>State</th> : ''}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.sellerID}>
                            <td>{seller.sellerID}</td>
                            <td>{seller.firstname} {seller.lastname}</td>
                            <td>{seller.address}</td>
                            <td>{seller.contactno}</td>
                            <td>{seller.email}</td>
                            {view === 'All' ? <td>{seller.IsVerify === 1? 'Approved' : 'Pending'}</td> : ''}
                            <td> <Button color="primary" size="sm" onClick={() => approve(seller.sellerID, !seller.IsVerify)}>{seller.IsVerify === 0 ? 'Approve' : 'Demote'}</Button></td>
                            {/* <td><i className='bx bxs-trash bx-burst-hover'></i></td> */}
                            {/* <td><i className='bx bxs-pencil bx-burst-hover'></i></td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default SellersTable;