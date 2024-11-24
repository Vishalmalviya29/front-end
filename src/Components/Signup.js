import React, { useState } from "react";
import "../CSS/Signup.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleSubmit = async (e)=> {
    e.preventDefault()
    const { name, email, password } = creds
    const url = 'http://localhost:5000/api/auth/signup'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })

    const data = await response.json()
    console.log(data)

    if(data.success) {
      localStorage.setItem("token", data.authToken)
      navigate('/')
    }
    else {
      alert(data)
    }
  }


  const onChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
   
  };

  return (
    <div className="Maindiv">
      <div className="SignUpDiv">
        <div className="CredsDiv">
          <label>
            <b>Name:</b>
          </label>
          <br></br>
          <input
            type="text"
            name="name"
            className="InputBox"
            onChange={onChange}
          />
        </div>
        <div className="CredsDiv">
          <label>
            <b>Email:</b>
          </label>
          <br></br>
          <input
            type="email"
            name="email"
            className="InputBox"
            onChange={onChange}
          />
        </div>
        <div className="CredsDiv">
          <label>
            <b>Password:</b>
          </label>
          <br></br>
          <input
            type="password"
            name="password"
            className="InputBox"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="ButtonDiv">
        <button onClick={handleSubmit} className="btn-primary">Submit</button>
      </div>
    </div>
  );
}

export default Navbar;
