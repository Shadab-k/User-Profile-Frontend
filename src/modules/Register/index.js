import React, { useState } from 'react';
import './style.css';
import assets from '../../utils/assets';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const { token } = useSelector((state) => state.AuthSlice);

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', profilePicture: null });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Upload the profile picture first
            
           
            const formData = new FormData();
        formData.append('name', 'saad');
        formData.append('testImage', credentials.profilePicture);
            console.log("ss",formData)

            const uploadResponse = await fetch('http://localhost:5000/api/profile/photo', {
                method: 'POST',
                
                   
                  
                body: formData
                
            });
            console.log("saad",formData)

            if (!uploadResponse.ok) {
                throw new Error('Image upload failed');
            }else{
                console.log("success",uploadResponse);
            }

            // Once the image is uploaded successfully, proceed with user registration
            // const registerFormData = new FormData();
            // registerFormData.append('name', credentials.name);
            // registerFormData.append('email', credentials.email);
            // registerFormData.append('password', credentials.password);

            const registerFormData={
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }

            console.log("azeem",registerFormData)
            const registerResponse = await axios.post('http://localhost:5000/api/register',{
                ...registerFormData
            })
            console.log("Register Response", registerResponse)
            if (registerResponse.data.success) {
                // User registration successful
                dispatch({ type: "Auth/SET_TOKEN", payload: registerResponse.data.authToken });
                navigate('/');
                console.log('Account Created Successfully');
            }
            else {
                console.log('Unable to register user')
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred:', error.message);
        }
    };


    const onChange = (e) => {
    
            
     
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        
    };
    const onchangePP = (e) => {
      
            console.log(e);
            console.log("sak",e.target.files[0].name);
            setCredentials({ ...credentials, profilePicture: e.target.files[0]});
            console.log("saad",credentials.profilePicture)
       
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
                            onChange={onchangePP}
                        />
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign in
                    </button>
                    <Link to='/'>
                        <button className="btn btn-success w-100 my-3 " type="button">
                            LogIN Page
                        </button>
                    </Link>

                    <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
                </form>
            </main>
        </div>
    );
};

export default Register;
