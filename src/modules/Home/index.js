import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch()
  let navigate = useNavigate

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token if available
          // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        // Add credentials: 'include' if you are using cookies for authentication
        // credentials: 'include',
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const onLogout = () => {
    dispatch({ type: "Auth/SET_TOKEN", payload: "" });
    navigate("/")
  }

  return (
    <>
      {userData && (
        <div class="card" style={{ width: '18rem' }}>
          <img src={`data:${userData.profilePicture.contentType};base64,${userData.profilePicture.data}`} class="card-img-top" alt="Profile" />
          <div class="card-body">
            <h5 class="card-title">{userData.user.name}</h5>
            <p class="card-text">{userData.user.email}</p>
          </div>
        </div>

      )}
      <button className="btn btn-danger" onClick={onLogout} type="submit">Logout</button>


    </>
  );
};

export default Home;
