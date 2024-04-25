import React, { useState } from 'react'
import "./style.css"
import assets from '../../utils/assets'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const json = await response.json();
            console.log("json", json);
            if (json.success) {
                // Save token to Redux store
                dispatch({ type: "Auth/SET_TOKEN", payload: json.authToken });
            }

            else {
                alert("Please Login With Correct Credentials");
            }
        }
        catch (error) {
            alert("Invalid Credentials", error);
        }
    }



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const onSignIN = () => {
        navigate('/signin');
    }




    return (
        <>        <div className='parent-container'>
            <main className="form-signin  m-auto inner-container">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={assets.logoImg} alt="" width="122" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please Login in</h1>

                    <div className="form-floating">
                        <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="floatingInput" placeholder="Enter email address" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="floatingPassword" placeholder="Enter password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>


                    <button className="btn btn-primary w-100 my-2 py-2" type="submit">Sign in</button>
                    <button class="d-flex flex-direction-row btn btn-success my-4  w-10" onClick={onSignIN}>Sign Up</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
                </form>
            </main>
        </div>

            <div>




            </div>
        </>

    )
}

export default LoginPage