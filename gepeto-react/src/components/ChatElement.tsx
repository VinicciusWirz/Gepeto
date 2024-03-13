// @ts-ignore
import gepeto from "../assets/gepeto.png";
// @ts-ignore
import user from "../assets/user.png";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { ChatItem } from "../types";

function ChatElement(props: Readonly<{ chatItem: ChatItem }>) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const textRef = useRef<HTMLDivElement>(null);
  const content: { text: string; date: string; background: string | false } = {
    text: "",
    date: props.chatItem.date,
    background: false,
  };

  if ("question" in props.chatItem) {
    content.text = props.chatItem.question;
    content.background = "#343541";
  } else {
    content.text = props.chatItem.answer;
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    let currentIndex = 0;
    const intervalLetters = 20;

    const intervalId = setInterval(() => {
      if (currentIndex <= content.text.length) {
        setText(content.text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        if (textRef.current) {
          textRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    }, intervalLetters);
    return () => clearInterval(intervalId);
  }, [content.text]);

  return (
    <Frame
      background={content.background}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={textRef}
    >
      <ImgContainer src={content.background ? user : gepeto}></ImgContainer>
      <section>
        <p>{text}</p>
      </section>
      <RateContainer>
        <Icons>
          <FiThumbsUp />
          <FiThumbsDown />
        </Icons>
        <DateContainer hover={isHover}>{content.date}</DateContainer>
      </RateContainer>
    </Frame>
  );
}

const Frame = styled.div<{ background: string | false }>`
  padding: 24px 48px;
  background: ${(props) => props.background};
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

const DateContainer = styled.div<{ hover: boolean }>`
  font-size: 12px;
  display: ${(props) => (props.hover ? "flex" : "none")};
  flex-direction: column;
  line-height: 16px;
  margin-top: 5px;
`;

export default ChatElement;
