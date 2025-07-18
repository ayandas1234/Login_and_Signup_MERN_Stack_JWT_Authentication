import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils/utils';

const Signup = () => {
    const [signupInfo, setsignupInfo] = useState({ name: "", email: "", password: "" });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // prevent multiple submitting

        const { name, email, password } = signupInfo; // fetchig name, email, password from signupInfo which is a useState

        // if (!name || !email || !password) {
        //     return handleError("name, email And password are required")
        // }

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isStrongPassword = (password) => password.length >= 8;

        if (!name || typeof name !== 'string' || !isNaN(name) || name.trim().length < 2) {
            return handleError("Name is required and should be at least 2 characters long");
        }

        if (!email || !isValidEmail(email)) {
            return handleError("A valid email is required");
        }

        if (!password || !isStrongPassword(password)) {
            return handleError("Password is required and must be at least 8 characters long");
        }

        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, { // call the signup api for submitting the form
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message); // show success toast
                setTimeout(() => {
                    navigate("/login"); // redirect to login page
                }, 1000)
            }else if(error){
                const details = error?.details[0].message; // This is using optional chaining (?.) to safely access nested values in the error object.
                // ?.	Optional chaining — checks if error exists before accessing details

                handleError(details);
            }else if(!success){ // incase success become false then it will run
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target; // name and value are the properties of e.target name represent each input field name value like name: email, name: password or name: name and value holds the user input data

        console.log(name, value); // this will print the user data with key value pairs like [name: value] -->> email : ayana1234@gmail.com

        const copysignupInfo = { ...signupInfo }; //This line uses the spread operator to shallow copy the loginInfo object.

        copysignupInfo[name] = value; // This line dynamically updates the key in the copied object.
        //name is extracted from e.target.name — it's the name attribute of the input field that triggered the event.

        //value is extracted from e.target.value — it's the current user-typed value in that field.

        setsignupInfo(copysignupInfo); //Updates React state with the modified copy	
    };

    console.log("loginfo --->> ", signupInfo);

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form action="" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter Your Name..."
                        value={signupInfo.name} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email..."
                        value={signupInfo.email} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter Your Password..."
                        value={signupInfo.password} />
                </div>

                <button type="submit">SignUp</button>

                <span>Already have an Account? <Link to="/login">Login</Link></span>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Signup;

// red apple
// redsoft technologies