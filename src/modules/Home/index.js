import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const { token } = useSelector((state) => state.AuthSlice);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    getUsers();
  }, []);

  const uploadImage = async() =>{
    const res= await fetch('http://localhost:5000/api/profile/photo',{
      method: 'POST',
      headers:{
        authToken:`Bearer ${token}` 
      },
      body: userData.testImage
    })
  }

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getuser', {
        method: 'GET',
        headers: {
          'contentType': 'application/json',
          'auth-token': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log("Data Uplod", userData);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const onLogout = () => {
    dispatch({ type: 'Auth/SET_TOKEN', payload: '' });
  };

  return (
    <>
      <div className="my-5 d-flex justify-content-center align-items-center">
        {userData && (
          <div className="card text-center" style={{ width: '18rem' }}>
            {userData.profilePicture && (
              <img
                src={`data:${userData.profilePicture.contentType};base64,${userData.profilePicture.data}`}
                className="card-img-top"
                style={{ width: '18rem' }}
                alt="Profile"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{userData.user.name}</h5>
              <p className="card-text">{userData.user.email}</p>
            </div>
          </div>
        )}
      </div>

      
      <button className="btn btn-danger" onClick={onLogout} type="button">
        Logout
      </button>

      {/* <button className="btn btn-danger my-4" type="button">
        Upload Image
      </button> */}


    </>
  );
};

export default Home;
