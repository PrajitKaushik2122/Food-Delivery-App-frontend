import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const {setToken} = useContext(StoreContext);
  const [data,setData] = useState({
    email:'',
    password:''
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
        const response = await fetch(`${BASE_URL}/api/user/login`,{
          method: 'Post',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if(response.status==200){
          const data = await response.json();
          setToken(data.token);
          localStorage.setItem('token',data.token);
          navigate('/home');
        }
        else{
          toast.error("unable to login please try again")
        }
      } catch (error) {
        toast.error("unable to login please try again")
      }
    }


  return (
<div className="container login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-bold fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={onChangeHandler} value={data.emai} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-danger btn-login text-uppercase fw-bold" type="submit">Log
                  in</button>
              </div>
              <div className="mt-4">
                Don't have an account? <Link to='/register' style={{"text-decoration":"none"}}>signUp</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login