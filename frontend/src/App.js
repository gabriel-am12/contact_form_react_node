import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';


function App() {

  const [name, setName] = useState('')
  const [email, setEmail ] = useState('')
  const [phone, setPhone ] = useState('')
  const [message, setMessage ] = useState('')
  const [file, setFile ] = useState('')
  const [contactList, setContactList] = useState([])

  const submitContact = () => {
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      email: email,
      phone: phone,
      message: message,
      file: file
    });

    setContactList([
      ...contactList,
      { name: name, 
        email: email,
        phone: phone,
        message: message,
        file: file 
      }
    ])

  };

  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        setContactList(response.data)
      });
  }, []);

  return (
   <div className="App">
    <div className="row align-items-center justify-content-center">
      <h2>Contact Us</h2>
    </div>
    <div className="container">
      <form>
          <div className="form-outline mb-4">
            <input
              name="name"
              type="text"
              id="form4Example1"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="form4Example1">Name</label>
          </div>

          <div className="form-outline mb-4">
            <input
              name="email"
              type="email"
              id=""
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input
              name="phone"
              type="number" 
              id="" 
              className="form-control"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="">Phone number</label>
          </div>

          <div className="form-outline mb-4">
            <textarea
              name="message"
              className="form-control" 
              id="" 
              rows="4"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            >
            </textarea>
            <label className="form-label" htmlFor="">Message</label>
          </div>

          <div className="form-outline mb-4">
            <input
              name="file"
              type="file" 
              id=""
              className="form-control"
              onChange={(e) => {
                setFile(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={submitContact}
          >
            Send
          </button>

          <hr/>

          <div className="container">
            <div className="row align-items-center justify-content-center">
              <h2>Saved Contacts</h2>
            </div>
            {contactList.map((val) => {
              return (
              <div className="card">
                <div className="card-body">
                  <h5>{val.name}</h5>
                  <h5>{val.email}</h5>
                  <h5>{val.phone}</h5>
                  <p>{val.message}</p>
                  <p>{val.file}</p>
                </div>
              </div>
              )
            })}
          </div>
      </form>
    </div>
  </div>
  );
}

export default App;
