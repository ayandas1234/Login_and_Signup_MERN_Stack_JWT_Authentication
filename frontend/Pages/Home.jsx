
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Utils/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [logInUser, setlogInUser] = useState();
  const [products, setproducts] = useState([]);

  const navigate = useNavigate();

  // set the logInUser as the loggediin user name which key value is loggedInUser
  useEffect(() => {
    setlogInUser(localStorage.getItem("loggedInUser"));

  }, [])

  const handleLogout = () => {
    // when loggedout remove both the jwtToken and user name saved as cookies from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");

    // After logout go back to login page
    setTimeout(() => {
      navigate("/login");
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          "Authorization": localStorage.getItem("token") // fetch jwtToken from localstorage using key name
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setproducts(result); // update products state using setproducts
    } catch (err) {
      handleError(err);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div>

      <h1>Welcome {logInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item, index) => (
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>

      <ToastContainer />
    </div>
  )
}

export default Home

// watch from 01:17:48