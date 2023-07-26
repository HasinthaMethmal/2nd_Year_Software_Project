import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Input,
  Button,
  Container
} from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const[qty,setQty] = useState(1)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get product data from backend
    Axios.get('http://localhost:5000/seller/productsbyid', {
      params: {
        productid: id
      }
    })
      .then((response) => {
        setProducts(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(products)

  const addToCart = (data) => {
    Axios.post("http://localhost:5000/buyer/addtocart",{

      product_id:data.productid,
      buyer_id: 1,
      quantity:qty
    }).then((respose) =>{
      if(respose.data.success === 1){
          console.log(respose)
          navigate("/buyer/cart")
      }
    }).catch((err) =>{
      console.log(err)
    })
  };

  const countUp = () =>{
    setQty(qty+1);
  }

  const countDown = () =>{
    if(qty > 1){
      setQty(qty-1)
    }
    
  }

  return (
    <React.Fragment>
      <div style={{ margin: '20px' }}>
        <Container fluid>
          <div style={{ margin: '100px' }} className='center'>
            
            {products.map((product,key) => (
              
              <Card  key ={key} md={6} style={{width:"1000px"}}>
                <Row>
                  <Col> <CardImg className="img-fluid" src={product.images} alt="product" style={{margin:"40px", height:"400px",width:"400px"}} />

                  </Col>
                  <Col md ={6} style={{margin:"40px"}} className='text-center'>
                    <Row>
                      <CardTitle  >
                        <h1>{product.productname}</h1>
                      </CardTitle>
                    </Row>
                    <CardBody>
                      <Row>
                        <CardText>
                           <h4>{product.description}</h4>
                        </CardText>
                      </Row>
                      <Row>
                        <h4><b>Category: </b>{product.category}</h4>
                      </Row>
                      <Row>
                        <h4><b>Price: </b>Rs.{product.price}</h4>
                      </Row>
                      <Row>
                        <h4><b>Available Stoke: </b>{product.quntity}</h4>
                      </Row>
                      <Row>
                        <Col ><h4><b>quantity: </b></h4></Col>
                        <Col ><div style={{ width: "120px" }}>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={countUp}
                                      >+
                                    </button>
                                  </div>
                                  <Input
                                    type="text"
                                    value={qty}
                                    name="demo_vertical"
                                    readOnly
                                  />
                                  <div className="input-group-append">
                                    <button type="button" 
                                    className="btn btn-primary"
                                    onClick={countDown}
                                     >-</button>
                                  </div>
                                </div>
                              </div>
                              </Col>
                      </Row>
                      <Row style={{marginTop:"15px"}}> 
                      <div className="d-flex justify-content-center">
                    <Button
                      style={{ width: "200px" }}
                      color="success"
                      className="btn-rounded"
                      onClick={() =>addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                      </Row>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            ))}
            
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductView;
