import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  CardTitle
} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from 'axios'

const Cart = () => {
    const [productList, setproductList] = useState([]);
    const[onClick,setOnClick] =useState(0)

    useEffect(() =>{
      Axios.get("http://localhost:5000/buyer/getcart",{
      
    }).then((respose) =>{
    console.log(respose)
    setproductList(respose.data.data)
    }).catch((err) =>{
      console.log(err)
    })
    },[onClick])

    const removeCartItem = (id) =>{
      Axios.post("http://localhost:5000/buyer/deletefromcart",{ 
      id:id
      
    }).then((respose) =>{
      setOnClick(onClick+1)
    console.log(respose)
    
    }).catch((err) =>{
      console.log(err)
    })
    }
  return (
    <React.Fragment>
        <div className="page-content">
        <Container fluid>
        <Col >
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product </th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th colSpan="2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.map(product => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.images}
                                alt="product"
                                title="product"
                                className="avatar-md"
                              />
                            </td>
                            <td>
                              <h5 className="font-size-14 text-truncate">
                                  {product.productname}
                              </h5>
                            </td>
                            <td>Rs. {product.price}</td>
                            <td>
                              <div style={{ width: "120px" }}>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    {product.quantity}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>Rs. {product.price*product.quantity}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={() => removeCartItem(product.item_id)}
                                className="action-icon text-danger"
                              >
                                {" "}
                                <i className="mdi mdi-trash-can font-size-18" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-4">
                  <Col sm="10">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Link
                          to="/buyer/payment"
                          className="btn btn-success"
                        >
                          <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                          Checkout{" "}
                        </Link>
                      </div>
                    </Col>
                  <Col sm="2">
                      <div className="text-sm-end mt-2 mt-sm-0" style={{marginLeft:"5px"}}>
                        <Link
                          to="/Products"
                          className="btn btn-primary"
                        >
                          
                          Go Back{" "}
                        </Link>
                      </div>
                    </Col>
                    
                    
                  </Row>
                </CardBody>
              </Card>
            </Col>
        </Container>
        </div>
    </React.Fragment>
  )
}

export default Cart