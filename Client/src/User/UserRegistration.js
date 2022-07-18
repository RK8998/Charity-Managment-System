import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

function UserRegistration() {
    const navigate = useNavigate();
    const gotoUserLogin = () => navigate('/Login');

    const [name,setName] = useState('');
    const [add,setAdd] = useState('');
    const [pincode,setPincode] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [mobile,setMobile] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [cpass,setCpass] = useState('');
    const [gender,setGender] = useState('male');
    
    const clickSubmit = (e)=>{
        e.preventDefault();

        if(state === 'NAN' || state === ''){
            alert('Please select state...');
        }
        else{
            if((pass === cpass)){
                
                const edata = {
                    email:email
                }

                axios.post('http://localhost:3001/checkUser',edata)
                .then((res) => {
                    console.log(res.data);
                    if(res.data.status === 200){
                        const data = {
                            name:name,
                            add:add,
                            pincode:pincode,
                            city:city,
                            state:state,
                            mobile:mobile,
                            email:email,
                            password:pass,
                            cpassword:cpass,
                            gender:gender
                        }
                
                        axios.post('http://localhost:3001/registration', data)
                        .then((res) =>{
                            console.log(res.data);
                            if(res.data.status === 200){
                                alert(res.data.msg);
                                gotoUserLogin();
                            }
                            if(res.data.status === 400){
                                alert(res.data.msg);
                            }
                        }).catch((error) =>{
                            console.log(error);
                        });
                    }
                    if(res.data.status === 400){
                        alert(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });  
            }
            else{
                alert("Confirm Password is miss match...");
            }
        }
    }
    return (
        <>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                <form onSubmit={clickSubmit}>
                <div className="RegBox">
                        <div className="row">
                            <div className="col-6 col-lg-6 col-md-6">
                                <div><h3>Charity Accumulate System</h3></div>
                            </div>
                            <div className="col-6 col-lg-6 col-md-6">
                                <h3><div>Registration</div></h3>
                            </div>
                            <hr/>
                        </div>
                    
                        <div className="row">
                            <div className="col-6 col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label className='form-lable'>Name</label>
                                    <input type="text" name='name' id="name" className="form-control"
                                    placeholder='Enter Your Full Name' pattern="^[a-zA-Z0-9_ ]*$" title="letters and numbers only, no  punctuation or special characters" required
                                    onChange={(e) => setName(e.target.value)}/> 
                                </div>
                                <div className="form-group">
                                    <label className='form-lable'>Address</label>
                                    <input type="text" name='add' id="add" className="form-control"
                                    placeholder='Enter Your Full Address'  pattern="^[#.0-9a-zA-Z\s,-/]+$" title="Enter the number and characters" required
                                    onChange={(e) => setAdd(e.target.value)}/>    
                                </div>
                                <div className="form-group">
                                    <label className='form-lable'>Pincode</label>
                                    <input type="number" name='pincode' id="pincode" className="form-control" 
                                    placeholder='Enter Pin Code' pattern="^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$" title="Enter only number values" required
                                    onChange={(e) => setPincode(e.target.value)}/>    
                                </div>   
                                <div className="form-group">
                                    <label className='form-lable'>City</label>
                                    <input type="text" name='city' id="city" className="form-control"
                                    placeholder='Enter City'  pattern="[a-zA-Z]+" title="Enter the only characters" required
                                    onChange={(e) => setCity(e.target.value)}/>    
                                </div>
                                <div className="form-group">
                                    {/* <input type="text" name='state' id="state" className="form-control" autoComplete='off'/>     */}
                                    <label className='form-lable'>State</label>
                                    <select name='state' id='state' className='form-control' onChange={(e) => {setState(e.target.value)}}>
                                        <option value={'NAN'}>--</option>
                                        <option value={'Andhra Pradesh'}>Andhra Pradesh</option>
                                        <option value={'Arunachal Pradesh'}>Arunachal Pradesh</option>
                                        <option value={'Assam'}>Assam</option>
                                        <option value={'Bihar'}>Bihar</option>
                                        <option value={'Chhattisgarh'}>Chhattisgarh</option>
                                        <option value={'Goa'}>Goa</option>
                                        <option value={'Gujarat'}>Gujarat</option>
                                        <option value={'Haryana'}>Haryana</option>
                                        <option value={'Himachal Pradesh'}>Himachal Pradesh</option>
                                        <option value={'Jharkhand'}>Jharkhand</option>
                                        <option value={'Karnataka'}>Karnataka</option>
                                        <option value={'Kerala'}>Kerala</option>
                                        <option value={'Madhya Pradesh'}>Madhya Pradesh</option>
                                        <option value={'Maharashtra'}>Maharashtra</option>
                                        <option value={'Manipur'}>Manipur</option>
                                        <option value={'Meghalaya'}>Meghalaya</option>
                                        <option value={'Mizoram'}>Mizoram</option>
                                        <option value={'Nagaland'}>Nagaland</option>
                                        <option value={'Odisha'}>Odisha</option>
                                        <option value={'Punjab'}>Punjab</option>
                                        <option value={'Rajasthan'}>Rajasthan</option>
                                        <option value={'Sikkim'}>Sikkim</option>
                                        <option value={'Tamil Nadu'}>Tamil Nadu</option>
                                        <option value={'Telangana'}>Telangana</option>
                                        <option value={'Tripura'}>Tripura</option>
                                        <option value={'Uttar Pradesh'}>Uttar Pradesh</option>
                                        <option value={'Uttarakhand'}>Uttarakhand</option>
                                        <option value={'West Bengal'}>West Bengal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6 col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label className='form-lable'>Mobile</label>
                                    <input type="text" name='mobile' id="mobile" className="form-control" 
                                    placeholder='Enter Mobile Number (10  Digit)' pattern="[6-9]{1}[0-9]{9}" title="Phone number with 7-9 and remaing 9 digit with 0-9" required
                                    onChange={(e) => setMobile(e.target.value)}/>    
                                </div> 
                                <div className="form-group">
                                    <label className='form-lable'>Email</label>
                                    <input type="text" name='email' id="email" className="form-control"
                                     placeholder='Enter Email Address' pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}" title="Enter the valid email id" required
                                     onChange={(e) => setEmail(e.target.value)}/>    
                                </div> 
                                <div className="form-group">
                                    <label className='form-lable'>Password</label>
                                    <input type="password" name='password' id="password" className="form-control"
                                     placeholder='Set Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                     onChange={(e) => setPass(e.target.value)}/>    
                                </div>
                                <div className="form-group">
                                    <label className='form-lable'>Confirm Password</label>
                                    <input type="text" name='cpassword' id="cpassword" className="form-control"
                                    placeholder='Re-enter Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                    onChange={(e) => setCpass(e.target.value)}/>    
                                </div><br/>
                                <div className="form-group">
                                    <label className='form-lable'>Gender : &nbsp;&nbsp;&nbsp;</label>
                                    <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />&nbsp;&nbsp;Male    
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />&nbsp;&nbsp;Female    
                                </div> 
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-12 col-lg-12 col-md-12">
                                <input type={'submit'} name='registration' id='registration' className='btn btn-block btn-primary' />
                            </div>
                        </div>
                        <br/>
                        <div className="text-center">
                            <p>Already have register ? <Link to={"/Login"}>Login</Link></p>
                            
                            {/* <p>or sign up with:</p>
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
                            </button> */}
                        </div>
                </div>
                </form>
                </div>
            </div>
        </div>
                    
        </>
    )
}

export default UserRegistration
    