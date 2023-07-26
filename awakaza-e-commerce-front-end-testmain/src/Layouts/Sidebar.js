import React, { useState } from 'react';
import {FaBars,
        FaUserCircle,
        FaMoneyBillWave
} from 'react-icons/fa'

import{NavLink} from 'react-router-dom'

import './Sidebar.css'

import{AiOutlineDashboard,
       AiOutlineUser
      } from 'react-icons/ai'
 
 import {FiLogOut} from "react-icons/fi"     
 import {CiDeliveryTruck} from 'react-icons/ci'     


const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] =useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const MenuItems =[
    {
      path:"/Admin/dashboard",
      name: "Dasboard",
      icon:<AiOutlineDashboard/>
    },
    {
      path:"/Admin/Sellers",
      name: "Sellers",
      icon:<AiOutlineUser/>
    },
    {
      path:"Admin/Buyers",
      name: "Buyers",
      icon:<FaUserCircle/>
    },
    {
      path:"/Admin/Delivery",
      name: "Delivery Partners",
      icon:<CiDeliveryTruck/>
    },
    {
      path:"/Admin/Commission",
      name: "Commission",
      icon:<FaMoneyBillWave/>
    },
    {
      path:"/Logout",
      name: "Logout",
      icon:<FiLogOut/>
    },
  ]

  return (
    <div>
      <div className="shadow   bg-body-tertiary rounded">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <img src="https://circlebook.site/wp-content/uploads/2021/09/awakaza_logo-1024x1024.jpg" alt="Bootstrap" width="70" height="55" />
    <div className="navbar-brand" >Awakaza E-Commerce</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Home</a>
        </li>
      </ul>

      
    </div>
  </div>
</nav>
</div>

    
    <div className='container_sidebar' >
      <div style={{width: isOpen ? "300px":"50px"}}  className='sidebar'>
        <div className='top_section'>
          <h1 style={{display: isOpen ? "block": "none" }} className='logo'>Admin</h1>
          <div style={{marginLeft: isOpen ? "110px":"0px"}} className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {MenuItems.map((item,index)=>(
          <NavLink to={item.path} key={index} className='link' activeClassName='active'>
            <div className='icon'>{item.icon}</div>
            <div style={{display: isOpen ? "block":"none"}} className='link_test'>{item.name}</div>
          </NavLink>
        ) )}
      </div>
      <main>{children}</main>
      
    </div>
    
    </div>
  );
};

export default Sidebar;
