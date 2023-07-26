

import {useEffect,useState} from 'react'
import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Table
} from "reactstrap";
;

import Axios from 'axios';





function CancelledOrders(props) {
  const [orderData, setOrderData] = useState([]);
  
  const [onClick,setOnClick] = useState(0)


  useEffect(() => {
    console.log(props.id)
    // get commisssion data frpm db
    Axios.get("http://localhost:5000/seller/cancelledOrders",{
      params:{
        SellerID:props.id
      },
        headers:{
          'authorization': `Bearer ${sessionStorage.getItem("logintoken")}`
        }
    })
    .then(
      (response) => { setOrderData(response.data.data)
        console.log(response)

      }
    ).catch((error) =>{
      console.log(error)
    })
   }, [onClick]);

   //unhide update commission model
  const update = () => {
    setOnClick(onClick+1)
  };

 

  return (
    
    <React.Fragment>
      
      <div>
        <Card>
          <CardBody>
            <h4 className="card-title">cancelled Orders</h4>
            <div className="table-responsive">
              <Table className="table table-bordered border-primary mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>customer ID</th>
                    <th>Product ID</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(orderData) && orderData.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td>{data.id}</td>
                        <td>{data.customerID}</td>
                        <td>{data.itemID}</td>
                        <td>{data.quantity}</td>
                        <td>{data.price}</td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
}
 export default CancelledOrders