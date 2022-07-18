import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate('/admin');
    var username = sessionStorage.getItem("AdminSession");

    const AdminLogout = ()=>{
        const temp = window.confirm('Are you sure, You want to logout ?')
        if(temp){
            sessionStorage.setItem("AdminSession",null);
            gotoAdminLogin();
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
                        <Link className="nav-link active" aria-current="page" to={"/adminNav"}><i className="fa-solid fa-house"></i>&nbsp;&nbsp;Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"Doner"}><i className="fa-solid fa-user"></i>&nbsp;&nbsp;Doner's</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"Donation"}><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;&nbsp;Donations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"Payment"}><i className="fa-solid fa-building-columns"></i>&nbsp;&nbsp;Payment</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"Category"}><i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;Category</Link>
                    </li>
                </ul>
                </div>
                <form className="d-flex">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    <Link to={`AdminProfile`}><i className="fa-solid fa-circle-user" id='admin_profile'></i></Link>
                    <button className="btn btn-outline-danger me-2" type="submit" onClick={AdminLogout}>Logout</button>
                </form>
            </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default Navbar
