import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const gotoAdminLogin = () => navigate("/admin");
  
  const [cat,setCat] = useState([]);
  const [category,setCategory] = useState("");
  const [donation, setDonation] = useState([]);
  
  const [totalDoner,settotalDoner] = useState("");
  const [totalDonation,settotalDonation] = useState([]);
  const [totalPayment,settotalPayment] = useState("");
  const [totalCategory,settotalCategory] = useState("");
  var amt = 0;
  var amt1 = 0;

  const summary = () => {
    axios.get("http://localhost:3001/summary")
    .then((res)=>{
      console.log(res.data);
      settotalDoner(res.data.totalDoner);
      settotalDonation(res.data.totalDonation);
      settotalPayment(res.data.totalPayment);
      settotalCategory(res.data.totalCategory);
      setCat(res.data.cat);
    }).catch((error)=>{
      console.log(error);
    });
  }

  useEffect(() => {
    if(sessionStorage.getItem("AdminSession") === "null"){
      gotoAdminLogin();
    }
    summary();
    fetchDonation();
  },[]);

  const ChangeCategory = (e) => {
    const c = e.target.value;
    setCategory(c);
    const data = {
      "category":c
    }
    axios.post("http://localhost:3001/categoryWiseDonation", data)
    .then((res) => {  
      setDonation(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }

//-----------------------------------------------------------------------
  const fetchDonation = () => {
    axios.get('http://localhost:3001/fetchDonation')
    .then((res) => {
        console.log(res.data);
        setDonation(res.data);
    }).catch((error) => {
        console.log(error);
    });  
  }
//-----------------------------------------------------------------------

  return (
    <>
      <div className="container mt-4">
        <h2>Home</h2>
        <br/>
        <div className="row">

          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3" style={{maxWidth:288}}>
              <div className="card-header">Doner</div>
              <div className="card-body">
                <h5 className="card-title">Total Doner's</h5>
                <p className="card-text" style={{fontSize:25}}><b>{totalDoner}</b></p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
              <div className="card text-white bg-success mb-3" style={{maxWidth:288}}>
                <div className="card-header">Payment</div>
                <div className="card-body">
                  <h5 className="card-title">Total Payment Method's</h5>
                  <p className="card-text" style={{fontSize:25}}><b>{totalPayment}</b></p>
                </div>
              </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-info mb-3" style={{maxWidth:288}}>
              <div className="card-header">Category</div>
              <div className="card-body">
                <h5 className="card-title">Total Categories</h5>
                <p className="card-text" style={{fontSize:25}}><b>{totalCategory}</b></p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
              <div className="card text-white bg-secondary mb-3" style={{maxWidth:288}}>
                <div className="card-header">Donation</div>
                <div className="card-body">
                  {
                    totalDonation.map((item)=>
                      {amt += item.amount}
                    )
                  }
                  <h5 className="card-title">Total Donation Amount</h5>
                  <p className="card-text" style={{fontSize:25}}><b>{amt}</b></p>
                </div>
              </div>
          </div>
        </div>
        <hr/>

        <div className="row">
          <div className="col-md-6">
            <select name="donation" className='form-control' onChange={ChangeCategory}>
              <option>Select Category</option>
              {
                cat.map((item) =>
                  <option value={item.category}>{item.category}</option>
                )
              }
            </select>
          </div>
          <div className="col-md-6">
            {
              donation.map((item)=>
                {amt1 += item.amount}
              ) 
            }
            <div id="categoryWiseDonation">
              { category && 
                <span style={{fontSize:20}}>Total Donation in <b>{category}</b> is
                {
                  amt1 > 0 ?
                    <b style={{color:"green"}}> ₹{amt1}</b>
                  :
                    <b style={{color:"red"}}> ₹{amt1}</b>
                }</span>
              }
            </div>  
          </div>
        </div>
        <hr/>

        <table className='table table-striped text-center mt-5'>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Payment</th>
              <th scope="col">Transaction Id</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              amt1 != 0 ?
              donation.map((item,id) =>
                  <tr>
                      <th>{id+1}</th>
                      <td>{item.date}</td>
                      <td>{item.name}</td>
                      <td>{item.dcategory}</td>
                      <td>{item.payment}</td>
                      <td>{item.trid}</td>
                      <td>{item.amount}</td>
                  </tr>
              )   
              :
              <tr>
                  <td colSpan={7}>No Donation</td>
              </tr>
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default Home
