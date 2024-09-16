import React, { useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handlePicker = (event) => {
    setShowEmoji(!showEmoji);
  };

  const handleEmoji = (emojiCode, event) => {
    let message = msg;
    console.log(emojiCode);
    message += emojiCode.emoji;
    setMsg(message);
  };

  return (
    <Container>
      <div className="emoji-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handlePicker} />
          {showEmoji && (
            <EmojiPicker
              onEmojiClick={handleEmoji}
              height={300}
              width={300}
              previewConfig={{ showPreview: false }}
              theme={Theme.AUTO}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Send ur love.."
          onChange={(event) => setMsg(event.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  border-radius: 0px 0px 20px 0px;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .emoji-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        position: relative;
      }
      .EmojiPickerReact {
        position: absolute;
        top: 225px;
        box-shadow: 0 5px 10px #9a86f3;
        --epr-emoji-size: 25px;
        --epr-category-navigation-button-size: 25px;
        --epr-category-padding: 0 5px;
        --epr-header-padding: 7px 7px;
        --epr-category-label-height: 30px;
        --epr-category-label-padding: 0 5px;
        .epr-body::-webkit-scrollbar {
          width: 5px;
          &-thumb {
            background-color: #cbf078;
            border-radius: 1rem;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    position: relative;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 14px;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 0.46rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1.5rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
