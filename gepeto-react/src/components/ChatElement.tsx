// @ts-ignore
import gepeto from "../assets/gepeto.png";
// @ts-ignore
import user from "../assets/user.png";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { ChatItem } from "../types";

function ChatElement(
  props: Readonly<{
    chatItem: ChatItem;
  }>
) {
  const { chatItem } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const content: { text: string; date: string; background: string } = {
    text: "",
    date: chatItem.date,
    background: "",
  };
  const chatRef = useRef<HTMLDivElement>(null);

  if ("question" in chatItem) {
    content.text = chatItem.question;
    content.background = "#343541";
  } else {
    content.text = chatItem.answer;
    content.background = "transparent";
  }

  useEffect(() => {
    let currentIndex = 0;
    const intervalLetters = 20;
    if ("question" in chatItem) {
      setText(content.text);
      return;
    }

    const intervalId = setInterval(() => {
      if (currentIndex <= content.text.length) {
        setText(content.text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        if (chatRef.current) {
          chatRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, intervalLetters);
    return () => clearInterval(intervalId);
  }, [content.text]);

  return (
    <Frame
      frameBackground={content.background}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={chatRef}
    >
      <ImgContainer
        src={content.background !== "transparent" ? user : gepeto}
      ></ImgContainer>
      <section>
        <p>
          {text.split(/\\n/i).map((line, index) => (
            <React.Fragment key={`${index}${line}`}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </section>
      <RateContainer>
        <Icons>
          <FiThumbsUp />
          <FiThumbsDown />
        </Icons>
        <DateContainer isHovering={isHover}>{content.date}</DateContainer>
      </RateContainer>
    </Frame>
  );
}

const Frame = styled.div<{ frameBackground: string | false }>`
  padding: 24px 48px;
  background: ${(props) => props.frameBackground};
  display: flex;
  justify-content: space-between;
  width: 100%;
  section {
    width: 100%;
    display: inline;
    text-align: justify;
    p {
      text-align: justify;
      display: inline;
      text-wrap: wrap;
      width: 100%;
      word-break: break-word;
      white-space: pre-wrap;
    }
  }
`;

const ImgContainer = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  margin-right: 24px;
`;

const RateContainer = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  width: 82px;
  min-height: 60px;
`;

const Icons = styled.div`
  display: flex;
  font-size: 16px;
  svg:first-child {
    margin-right: 12px;
  }
  svg {
    cursor: pointer;
  }
`;

const DateContainer = styled.div<{ isHovering: boolean }>`
  font-size: 12px;
  display: ${(props) => (props.isHovering ? "flex" : "none")};
  flex-direction: column;
  line-height: 16px;
  margin-top: 5px;
`;

export default ChatElement;
