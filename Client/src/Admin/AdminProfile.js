import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function AdminProfile() {
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate("/admin");
    const u = sessionStorage.getItem("AdminSession");
    // const [admin,setAdmin] = useState([]);
    const [id,setId] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");

    const fetchAdminProfile = () => {
        const data = {
            "username" : u
        }
        console.log(data);
        // alert(u);

        axios.post("http://localhost:3001/fetchAdminProfile", data)
        .then((res) => {  
            console.log(res.data);
            setUsername(res.data[0].username);
            setPassword(res.data[0].password);
            setEmail(res.data[0].email);
            setMobile(res.data[0].mobile);
            setId(res.data[0]._id);

        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
        fetchAdminProfile();
    },[]);

    const updateAdminProfile = (e) => {
        e.preventDefault();
        const data = {
            "id":id,
            "username":username,
            "password":password,
            "email":email,
            "mobile":mobile
        }
        console.log(data);
        axios.patch("http://localhost:3001/updateAdminProfile", data)
        .then((res) => {  
            console.log(res.data);
            if(res.data.status === 200){
                sessionStorage.setItem("AdminSession",username);
                alert(res.data.msg);
            }
            if(res.data.status === 400){
                alert(res.data.msg);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

  return (
    <>
        <div className="container mt-4">
            <h2>Profile</h2>
            <br/>
            <div className="row">
                <form onSubmit={updateAdminProfile}>
                    <div className="col-md-6">
                        <input type={"hidden"} name="id" value={id} />
                        <div className="form-group">
                            <label><b>Username : </b></label>
                            <input type={"text"} name="username" value={username} className="form-control" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label><b>password : </b></label>
                            <input type={"text"} name="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label><b>Email : </b></label>
                            <input type={"text"} name="password" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label><b>Mobile : </b></label>
                            <input type={"number"} name="mobile" value={mobile} className="form-control" onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" name='update' value={"Update"} className="btn btn-danger"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AdminProfile
