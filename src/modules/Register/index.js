import React, { useState } from 'react';
import './style.css';
import assets from '../../utils/assets';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', profilePicture: null });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', credentials.name);
            formData.append('email', credentials.email);
            formData.append('password', credentials.password);
            formData.append('profilePicture', credentials.profilePicture);

            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                body: formData,
            });

            const json = await response.json();
            console.log('json', json);
            if (json.success) {
                dispatch({ type: "Auth/SET_TOKEN", payload: json.authToken });
                navigate('/');
                console.log('Account Created Successfully');
            } else {
                alert('Error Occurred While Creating the Account');
            }
        } catch (error) {
            alert('Invalid Credentials', error);
        }
    };

    const onChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setCredentials({ ...credentials, profilePicture: e.target.files[0] });
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="parent-container">
            <main className="form-signin m-auto inner-container">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={assets.logoImg} alt="" width="122" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            minLength={5}
                            className="form-control"
                            id="floatingInputName"
                            placeholder="Enter Your Name"
                        />
                        <label htmlFor="floatingInputName">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            minLength={5}
                            className="form-control"
                            id="floatingInputEmail"
                            placeholder="Enter email address"
                        />
                        <label htmlFor="floatingInputEmail">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            minLength={5}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Enter password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload Profile Picture</label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="profilePicture"
                            onChange={onChange}
                        />
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign in
                    </button>
                    <Link to='/'>   <button className="btn btn-success w-10 my-3 " type="submit"> LogIN Page
                 
                </button> </Link>
                   

                    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
                </form>
            </main>
        </div>
    );
};

export default Register;
