import React, { useEffect } from 'react'
import CreateStore from './CreateStore'
import SellerReg from './SellerReg'
import EmailVerification from './EmailVerification'
import { useState } from 'react'
import axios from 'axios'

function SellerRegister() {

    const [view1,setView1] =useState(true)
    const [view2,setview2] = useState(false)
    const [view3,setview3] = useState(false)
    const [email,setEmail] = useState("")
    
     //get email given at seller registration
    const getEmail = (Email) => {
      setEmail(Email)
      
    };
    console.log(email)

    //unhide create store when next is pressed on sellerReg
    const NextSellerReg =() =>{
     setView1(false)
     setview2(true)
    
     
    }
    // unhide email verification when next is pressed in create store
    const nextCreateStore =() =>{
      setview2(false)
      setview3(true)
    }
    
  return (
    <div>
{view1 && <SellerReg  next= {NextSellerReg} email= {getEmail}/>}
{view2 && <CreateStore  email ={email} next= {nextCreateStore}/>}
    {view3 && <EmailVerification email ={email} />}
    </div>
  )
}

export default SellerRegister