import React, { useEffect, useState } from 'react'
import { AddOrUpdateUser } from './AddOrUpdateUser';
import { useNavigate } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${apiUrl}`, {
      method: "GET",
    }).then(response => response.json()).then(data => {
      setUsers(data);
    }).catch(error => {
      console.error("Error fetching users:", error);
    })
  }, [users])
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const showPopUp = () => setVisible(true);
  const changeSelectedId = (id) => setSelectedId(id);
  const hidePopUp = () => setVisible(false);
  const hideVisibleUpdatePopUp = () => setSelectedId(null);
  const navigate = useNavigate();
  return (
    <div className='vh-100 d-flex bg-primary justify-content-center align-items-center'>
      {
        visible && <AddOrUpdateUser hidePopUp={hidePopUp} />
      }
      <div className='w-50 bg-white rounded-3 p-4 shadow'>
        <h1 className='text-center'>Members</h1>
        <button className='btn btn-primary' onClick={showPopUp}>Add Member</button>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{user.first_name} </td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td><div>
                      {selectedId === user.id && <AddOrUpdateUser hidePopUp={hideVisibleUpdatePopUp} user={{ ...user }} />}
                      <button className="btn btn-sm btn-success me-1" onClick={() => changeSelectedId(user.id)}>Update</button>
                      <button className="btn btn-sm btn-danger" onClick={() => navigate(`/delete?id=${user.id}`)}>Delete</button>
                    </div></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
