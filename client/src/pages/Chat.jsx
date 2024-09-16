import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Users from "../components/Users";
import { setContacts } from "../states/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import Welcome from "../components/Welcome";

export default function Chat() {
  const host = "http://localhost:5000";
  const allUserRoute = `${host}/api/auth/allUsers`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef();

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem("user-auth")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user-auth")));
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleContacts = async () => {
      if (currentUser) {
        const userContacts = await axios.get(
          `${allUserRoute}/${currentUser._id}`
        );
        dispatch(setContacts(userContacts.data));
      }
    };
    handleContacts();
  }, [allUserRoute, currentUser, dispatch]);

  const handleCurrentChat = (contact) => {
    setCurrentChat(contact);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Users handleCurrentChat={handleCurrentChat} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #142d4c;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #385170;
    display: grid;
    border-radius: 20px;

    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 691px) and (max-width: 720px) {
      grid-template-columns: 40% 60%;
    }
    @media screen and (min-width: 480px) and (max-width: 690px) {
      grid-template-columns: 45% 55%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 50% 50%;
    }
  }
`;
