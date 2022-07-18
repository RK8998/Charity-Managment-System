import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function PaymentView() {

  const id = useParams("");
  const idd = Object.values(id);
  
  const [payment,setPayment] = useState([]);
  
  const navigate = useNavigate();
  const gotoAdminLogin = () => navigate("/admin");

  const PaymentView = () => {
    axios.post('http://localhost:3001/paymentview/'+idd)
    .then((res) => {
      console.log(res.data);
      setPayment(res.data);
      console.log(payment);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if(sessionStorage.getItem("AdminSession") === "null"){
      gotoAdminLogin();
    }
    PaymentView();
  },[]);

  return (
    <>
      <div className='container mt-4'>
        <Link to={'../Payment'} className='btn btn-outline-secondary'><i className="fa-solid fa-circle-chevron-left"></i></Link>
        <br/>
        <br/>
        <div className="payment_view">
          <span style={{fontSize:22}}><b>Payment Method : </b>{payment.payment}</span><br/>
          <hr/>

          {
            payment.mobile != "" && <span style={{fontSize:18}}><b>Mobile No : </b>{payment.mobile}<br/><br/></span>
          }
                  
          {
            payment.upi != "" && <span style={{fontSize:18}}><b>UPI Id : </b>{payment.upi}<br/><br/></span>
          }
          
          {
            payment.bank != "" && <span style={{fontSize:18}}><b>Bank Name : </b>{payment.bank}<br/><br/></span>
          }
          
          {
            payment.account != null && <span style={{fontSize:18}}><b>Account Number : </b>{payment.account}<br/><br/></span>
          }
          
          {
            payment.ifsc != "" && <span style={{fontSize:18}}><b>IFSC Code : </b>{payment.ifsc}</span>
          }
        </div>
      </div>
    </>
  )
}

export default PaymentView
