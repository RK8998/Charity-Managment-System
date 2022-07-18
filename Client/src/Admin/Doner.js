import React from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Doner() {

  const [doners,setDoners] = useState([]);
  const navigate = useNavigate();
  const gotoAdminLogin = () => navigate("/admin");

  const FetchDoners = () => {
    axios.get("http://localhost:3001/fetchDoners")
      .then((res) => {
          console.log(res.data);
          setDoners(res.data);
      })
      .catch((err) => {
          console.log(err);
      })
  }
  useEffect(() => {
    if(sessionStorage.getItem("AdminSession") === "null"){
      gotoAdminLogin();
    }
    FetchDoners();
  },[])

  const DeleteDoner = (id) => {
    const temp = window.confirm("Are You Sure ?");
    if(temp){
      axios.delete('http://localhost:3001/deleteDoner/' + id)
      .then(res => {
        console.log(res.data);
        FetchDoners();
      }).catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <>
        <div className="container mt-4">
          <h2>Doner's</h2>
          <br/>
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Mobile</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                doners.map((item,id) =>
                  <tr>
                      <td>{id+1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <NavLink to={`DonerDonation/${item.email}`}>
                          <button className='btn btn-success'><i class="fa-solid fa-indian-rupee-sign"></i></button>
                          </NavLink>
                        &nbsp;&nbsp;&nbsp;
                        <NavLink to={`view/${item._id}`}>
                          <button className='btn btn-secondary'><i className="fa-solid fa-eye"></i></button>
                        </NavLink>
                        &nbsp;&nbsp;&nbsp;
                        <button className='btn btn-danger' onClick={(e) => DeleteDoner(item._id)}><i className="fa-solid fa-user-minus"></i></button>
                      </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </>
  )
}

export default Doner
