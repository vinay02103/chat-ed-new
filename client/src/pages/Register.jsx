import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../states/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

export default function Register() {
  const host = "http://localhost:5000";
  const registerRoute = `${host}/api/auth/register`;

  const account = useSelector((state) => state.account);
  const password = account.password;
  const confirmPassword = account.confirmPassword;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);

  const handleInterests = (val) => {
    if (interests.includes(val)) {
      const dup = interests.filter((interest) => interest !== val);
      setInterests(dup);
    } else {
      setInterests([...interests, val]);
    }
  };

  const handleEvent = async (event) => {
    event.preventDefault();
    const sendInterests = interests.at(-1).split(",");

    if (passwordValidation()) {
      const user = await axios.post(registerRoute, {
        username: account.username,
        email: account.email,
        password: password,
        interests: sendInterests,
      });

      if (user.data) {
        delete user.data.interests;
        localStorage.setItem("user-auth", JSON.stringify(user.data));
        navigate("/login");
      }
    }
  };

  const onChange = (event) => {
    dispatch(
      setAccount({ ...account, [event.target.name]: event.target.value })
    );
  };

  const passwordValidation = (event) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const options = [
    { label: "Cricket", value: "cricket" },
    { label: "Singing", value: "singing" },
    { label: "Football", value: "football" },
    { label: "K-pop", value: "k-pop" },
    { label: "Dancing", value: "dancing" },
    { label: "Tik-tok", value: "tik-tok" },
  ];

  return (
    <>
      <Form>
        <form action="" onSubmit={(e) => handleEvent(e)}>
          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Choose your alias"
            name="username"
            onChange={(event) => onChange(event)}
          />
          <input
            type="email"
            placeholder="Enter email address"
            name="email"
            onChange={(event) => onChange(event)}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={(event) => onChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(event) => onChange(event)}
          />
          <MultiSelect
            onChange={handleInterests}
            options={options}
            placeholder="Choose ur Interests"
            clearable={false}
          />

          <button type="submit">Patch me In</button>
          <span>
            already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(45deg, #bc666d 0 79.8%, #b9e0e8 80% 100%);

  input::placeholder {
    font-family: Signika Negative, sans-serif;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: #fef1e6;
    padding: 3rem 2rem;
    border-radius: 13px;

    h1 {
      color: #732987;
    }
    input {
      padding: 0.5rem;
      font-family: Signika Negative, sans-serif;
      width: 90%;
      border-radius: 10px;
      border: none;

      &.focus {
      }
    }
    .msl-vars {
      --menu-max-height: 150px;
      --active-menu-background: #a7b9c4;
    }
    button {
      width: 60%;
      padding: 0.2rem;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      background-color: #305be3;
    }
  }
`;
