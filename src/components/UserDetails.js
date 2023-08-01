import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from '../service/axiosConfig.js';

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getProfileUrl = `/get/user?id=${id}`;
        axiosConfig
            .get(getProfileUrl)
            .then((result) => {
                setUserData(...result.data.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    return (
        <>
            {userData ? (
                <div>
                    <h1>User Details</h1>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Name
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            name="name"
                            value={userData.name}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon2">
                            Date of Birth
                        </span>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Date of Birth"
                            aria-label="Date of Birth"
                            aria-describedby="basic-addon2"
                            name="dob"
                            value={userData.dob.split('T')[0]}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">
                            Gender
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Gender"
                            aria-label="Gender"
                            aria-describedby="basic-addon3"
                            name="gender"
                            value={userData.gender}
                        />
                    </div>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </>
    );
};

export default UserDetails;