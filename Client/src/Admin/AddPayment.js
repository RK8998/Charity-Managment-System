import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddPayment() {

    const navigate = useNavigate();
    const gotoPayment = () => navigate('../Payment');
    const gotoAdminLogin = () => navigate("/admin");

    const [payment,setPayment] = useState("");
    const [mobile,setMobile] = useState("");
    const [upi,setUpi] = useState("");
    const [bank,setBank] = useState("");
    const [account,setAccount] = useState("");
    const [ifsc,setIfsc] = useState("");

    const addpayment = (e) => {
        e.preventDefault();

        const data = {
            "payment":payment,
            "mobile":mobile,
            "upi":upi,
            "bank":bank,
            "account": account,
            "ifsc":ifsc
        }

        axios.post('http://localhost:3001/addpayment', data)
        .then((res) => {
            if(res.data.status === 200){
                alert(res.data.msg);
                gotoPayment();
            }else{
                alert(res.data.msg);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
    },[]);

  return (
    <>
        <div className='container mt-4'>
            <Link to={'../Payment'} className='btn btn-outline-secondary'><i className="fa-solid fa-circle-chevron-left"></i></Link>

            <div className="mt-3">
                <div className="row">
                    <div className="col-6 col-lg-6 col-md-6">
                        <form onSubmit={addpayment}>
                            <div className="form-group">
                                <label><b>Payment Method Name : </b></label>
                                <input type={"text"} name="methodname" className='form-control' required placeholder='Enter Your Payment Method (e.g GPay)'
                                onChange={(e) => setPayment(e.target.value)} autoComplete="off"/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>Mobile : </label>
                                <input type={"number"} name="mobile" className='form-control' onChange={(e) => setMobile(e.target.value)} />
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>UPI : </label>
                                <input type={"text"} name="upi" className='form-control' onChange={(e) => setUpi(e.target.value)} />
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>Bank Name : </label>
                                <input type={"text"} name="bankname" className='form-control' onChange={(e) => setBank(e.target.value)}/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>Account No : </label>
                                <input type={"number"} name="account" className='form-control' onChange={(e) => setAccount(e.target.value)} />
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>IFSC : </label>
                                <input type={"text"} name="ifsc" className='form-control' onChange={(e) => setIfsc(e.target.value)} />
                                <br/>
                            </div>
                            <div className="form-group">
                                <input type={"submit"} name="addMethod" value={"Add Details"} className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddPayment
