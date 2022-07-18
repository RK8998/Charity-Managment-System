import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Category() {

    const [cat,setCat] = useState([]);
    const navigate = useNavigate();
    const gotoAdminLogin = () => navigate("/admin");

    const fetchCategory = () => {
        axios.get('http://localhost:3001/fetchCategory')
        .then((res) => {
            console.log(res.data);
            setCat(res.data);
        }).catch((error) => {
            console.log(error);
        });  
    }

    useEffect(()=>{
        if(sessionStorage.getItem("AdminSession") === "null"){
            gotoAdminLogin();
        }
        fetchCategory();
    },[]);

    const deleteCategory = (id) => {
        const temp = window.confirm("Are You Sure ? ");
        if(temp){
            axios.delete('http://localhost:3001/deleteCategory/' + id)
            .then(res => {
                console.log(res.data);
                fetchCategory();
            }).catch(error => {
                console.log(error);
            });
        }
    }

  return (
    <>
        <div className="container mt-4">
            <h2>Category</h2>
            <Link to="add_Category" className='btn btn-outline-success mt-3'><i className="fa-solid fa-circle-plus"></i></Link>

            <table className="table table-striped text-center mt-5">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Category</th>
                        <th scope="col">Details</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                     {
                         cat.length > 0 ?
                         cat.map((item,id) =>
                            <tr>
                                <td>{id+1}</td>
                                <td>{item.category}</td>
                                <td width={400}>{item.details}</td>
                                <td>
                                <button type="button" className="btn btn-danger" onClick={(e) => deleteCategory(item._id)}><i className="fa-solid fa-trash-arrow-up"></i></button>        
                                </td>
                            </tr>
                         )
                         :
                         <tr>
                             <td colSpan={4}>No Category</td>
                         </tr>
                     }   
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Category
