

import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
  Table
} from "reactstrap";
import UpdateCommission from './UpdateCommission';

import Axios from 'axios';
import AddNewCategory from './AddNewCategory';
import RemoveCategory from './RemoveCategory';




function Commission() {
  const [commissionData, setCommissionData] = useState([]);
  const [sendData, setSendData] = useState(null);
  const [visibility1,setVisibility1] = useState(false)
  const [visibility2,setVisibility2] = useState(false)
  const [visibility3,setVisibility3] = useState(false)
  const [onClick,setOnClick] = useState(0)

  useEffect(() => {
    // get commisssion data frpm db
    Axios.get("http://localhost:5000/Admin/getcommission")
    .then(
      (response) => { setCommissionData(response.data.data)
        console.log(commissionData)
      }
    ).catch((error) =>{
      console.log(error)
    })
   }, [onClick]);

   //unhide update commission model
  const showUpdateModal = (commission) => {
    setSendData(commission);
    setVisibility1(!visibility1)
  };

  // unhide Add new category model
  const showAddModal = ()=> {
   
    setVisibility2(!visibility2)
  };
  //unhide delete category model
  const showDeleteModal = ()=> {
   
    setVisibility3(!visibility3)
  };
// hide modals
  const hideModal = () => {
    setVisibility1(false);
    setVisibility2(false)
    setVisibility3(false)
  };
// reload data when there is a change
  const reload = () =>{
    setOnClick(onClick+1)
  }

  return (
    
    <React.Fragment>
      
      <div >
        <Card style={{marginBottom:"20px"}}>
          <CardBody>
            <h4 className="card-title">Commission Details</h4>
            <div className="table-responsive">
              <Table className="table table-bordered border-primary mb-0">
                <thead>
                  <tr>
                    <th>Commission ID</th>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Commission Rate</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(commissionData) && commissionData.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td>{data.commission_id}</td>
                        <td>{data.category_Id}</td>
                        <td>{data.category_name}</td>
                        <td>{(data.commission_rate*100).toFixed(2) }%</td>
                        <td>
                          <Button color="primary" className="btn-rounded" onClick={() => showUpdateModal(data)}>
                            Update
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
        <Button color="primary" className="btn-rounded" onClick={showAddModal}>Add New Category</Button>
        <Button color="primary" style={{marginLeft:"10px"}} className="btn-rounded" onClick={showDeleteModal}>remove Category</Button>
        {visibility1 && <UpdateCommission data={sendData} onHide={hideModal} reload={reload} />}
        {visibility2 && <AddNewCategory onHide ={hideModal} reload={reload}/>}
        {visibility3 && <RemoveCategory onHide ={hideModal} reload={reload}/>}

      </div>
    </React.Fragment>
  );
}
 export default Commission