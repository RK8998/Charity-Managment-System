import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function UserDonate() {

  const [dcategory , setdcategory] = useState("");
  const [payment, setpayment] = useState("");
  const [trid, settrid] = useState("");
  const [amount, setamount] = useState("");
  const [name, setname] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const [pdata, setpdata] = useState([]);
  const [cdata, setcdata] = useState([]);
  const [showed, setShowed] = useState(false);
  
  const navigate = useNavigate();
  const gotoUserLogin = () => navigate("/Login");
  const email = sessionStorage.getItem("UserSession");

  const Donat = (e) => {
    e.preventDefault();
    console.log(dcategory);
    if(dcategory === "" || dcategory === "0"){
      alert("Please Select Donation Catagory")
    }else if(payment === "" || payment === "0"){
      alert("Please Select Payment Method")
    }else{
      setShowed(true);
    }
  }

  const doDonat = (e) => {
    e.preventDefault();
    const temp = window.confirm("Check Your Details Again.....");
    if(temp){
      const data = {
        "email": email,
        "name" : name,
        "dcategory" : dcategory,
        "payment" : payment,
        "trid" : trid,
        "amount" : amount,
        "date" : date
      }
     
      axios.post('http://localhost:3001/dodonat',data)
      .then((res) => {
        console.log(res.data);
        if(res.data.status === 200){
          alert(res.data.msg);
          setShowed(false);
        }
        if(res.data.status === 400){
          alert(res.data.msg);
          setShowed(false);
        }
      }).catch((error) => {
        console.log(error);
      });
    } 
  }
  const cancel = () => {
    setShowed(false);
  }

  const fetchAllPayment = () => {
    axios.get('http://localhost:3001/fetchallpayment')
    .then((res) => {
      console.log(res.data);
      setpdata(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const fetchAllCategory = () => {
    axios.get('http://localhost:3001/fetchallcategory')
    .then((res) => {
      console.log(res.data);
      setcdata(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if(sessionStorage.getItem("UserSession") === "null"){
      gotoUserLogin();
    }
    fetchAllPayment();
    fetchAllCategory();
  },[]);
  
  return (
    <>
    <div className="container mt-4">
      <h1>Donate</h1> 
      <br/>
      <div className='mt-3'>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={Donat}>
              <div className="form-group">
                <input type="text" name='email' value={email} className='form-control' required disabled/>
              </div>
              <br/>
              <div className="form-group">
                <input type="text" name='name' placeholder='Enter Doner Full Name' className='form-control' onChange={(e) => setname(e.target.value)} required/>
              </div>
              <br/>
              <div className="form-group">
                <select name="dcategory" id="dcategory" className='form-control' onChange={(e) => setdcategory(e.target.value)}>
                  <option value="0">Select Donation Catagory</option>
                  {
                    cdata.map((item) => 
                      <option value={item.category}>{item.category}</option>
                    )
                  }
                </select>
              </div>
              <br/>
              <div className="form-group">
                <select name="payment" id="payment" className='form-control' onChange={(e) => setpayment(e.target.value)}>
                  <option value="0">Select Payment Method</option>
                  {
                    pdata.map((item) => 
                      <option value={item.payment}>{item.payment}</option>
                    )
                  }
                </select>
              </div>
              <br />
              {
                pdata.map((item) => {
                if (item.payment === payment) {
                  return <div>
                    { item.mobile && <p> Mobile No : {item.mobile}</p> }
                    { item.upi && <p> UPI Id : {item.upi}</p> }
                    { item.bank && <p> Bank Name : {item.bank}</p> }
                    { item.account && <p> Account No : {item.account}</p> }
                    { item.ifsc && <p> IFSC Code : {item.ifsc}</p> }
                  </div>;
                }
                
              })
              }
              {/* <br/> */}
              <div className="form-group">
                <input type="text" name='trid' placeholder='Enter Your Transaction ID' className='form-control' onChange={(e) => settrid(e.target.value)} required/>
              </div>
              <br/>
              <div className="form-group">
                <input type="number" name='amount' placeholder='Enter Donation Amount' className='form-control' onChange={(e) => setamount(e.target.value)} required/>
              </div>
              <br/>
              <div className="d-grid  ">
              <input type="submit" name='btnsubmit' value="Donate" className='btn btn-outline-primary btn-block'/>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="invoice" id='invoice' style={{display: showed ? "" : "none"}}>
              <div className="row text-center"><h3>Your Donation Details</h3></div><hr/>
              <div className="row">
                <div className="col-md-6" style={{textAlign:"left", fontSize:18}}>
                  <label className='mt-3'><b>Date : </b></label><br/>
                  <label className='mt-3'><b>Doner Name : </b></label><br/>
                  <label className='mt-3'><b>Donation Category : </b></label><br/>
                  <label className='mt-3'><b>Payment Method : </b></label><br/>
                  <label className='mt-3'><b>Transaction ID : </b></label><br/>
                  <label className='mt-3'><b>Amount of Donation : </b></label><br/>
                </div>
                <div className="col-md-6" style={{textAlign:"right", fontSize:18}}>
                  <label className='mt-3'>{date}</label><br/>
                  <label className='mt-3'>{name}</label><br/>
                  <label className='mt-3'>{dcategory}</label><br/>
                  <label className='mt-3'>{payment}</label><br/>
                  <label className='mt-3'>{trid}</label><br/>
                  <label className='mt-3'>{amount}</label><br/>
                </div>
              </div>
              <br/>
              <button className='btn btn-danger' onClick={doDonat}>Confirm</button>&nbsp;
              <button className='btn btn-outline-secondary' onClick={cancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  )
}

export default UserDonate
