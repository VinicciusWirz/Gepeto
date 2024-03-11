import { styled } from "styled-components";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { BsSend } from "react-icons/bs";
import gepeto from "./assets/gepeto.png";
import user from "./assets/user.png";

function App() {
  return (
    <MainFrame>
      <QuestionFrame>
        <ImgContainer src={user}></ImgContainer>
        <section>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </section>
        <RateContainer>
          <FiThumbsUp />
          <FiThumbsDown />
        </RateContainer>
      </QuestionFrame>
      <AnswerFrame>
        <ImgContainer src={gepeto}></ImgContainer>
        <section>sim</section>
        <RateContainer>
          <FiThumbsUp />
          <FiThumbsDown />
        </RateContainer>
      </AnswerFrame>
      <Footer>
        <textarea />
        <SendIcon>
          <BsSend size={16} />
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

const QuestionFrame = styled.div`
  padding: 24px 48px;
  background: #343541;
  display: flex;
  justify-content: space-between;
  section {
    width: 100%;
  }
`;

const AnswerFrame = styled.div`
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  section {
    width: 100%;
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
  svg:first-child {
    margin-right: 12px;
  }
  svg {
    cursor: pointer;
  }
`;

const Footer = styled.div`
  padding: 24px 48px;
  background: #343541;
  position: relative;
  textarea {
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

export default App;
