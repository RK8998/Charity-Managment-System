import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function UserLogin() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const gotoUserNav = () => navigate('../userNav');

    const signClick = (e) =>{
        e.preventDefault();
        const data = {
            email:email,
            password:password
        }
        console.log(data);
        axios.post('http://localhost:3001/userLogin', data)
        .then((res) =>{
            console.log(res.data);
            if(res.data.status === 200){
            //    alert(res.data.msg);
                sessionStorage.setItem("UserSession",email);
                gotoUserNav();
            }
            if(res.data.status === 400){
                alert(res.data.msg);
            }
        }).catch((error) =>{
            console.log(error);
        });
    }

  return (
    <>
    <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className='loginBox'>
                    <form onSubmit={signClick}>
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 text-center">
                                <div><h2>Doner Login</h2></div>
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <input type="text" name='email' id="email" className="form-control"
                            placeholder='Enter Email Address' pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}" title="Enter the valid email id" required 
                            onChange={(e) => setEmail(e.target.value)} />    
                            <label className='form-lable'>Email</label>
                        </div> 
                        <div className="form-group">
                            <input type="password" name='password' id="password" className="form-control"
                            placeholder='Enter Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                            onChange={(e) => setPassword(e.target.value)}/>    
                            <label className='form-lable'>Password</label>
                        </div> 
                        <div className="row justify-content-center">
                            <div className="col-6 col-md-6 col-lg-6">
                                <div className="form-check">
                                    <input type='checkbox' name='remember'/>&nbsp;&nbsp;<b>Remember Me</b>
                                </div>
                            </div>
                            <div className="col-6 col-md-6 col-lg-6">
                                <div>
                                    <a href='#!'>Forget Password ?</a>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row">
                            <div className="col-12 col-lg-12 col-md-12">
                                <input type='submit' name='login' id='login' className='btn btn-block btn-primary'/>
                            </div>
                        </div>
                        <br/>
                        <div className="text-center">
                            <p>Not a member? <Link to={"/Registration"}>Register</Link></p>
                            
                            <p>or sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f" style={{fontSize:25}}></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google" style={{fontSize:23}}></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter" style={{fontSize:23}}></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github" style={{fontSize:23}}></i>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>    
    </>
  )
}

export default UserLogin
