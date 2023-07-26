import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

function SellerLogout() {

const navigate = useNavigate()

useEffect(() =>{
    // delete saved token and logout
    sessionStorage.removeItem("logintoken")
    navigate("/seller/login")
    console.log("useEffect working")
},[])

  return (
    <></>
  ) 
}

export default SellerLogout