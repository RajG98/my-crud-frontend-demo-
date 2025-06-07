import React, { useState } from "react";

export const AddOrUpdateUser = ({ hidePopUp, user }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    popUp: {
      background: "white",
      padding: 20,
      borderRadius: 10,
      width: 300,
    },
  };
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const handleAddSubmit = (e) => {
    e.preventDefault();
    // console.log(firstName, lastName, email);
    fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
      }),
    }).then((res) => {
      console.log(res);
    });
    hidePopUp();
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user?.id || "-1",
        first_name: firstName,
        last_name: lastName,
        email: email,
      }),
    }).then((res) => {
      console.log(res);
    });
    hidePopUp();
  };
  return (
    <div style={styles.overlay}>
      <div style={styles.popUp}>
        <h3>Add/Update User</h3>
        <form onSubmit={user ? handleUpdateSubmit : handleAddSubmit}>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            name="firstName"
            id="firstName"
            onChange={(el) => {
              setFirstName(el.target.value);
            }}
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            name="lastName"
            id="lastName"
            onChange={(el) => {
              setLastName(el.target.value);
            }}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            name="email"
            id="email"
            onChange={(el) => {
              setEmail(el.target.value);
            }}
          />
          <br />
          <button type="submit" className="btn btn-sm btn-success mt-2 me-1">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger mt-2"
            onClick={hidePopUp}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
