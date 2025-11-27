import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { toast } from 'react-toastify'
const Register = () => {

  const navigate = useNavigate();
  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({
      ...data,
      [name]:value
    }));
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/user/register',{
        method: 'Post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(response.status==201){
        toast.success("Registered successfully, please login");
        navigate('/login')
      }
      else{
        toast.error("error while registering user!")
      }
    } catch (error) {
      toast.error("error while registering user!")
    }
  }

  return (
<div className="container register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-bold fs-5">Sign Up</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" value={data.name} name='name' onChange={onChangeHandler} required/>
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={onChangeHandler} value={data.email} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-danger btn-login text-uppercase fw-bold" type="submit">Register</button>
              </div>
              <div className="mt-4">
                Already have an account? <Link to='/login' style={{"text-decoration":"none"}}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register