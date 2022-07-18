import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserProfile() {

    const navigate = useNavigate();
    const gotoUserLogin = () => navigate("/Login");
    const e = sessionStorage.getItem("UserSession");

    const [id, setId] = useState("");
    const [name, setName] = useState('');
    const [add, setAdd] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [gender, setGender] = useState('male');


    const fetchUserProfile = () => {
        const data = {
            "email": e
        }
        console.log(data);
        // alert(u);

        axios.post("http://localhost:3001/fetchUserProfile", data)
            .then((res) => {
                console.log(res.data);
                setName(res.data[0].name);
                setAdd(res.data[0].add);
                setPincode(res.data[0].pincode);
                setCity(res.data[0].city);
                setState(res.data[0].state);
                setEmail(res.data[0].email);
                setMobile(res.data[0].mobile);
                setPass(res.data[0].password);
                setCpass(res.data[0].cpassword);
                setGender(res.data[0].gender);
                setId(res.data[0]._id);

            }).catch((error) => {
                console.log(error);
            });
    }
    
    const updateUserProfile = (e) => {
        e.preventDefault();

        if(state === 'NAN' || state === ''){
            alert('Please select state...');
        }
        else{
            if((pass === cpass)){
                const data = {
                    "id":id,
                    "name":name,
                    "add":add,
                    "pincode":pincode,
                    "city":city,
                    "state":state,
                    "email":email,
                    "mobile":mobile,
                    "password":pass,
                    "cpassword":cpass,
                    "gender":gender,
                }
                console.log(data);
                axios.patch("http://localhost:3001/updateUserProfile", data)
                .then((res) => {  
                    console.log(res.data);
                    if(res.data.status === 200){
                        sessionStorage.setItem("UserSession",email);
                        alert(res.data.msg);
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

    useEffect(() => {
        if (sessionStorage.getItem("UserSession") === "null") {
            gotoUserLogin();
        }
        fetchUserProfile();
    }, []);



    return (
        <>
            <div className="container mt-4">
                <h2>Profile</h2>
                <br />
                <form onSubmit={updateUserProfile}>
                <div className="row">
                    <div className="row">
                        <div className="col-6 col-lg-6 col-md-6">
                            <div className="form-group">
                                <label className='form-lable'><b>Name</b></label>
                                <input type="text" name='name' id="name" className="form-control" pattern="^[a-zA-Z0-9_ ]*$" title="letters and numbers only, no  punctuation or special characters" required
                                    onChange={(e) => setName(e.target.value)} value={name} />
                            </div><br />
                            <div className="form-group">
                                <label className='form-lable'><b>Address</b></label>
                                <input type="text" name='add' id="add" className="form-control" pattern="^[#.0-9a-zA-Z\s,-/]+$" title="Enter the number and characters" required
                                    onChange={(e) => setAdd(e.target.value)} value={add} />
                            </div><br />
                            <div className="form-group">
                                <label className='form-lable'><b>Pincode</b></label>
                                <input type="number" name='pincode' id="pincode" className="form-control" pattern="^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$" title="Enter only number values" required
                                    onChange={(e) => setPincode(e.target.value)} value={pincode} />
                            </div><br />
                            <div className="form-group">
                                <label className='form-lable'><b>City</b></label>
                                <input type="text" name='city' id="city" className="form-control" pattern="[a-zA-Z]+" title="Enter the only characters" required
                                    onChange={(e) => setCity(e.target.value)} value={city} />
                            </div><br />
                            <div className="form-group">
                                {/* <input type="text" name='state' id="state" className="form-control" autoComplete='off'/>     */}
                                <label className='form-lable'><b>State</b></label>
                                <select name='state' id='state' className='form-control' onChange={(e) => { setState(e.target.value) }} value={state}>
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
                                <label className='form-lable'><b>Mobile</b></label>
                                <input type="text" name='mobile' id="mobile" className="form-control" pattern="[6-9]{1}[0-9]{9}" title="Phone number with 7-9 and remaing 9 digit with 0-9" required
                                    onChange={(e) => setMobile(e.target.value)} value={mobile} />
                            </div> <br />
                            <div className="form-group">
                                <label className='form-lable'><b>Email</b></label>
                                <input type="text" name='email' id="email" className="form-control" pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}" title="Enter the valid email id" required
                                    onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div> <br />
                            <div className="form-group">
                                <label className='form-lable'><b>Password</b></label>
                                <input type="password" name='password' id="password" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                    onChange={(e) => setPass(e.target.value)} value={pass} />
                            </div><br />
                            <div className="form-group">
                                <label className='form-lable'><b>Confirm Password</b></label>
                                <input type="text" name='cpassword' id="cpassword" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                    onChange={(e) => setCpass(e.target.value)} value={cpass} />
                            </div><br /><br />
                            <div className="form-group">
                                <label className='form-lable'><b>Gender :</b>&nbsp;&nbsp;&nbsp;</label>
                                <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />&nbsp;&nbsp;Male
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />&nbsp;&nbsp;Female
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 col-lg-12 col-md-12">
                            <input type={'submit'} name='update' id='update' value="Update" className='btn btn-block btn-danger' />
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}

export default UserProfile
