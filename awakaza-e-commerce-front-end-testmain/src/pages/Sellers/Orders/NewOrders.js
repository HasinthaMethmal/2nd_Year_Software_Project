

import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {
  Card,
  CardBody,
  Button,
  Table
} from "reactstrap";
;

import Axios from 'axios';





function NewOrders(props) {
  const [orderData, setOrderData] = useState([]);
  
  const [onClick,setOnClick] = useState(0)


  useEffect(() => {
    console.log(props.id)
    // get commisssion data frpm db
    Axios.get("http://localhost:5000/seller/Orders",{
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

   
  const updateOrder = (data) => {
    console.log(data)
    Axios.patch("http://localhost:5000/seller/markready",{
      id:data.id,  
    },{
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem("logintoken")}`
      }
    })
    .then(
      (response) => { 
        console.log(response)
        if(response.data.success === 1){
          setOnClick(onClick+1)
          props.update()
          console.log("clicked")
        }
      }
    ).catch((error) =>{
      console.log(error)
    })
  };

 

  return (
    
    <React.Fragment>
      
      <div>
        <Card>
          <CardBody>
            <h4 className="card-title">New Orders</h4>
            <div className="table-responsive">
              <Table className="table table-bordered border-primary mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>customer ID</th>
                    <th>Product ID</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Order Ready</th>
                    
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
                        <td>
                          <Button color="primary" className="btn-rounded" onClick={() =>updateOrder(data)}>
                            ready
                          </Button>
                        </td>
                        
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
 export default NewOrders