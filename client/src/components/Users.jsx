import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Users({ handleCurrentChat }) {
  const [userName, setUserName] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const contacts = useSelector((state) => state.contacts);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem("user-auth")) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem("user-auth"));
        setUserName(data.username);
      }
    };
    getUser();
  }, [navigate]);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    handleCurrentChat(contact);
  };

  return (
    <>
      <Container>
        <div className="name">
          <h1>Meet ur Match</h1>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(contact, index)}
              >
                <div className="icon">{contact.username.charAt(0)}</div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="icon">{userName.charAt(0)}</div>
          <div className="username">
            <h3>{userName}</h3>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #a2a8d3;
  border-radius: 20px 0px 0px 20px;

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #cbf078;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #e7eaf6;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .icon {
        background-color: #66bfbf;
        border-radius: 50% 50%;
        height: 35px;
        width: 35px;
        font-size: 25px;
        text-align: center;
        line-height: 32px;
      }
    }
    .selected {
      background-color: #f95959;
    }
  }

  .current-user {
    background-color: #a2a8d3;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    .icon {
      background-color: #66bfbf;
      border-radius: 50% 50%;
      height: 35px;
      width: 35px;
      font-size: 30px;
      text-align: center;
      line-height: 32px;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
