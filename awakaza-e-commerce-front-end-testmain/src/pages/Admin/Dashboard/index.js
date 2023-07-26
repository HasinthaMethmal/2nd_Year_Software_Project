import React from 'react'
import{ Row,
        Col
     } from 'reactstrap'
import Cards from './Card'

import {FaUserAlt,
        FaUserTie
} from 'react-icons/fa'
import MonthlyRevenue from './MonthlyRevenue'
import Commission from '../Commission/Commission'

const userDetails = [{
  user: "sellers",
  
  icon: <FaUserAlt/>,
  link:"/admin/sellers",
  img:"https://media.istockphoto.com/id/1343711992/vector/young-woman-sitting-and-using-laptop-to-sell-products-online-with-order-packages-waiting-to.jpg?s=612x612&w=0&k=20&c=RFXzfixAbSXISxoQ8vSDrZ7vQbZl4IBsnG6PliKbpPo="
},
{
  user: "Buyers",
  
  icon: <FaUserTie/>,
  link:"/Admin/Buyers",
  img:"https://litextension.com/blog/wp-content/uploads/2020/11/10-Future-Ecommerce-Trends-to-Lock-in-Customers-in-2021Artboard-2-770x513.png"
},
{
  user: "Delivery Partners",
  
  icon: <FaUserTie/>,
  link:"/Admin/Delivery",
  img:"https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg"
},

]

function Admindash() {
  return (
    <div >
      
      <Row style={{marginTop:" ",marginLeft: "10px" }}>
      <h2>Dashboard</h2>
      </Row>
      <Row style={{marginTop:"10px "}} >
      {
        userDetails.map((user,key) =>{
          
         return(
         
            <Col key ={key}>
            <Cards  user ={user.user} count ={user.count} icon ={user.icon} img={user.img} link ={user.link}/>
            </Col>
             
         )
         

        })
      }</Row>

<Row style={{marginLeft: "10px", marginTop: "20px", }}>
      
      <Col >
      <h4>Commission </h4>
     <Commission/>
      
      </Col>
      </Row>
      
      
    </div>
  )
}

export default Admindash