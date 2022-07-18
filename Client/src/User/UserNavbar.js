import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function UserNavbar() {
    const navigate = useNavigate();
    const gotoUserHome = () => navigate('/Login');
    const UserLogout = ()=>{
        const temp = window.confirm('Are you sure, You want to logout ?')
        if(temp){
            sessionStorage.setItem("UserSession",null);
            gotoUserHome();
            // window.location("http://localhost:3000/");
        }
    }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">CAS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={"/userNav"}><i className="fa-solid fa-house"></i>&nbsp;&nbsp;Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"userDonate"}><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;&nbsp;Donate</Link>
                    </li>
                </ul>
                </div>
                <form className="d-flex">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    <Link to={"userProfile"}><i className="fa-solid fa-circle-user" id='admin_profile'></i></Link>
                    <button className="btn btn-outline-danger me-2" type="submit" onClick={UserLogout}>Logout</button>
                </form>
            </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default UserNavbar
