import React from 'react'
import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DonationView = () => {
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate("/admin");

    const id = useParams("");
    const idd = Object.values(id);
    
    const [donation,setDonation] = useState([]);

    const DonationView = () => {
        axios.post('http://localhost:3001/donationtview/'+idd)
        .then((res) => {
            console.log(res.data);
            setDonation(res.data);
            console.log(donation);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
        DonationView();
    },[]);

  return (
    <>
        <div className='container mt-4'>
            <Link to={'../Donation'} className='btn btn-outline-secondary'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <br/>
            <br/>
            <div className="payment_view">
                <span style={{fontSize:22}}><b>Donation Catagory : </b>{donation.dcategory}</span><br/>
                <hr/>
                {
                    donation.email != "" && <span style={{fontSize:18}}><b>Doner Email : </b>{donation.email}<br/><br/></span>
                }

                {
                    donation.name != "" && <span style={{fontSize:18}}><b>Doner Name : </b>{donation.name}<br/><br/></span>
                }
                        
                {
                    donation.payment != "" && <span style={{fontSize:18}}><b>Payment Method : </b>{donation.payment}<br/><br/></span>
                }
                
                {
                    donation.trid != "" && <span style={{fontSize:18}}><b>Transaction ID : </b>{donation.trid}<br/><br/></span>
                }
                
                {
                    donation.amount != null && <span style={{fontSize:18}}><b>Amount : </b>{donation.amount}<br/><br/></span>
                }
                
                {
                    donation.date != "" && <span style={{fontSize:18}}><b>Donation Date : </b>{donation.date}</span>
                }
            </div>
        </div>
    </>
  )
}

export default DonationView
