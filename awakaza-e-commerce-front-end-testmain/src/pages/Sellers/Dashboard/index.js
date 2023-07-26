import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

import axios from "axios"

import modalimage1 from "../../../assets/images/product/img-7.png";
import modalimage2 from "../../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";



//Import Breadcrumb


//i18n
import { withTranslation } from "react-i18next";
import NewOrders from "../Orders/NewOrders";





const SellerDashboard = props => {
  const [modal, setmodal] = useState(false);
  const[udata,setUdata] =useState([])
  const[error,setError] = useState()
  const[revenue,setRevenue] =useState({})
  const[products,setProducts] =useState({})
  const[orders,setOrders] =useState({})
  const {id} = useParams();
 

    useEffect(() =>{
      console.log(id+"id")
      //get relavent seller data from db
      axios.get("http://localhost:5000/Seller/Getstore",{
        params:{
          seller_id:id
        },
          headers:{
            'authorization': `Bearer ${sessionStorage.getItem("logintoken")}`
          }
        
        
      }).catch((error) =>{
        if(error.response.data.success ==0){
          setError(error.response.data.message);
        }
      }).then((res)=>{
         setUdata(res.data.data)
         setOrders()
         setProducts()
         setRevenue()
         
         
      })
      
    },[])
    
  
  

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description:"6"},
    { title: "Products", iconClass: "bx-archive-in", description: "10" },
    {
      title: "Revenue",
      iconClass: "bx-purchase-tag-alt",
      description:"Rs.20000",
    },
  ];


  //meta title
  document.title = "Selller Dashboard | Awakaza E-Commerce";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl="4">
              <WelcomeComp data = {udata} />
              
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
                <Row>
                  <Card>
                    <CardBody>
                      <NewOrders id= {id}/>
                    </CardBody>
                  </Card>
                  
                
                </Row>
                
              </Row>

              
            </Col>
          </Row>

          
        </Container>
      </div>

    
      

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

SellerDashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(SellerDashboard);
