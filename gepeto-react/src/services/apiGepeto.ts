import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_API as string;

function sendQuestion(question: string) {
  return axios.post(url, { question });
}

export default { sendQuestion };
