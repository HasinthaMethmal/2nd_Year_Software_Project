import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CutomerTable() {
  const [customer, setCustomer] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/customers").then((res) => {
      setCustomer(res.data);
    });
  }, [refresh]);

  function Delete(id) {
    axios.delete(`http://localhost:3000/customers/${id}`).then(() => {
      setRefresh(() => !refresh);
    });
  }

  function Edite(id) {
    
  }

  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
            <th>NIC</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customer.map((elem) => (
            <tr key={elem.uuid}>
              <th>{elem.uuid}</th>
              <th>{elem.name}</th>
              <td>{elem.address}</td>
              <td>{elem.contactNo}</td>
              <td>{elem.email}</td>
              <td>{elem.NIC}</td>
              <td>
                <Button
                  onClick={() => {
                    Delete(elem.uuid);
                  }}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    Edite(elem.uuid);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CutomerTable;
