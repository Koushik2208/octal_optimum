import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import axiosConfig from '../service/axiosConfig.js';
import DataTable from 'react-data-table-component';
import { GrFormEdit, GrView } from 'react-icons/gr';
import { Modal, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Date of Birth',
      selector: 'dob',
      sortable: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row) => <GrFormEdit onClick={() => handleEdit(row)} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'View',
      cell: (row) => <GrView onClick={() => handleView(row)} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  const navigate = useNavigate();

  const handleEdit = (row) => {
    setShowModal(true);
    setSelectedRow(row);
    const formattedDate = row.dob.split('T')[0];
    const editedDataWithFormattedDate = {
      ...row,
      dob: formattedDate,
    }
    setEditedData(editedDataWithFormattedDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleView = (row) => {
  navigate(`/user_details/${row.id}`);
};

  const getUsers = () => {
    const getProfileUrl = `/get/user`;
    axiosConfig.get(getProfileUrl)
      .then((result) => {
        console.log(result.data.data, "user data")
        setUserData(result.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  const handleEditUser = () => {
    console.log("edited data:", editedData)
    axiosConfig
      .put(`/user/editUserProfile/${editedData.id}`)
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    getUsers();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DataTable
        title="User List"
        columns={columns}
        data={userData}
        pagination
        striped
        responsive
      />
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                value={editedData.name || ''}
                onChange={handleChange}
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
                value={editedData.dob || ''}
                onChange={handleChange}
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
                value={editedData.gender || ''}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditUser}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
