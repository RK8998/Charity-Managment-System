import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddCategory() {

    const navigate = useNavigate();
    const gotoCategory = () => navigate('../Category');
    const gotoAdminLogin = () => navigate("/admin");

    const [category,setcategory] = useState("");
    const [details,setDetails] = useState("");

    const addcategory = (e) => {
        e.preventDefault();
        const data = {
            "category":category,
            "details":details
        }
        axios.post('http://localhost:3001/addcategory',data)
        .then((res) => {
            console.log(res.data);
            if(res.data.status === 200){
                alert(res.data.msg);
                gotoCategory();
            }
            else{
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
            <Link to={'../Category'} className='btn btn-outline-secondary'><i className="fa-solid fa-circle-chevron-left"></i></Link>

            <div className="mt-3">
                <div className="row">
                    <div className="col-6 col-lg-6 col-md-6">
                        <form onSubmit={addcategory}>
                            <div className="form-group">
                                <label><b>Category : </b></label>
                                <input type={"text"} name="category" className='form-control' required placeholder='Enter Your Category'
                                onChange={(e) => setcategory(e.target.value)} autoComplete="off"/>
                                <br/>
                            </div>
                            <div className="form-group">
                                <label>Details : </label>
                                <textarea  name="details" className='form-control' onChange={(e) => setDetails(e.target.value)} 
                                rows="4">

                                </textarea>
                                <br/>
                            </div>
                            <div className="form-group">
                                <input type={"submit"} name="addMethod" value={"Add Category"} className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>   
    </>
  )
}

export default AddCategory
