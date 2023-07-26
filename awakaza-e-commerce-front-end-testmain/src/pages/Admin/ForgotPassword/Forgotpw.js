import React,{useState} from 'react'
import VerificationMail from './VerificationMail'
import OtpVerification from './OtpVerification'
import ResetPassword from 'pages/Admin/common/ResetPassword'

function SellerForgotpw() {
    const [view1,setView1] =useState(true)
    const [view2,setview2] = useState(false)
    const [view3,setview3] = useState(false)
    const [email,setEmail] = useState("")

    const getEmail = (Email) => {
        setEmail(Email) 
      };

      const nextVerificationMail =() =>{
        setView1(false)
        setview2(true)  
       };

       const nextOtpverication =() =>{
        setview2(false)
        setview3(true)
      }   

  return (

    <div>
      {view1 && <VerificationMail email= {getEmail} next ={nextVerificationMail}/>}
      {view2 && <OtpVerification email= {email} next={nextOtpverication}/>}
      {view3 && <ResetPassword email = {email}/>}

    </div>
  )
}

export default SellerForgotpw