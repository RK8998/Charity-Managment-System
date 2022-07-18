import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UHome() {
    const [dt,setDt] = useState([]);
    var amt = 0;
    const email = sessionStorage.getItem("UserSession");
    const fetchAllDonation = () => {
        console.log(email);
        const data = {
            "email":email
        }

        axios.post("http://localhost:3001/fetchalldonation",data)
        .then((res) => {
            console.log(res.data);
            setDt(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchAllDonation();
    },[]);

  return (
    <>
    <div className="container mt-4">
        <h1>Home</h1> 
        <br/>
        {
            dt.map((item) =>
                {amt += item.amount}
            )
        }
        { amt > 0 &&
        <div className='bg-success text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
        }
        { amt == 0 &&
        <div className='bg-danger text-white text-center' style={{borderRadius:10}}><h3>Total Donation : ₹{amt}</h3></div>
        }
        <table className="table table-striped text-center mt-5">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    amt != 0 ?
                    dt.map((item,id) =>
                        <tr>
                            <th>{id+1}</th>
                            <td>{item.date}</td>
                            <td>{item.name}</td>
                            <td>{item.dcategory}</td>
                            <td>{item.payment}</td>
                            <td>{item.trid}</td>
                            <td>{item.amount}</td>
                            <td>
                                {/* <Link to={`view/${item._id}`} className='btn btn-secondary'><i className="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp; */}
                                {/* <button type="button" className="btn btn-danger" onClick={(e) => deleteDt(item._id)}><i className="fa-solid fa-trash-arrow-up"></i></button>         */}
                            </td>
                        </tr>
                    )   
                    :
                    <tr>
                        <td colSpan={7}>No Donation</td>
                    </tr>
                }    
            </tbody>
        </table>
    </div>
    </>
  )
}

export default UHome
