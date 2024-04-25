import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const { token } = useSelector((state) => state.AuthSlice);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':`Bearer ${token}`,
        },
       
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const onLogout = () => {
    dispatch({ type: "Auth/SET_TOKEN", payload: "" });
  }

  return (
    <>
    <div className=' my-5 d-flex justify-content-center align-items-center'>
      {userData && (
        
        <div class="card text-center" style={{ width: '18rem' }}>
          <img src={`data:${userData?.profilePicture?.contentType};base64,${userData?.profilePicture?.data}`} class="card-img-top" alt="Profile" />
          <div class="card-body">
            <h5 class="card-title">{userData?.user?.name}</h5>
            <p class="card-text">{userData?.user?.email}</p>
          </div>
        </div>

      )}


    </div>
    <button className="btn btn-danger" onClick={onLogout} type="submit">Logout</button>

    </>
  );
};

export default Home;
