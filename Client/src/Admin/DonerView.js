import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function DonerView() {

    const id = useParams("");
    const idd = Object.values(id);
    
    const [user,setUser] = useState([]);
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate("/admin");

    const getDoner = () => {
        axios.post('http://localhost:3001/donerview/' + idd)
        .then(res => {
            console.log(res.data);
            setUser(res.data);
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
        getDoner();
    },[]);

  return (
    <>
        <div className='container mt-4'>
            <Link to={'../Doner'} className='btn btn-outline-secondary'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <br/>
            <br/>

            <div className="card doner_view_box">
                <div className="card-header">
                    <div className="row">
                        {/* <div className="col-6"><b>Kushang8998</b></div> */}
                        <div className="col-6"><i class="fa-solid fa-user-check"></i>&nbsp;&nbsp;Name : {user.name}</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row" style={{padding:'10px'}}>
                        <div className="col-6 col-lg-6 col-md-6">
                            <h5 className='mt-3'><i class="fa-solid fa-envelope"></i>&nbsp;&nbsp;
                                Email  : <span>{user.email}</span></h5>
                            <h5 className='mt-3'><i class="fa-solid fa-phone"></i>&nbsp;&nbsp;
                                Mobile : <span>{user.mobile}</span></h5>  
                            <h5 className='mt-3'><i class="fa-solid fa-mars"></i>&nbsp;&nbsp;
                                Gender : <span>{user.gender}</span></h5>  
                        </div>
                        <div className="col-6 col-lg-6 col-md-6">
                            <h5 className='mt-3'><i class="fa-solid fa-location-pin"></i>&nbsp;&nbsp;
                                Address : <span>{user.add}
                                </span></h5>   
                            <h5 className='mt-3'><i class="fa-solid fa-city"></i>&nbsp;&nbsp;
                                City : <span>{user.city}</span></h5>  
                            <h5 className='mt-3'><i class="fa-solid fa-globe"></i>&nbsp;&nbsp;
                                State   : <span>{user.state}</span></h5> 
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    </>
  )
}

export default DonerView
