import { styled } from "styled-components";
import { BsSend } from "react-icons/bs";
import { useState } from "react";
import dayjs from "dayjs";
import { ChatItem, Question } from "./types";
import apiGepeto from "./services/apiGepeto";
import ChatElement from "./components/ChatElement";

function App() {
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [form, setForm] = useState<{ question: string }>({ question: "" });
  const [loading, setLoading] = useState<boolean>(false);

  function listenKeyDown(e: React.KeyboardEvent) {
    if (loading) return;
    if (e.ctrlKey && e.key === "Enter") {
      setForm({ question: form.question + "\n" });
    }
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      submitQuestion();
    }
  }

  async function submitQuestion() {
    if (!form.question || form.question.length === 0 || loading) return;

    setLoading(true);

    const questionDate = dayjs().format("DD/MM/YYYY HH:MM");

    const protocol: Question = {
      question: form.question,
      questionDate,
    };
    setForm({ question: "" });
    const updateChat = [...chat, protocol];
    setChat(updateChat);

    try {
      const { data } = await apiGepeto.sendQuestion(form.question);
      const answerProtocol = {
        answer: data.answer,
        answerDate: dayjs(data.answeredAt).format("DD/MM/YYYY HH:MM"),
      };

      setChat([...updateChat, answerProtocol]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <MainFrame>
      {chat.map((e: ChatItem, index: number) => (
        <ChatElement key={index} chatItem={e} />
      ))}

      <Loading loading={loading ? "150px" : "0px"}>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHExbHc2aXBnZThiMmM1MjNuOHdkYW4zemM4MWo4MG91d2F5NTJmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s3ZQU8rdnv9oIlzsaJ/giphy.gif" />
      </Loading>

      <Footer>
        <textarea
          value={form.question}
          onChange={(e) => setForm({ question: e.target.value })}
          onKeyDown={listenKeyDown}
          disabled={loading}
        />
        <SendIcon>
          <BsSend size={16} onClick={submitQuestion} />
        </SendIcon>
      </Footer>
    </MainFrame>
  );
}
const MainFrame = styled.main`
  width: 100vw;
  height: 100vh;
  background: #444654;
  color: white;
  font-family: "Segoe UI", Arial, sans-serif;
  size: 16px;
  line-height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-itens: center;
`;

const Footer = styled.div`
  padding: 24px 48px;
  background: #343541;
  position: relative;
  textarea {
    &:disabled {
      filter: brightness(85%);
    }
    color: white;
    font-family: "Segoe UI", Arial, sans-serif;
    size: 16px;
    line-height: 28px;
    background: #444654;
    border: none;
    margin: 0px;
    width: 100%;
    border-radius: 6px;
    min-height: 50px;
    padding-top: 5px;
    resize: none;
    padding-right: 20px;
    &::-webkit-scrollbar {
      width: 10px;
      background: #8888880;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #4d4848cc;
      cursor: pointer;
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background: #f1f1f154;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #55555583;
    }
  }
`;

const SendIcon = styled.div`
  position: absolute;
  right: 48px;
  top: 44px;
  cursor: pointer;
`;

const Loading = styled.div<{ loading: string }>`
  display: flex;
  justify-content: center;
  transition: height 1500ms;
  height: ${(props) => props.loading};
  margin-bottom: 10px;
  overflow: hidden;
  img {
    min-width: 150px;
    min-height: 150px;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

export default App;
