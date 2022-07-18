import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Payment() {

    const [pay,setPay] = useState([]);
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate("/admin");

    const fetchPayments = () => {
        axios.get('http://localhost:3001/fetchPayments')
        .then((res) => {
            console.log(res.data);
            setPay(res.data);
        }).catch((error) => {
            console.log(error);
        });  
    }

    useEffect(() => {
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
        fetchPayments();
    },[]);

    const deletePayment = (id) => {
        const temp = window.confirm("Are You Sure ? ");
        if(temp){
            axios.delete('http://localhost:3001/deletePayment/' + id)
            .then(res => {
                console.log(res.data);
                fetchPayments();
            }).catch(error => {
                console.log(error);
            });
        }
    }
  return (
    <>
        <div className="container mt-4">
            <h2>Payment method</h2>
            <Link to="add_Payment_Method" className='btn btn-outline-success mt-3'><i className="fa-solid fa-circle-plus"></i></Link>
            
            <table className="table table-striped text-center mt-5">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pay.map((item,id) =>
                            <tr>
                                <th>{id+1}</th>
                                <td>{item.payment}</td>
                                <td>
                                    <Link to={`view/${item._id}`} className='btn btn-secondary'><i className="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-danger" onClick={(e) => deletePayment(item._id)}><i className="fa-solid fa-trash-arrow-up"></i></button>        
                                </td>
                            </tr>
                        )   
                    }    
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Payment
