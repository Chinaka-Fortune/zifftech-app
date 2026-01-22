import React from 'react'
import "../formFolder/form.css"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const LogIn = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs)
    }
    return (
        <div className="container-fluid formpageDiv">
            <form onSubmit={handleSubmit} className="formpage fw-bold p-5 rounded-2">
                {/* <div className="mb-3" */}
                <h5 className="fw-bold">Get started</h5>
                <label for="exampleInputEmail1" className="form-label">First Name
                    <input
                        type="text"
                        name="fName"
                        value={inputs.fName || ""}
                        onChange={handleChange}
                        className="form-control"
                    />
                </label>

                <label for="exampleInputEmail1" className="form-label">Last Name
                    <input
                        type="text"
                        name="lName"
                        value={inputs.lName || ""}
                        onChange={handleChange}
                        className="form-control"
                    />
                </label>
                <label for="exampleInputEmail1" className="form-label">Email
                    <input
                        type="text"
                        value={inputs.email || ""}
                        name="email"
                        onChange={handleChange}
                        className="form-control"
                    />
                </label>
                <label for="exampleInputEmail1" className="form-label">Phone No
                    <input
                        type="number"
                        value={inputs.number || ""}
                        name="phoneno"
                        onChange={handleChange}
                        className="form-control"
                    />
                </label>

                {/* </div> */}
                <NavLink to='/signin' type="submit" className="btn btn-success w-100 text-center">Sign Up
                </NavLink>
            </form>

        </div>
    )
}

export default LogIn
