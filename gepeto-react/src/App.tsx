import { styled } from "styled-components";
import { BsSend } from "react-icons/bs";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { ChatItem, Question } from "./types";
import apiGepeto from "./services/apiGepeto";
import ChatElement from "./components/ChatElement";

function App() {
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [form, setForm] = useState<{ question: string }>({ question: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  function listenKeyDown(e: React.KeyboardEvent) {
    if (loading || !form.question.length || (e.shiftKey && e.key === "Enter"))
      return;

    if (e.key === "Enter" && !e.shiftKey) {
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
      date: questionDate,
    };
    setForm({ question: "" });
    const updateChat = [...chat, protocol];
    setChat(updateChat);

    setTimeout(() => {
      if (loadingRef.current) {
        loadingRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1600);

    try {
      const { data } = await apiGepeto.sendQuestion(form.question);
      const answerProtocol = {
        answer: data.answer,
        date: dayjs(data.answeredAt).format("DD/MM/YYYY HH:MM"),
      };

      setChat([...updateChat, answerProtocol]);
    } catch (error) {
      setChat([
        ...updateChat,
        {
          answer:
            "Algo deu de errado com o servidor, porfavor aguarde um momento",
          date: dayjs().format("DD/MM/YYYY HH:MM"),
        },
      ]);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <MainFrame>
      <ChatHolder>
        {chat.map((e: ChatItem, index: number) => (
          <ChatElement key={`${index} ${e.date}`} chatItem={e} />
        ))}
        <Loading loading={loading ? "150px" : "0px"} ref={loadingRef}>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHExbHc2aXBnZThiMmM1MjNuOHdkYW4zemM4MWo4MG91d2F5NTJmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s3ZQU8rdnv9oIlzsaJ/giphy.gif"
            alt="loading-gif"
          />
        </Loading>
      </ChatHolder>
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
  position: fixed;
  width: 100vw;
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
    resize: none;
    padding: 5px 25px;
    padding-right: 50px;
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
  right: 50px;
  top: 44px;
  cursor: pointer;
  width: 30px;
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

const ChatHolder = styled.div`
  padding-bottom: 110px;
  width: 100%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
