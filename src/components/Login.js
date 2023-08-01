import React, { useState } from 'react';
import './styles.css';
import axiosConfig from '../service/axiosConfig.js';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        mobileNo: '',
        password: '',
        roles: 'user',
        firebaseToken: 'ndvgcuydgsuct76d67c',
        location: {
            type: 'Point',
            coordinates: [17.4382139072552, 78.4958441684098],
        },
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosConfig
            .post(`/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data);
                navigate('/dashboard')
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                Mobile Number
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number"
                                aria-label="Mobile Number"
                                aria-describedby="basic-addon1"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">
                                Password
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='submit-btn'>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
