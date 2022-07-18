import React, { useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Donation() {

  const [donation, setDonation] = useState([]);
  var amt = 0;
  const navigate = useNavigate();
  const gotoAdminLogin = () => navigate("/admin");

  const fetchDonation = () => {
    axios.get('http://localhost:3001/fetchDonation')
    .then((res) => {
        console.log(res.data);
        setDonation(res.data);
    }).catch((error) => {
        console.log(error);
    });  
  }

  const deleteDonation = (id) => {
    const temp = window.confirm("Are You Sure ? ");
    if(temp){
      axios.delete('http://localhost:3001/deleteDonation/' + id)
      .then((res) => {
          console.log(res.data);
          fetchDonation();
      }).catch((error) => {
          console.log(error);
      });
    }  
  }


  useEffect(() => {
    if(sessionStorage.getItem("AdminSession") === "null"){
      gotoAdminLogin();
    }
    fetchDonation();
  },[]); 

  return (
    <div className='container mt-4'>
        <h2>₹ Donation</h2>
        {
            donation.map((item) =>
                {amt += item.amount}
            )
        }
        { amt > 0 &&
        <div className='bg-success text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
        }
        { amt == 0 &&
        <div className='bg-danger text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
        }
        <table className="table table-striped text-center mt-5">
          <thead>
              <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              {
                  amt != 0 ?
                  donation.map((item,id) =>
                      <tr>
                          <th>{id+1}</th>
                          <td>{item.name}</td>
                          <td>{item.dcategory}</td>
                          <td>{item.amount}</td>
                          <td>{item.date}</td>
                          <td>
                              <Link to={`view/${item._id}`} className='btn btn-secondary'><i className="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp;
                              <button type="button" className="btn btn-danger" onClick={(e) => deleteDonation(item._id)}><i className="fa-solid fa-trash-arrow-up"></i></button>        
                          </td>
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
  )
}

export default Donation
