import React from "react";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLogOut } from "../states/store";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventHandler = async () => {
    localStorage.removeItem("user-auth");
    dispatch(setLogOut());
    navigate("/login");
  };
  return (
    <Button onClick={eventHandler}>
      <TbLogout />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  justify-content: center;
  background-color: #ffb5b5;
`;
