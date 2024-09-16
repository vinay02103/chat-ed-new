import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogIn } from "../states/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
  const host = "http://localhost:5000";
  const loginRoute = `${host}/api/auth/login`;

  const logIn = useSelector((state) => state.logIn);

  const password = logIn.password;
  const email = logIn.email;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-auth")) {
      navigate("/");
    }
  });

  const validateForm = () => {
    if (email === "") {
      toast.error("Please enter a valid email");
      return false;
    }

    if (password === "") {
      toast.error("Please enter a valid password");
      return false;
    }

    return true;
  };

  const handleEvent = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const user = await axios.post(loginRoute, {
        email: email,
        password: password,
      });

      if (user.data.status === false) {
        toast.error(user.data.msg);
      } else {
        localStorage.setItem("user-auth", JSON.stringify(user.data));
        navigate("/");
      }
    }
  };

  const onChange = (event) => {
    dispatch(setLogIn({ ...logIn, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <Form>
        <form action="" onSubmit={(e) => handleEvent(e)}>
          <h1>Log In</h1>
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

          <button type="submit">Log me In</button>
          <span>
            don't have an account? <Link to="/register">Register</Link>
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
