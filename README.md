# Gepeto
Have you ever needed assistance for your personal projects or to keep your company's information in a secure environment?
Gepeto is your private virtual assistant, powered by the advanced natural language model LLM. Streamlining human-machine interaction, Gepeto is the key to unlocking the potential of artificial intelligence in your daily life.

## About
Gepeto is a fullstack project that uses LLaMA 2, an open-source LLM (Large Language Model) from Meta, designed to help you in your daily life with trained language models for different contexts and situations.

## Technologies
The following tools and frameworks were used in the construction of the project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white'>
</p>

## How to Setup
1. Clone this repository.
<details>
  <summary>2. Backend Setup</summary>
  2.1 Open a terminal on ./gepeto-express
  2.2 Install dependencies
  
```bash
  npm i
```
2.3 Download the public model from [Huggingface](https://huggingface.co/TheBloke/GreenNodeLM-7B-v4leo-GGUF/blob/main/greennodelm-7b-v4leo.Q4_K_M.gguf) for general purposes

2.4 Create the folder models on your backend root folder(gepeto-express) and move the model to ./gepeto-express/models

The folder structure should be:
```
gepeto-express/
│
├── models/
│└── greennodelm-7b-v4leo.Q4_K_M.gguf
│
├── src/
│└── app.js
│
├── package.json
├── .gitignore
└── package-lock.json
```
2.5 Build the backend server with:
```bash
npm run build
npm start
```
</details>

<details>
  <summary>3. Frontend Setup</summary>
  3.1 Open a terminal on ./gepeto-react
  3.2 Install dependencies
  
```bash
  npm i
```
  3.4 Setup the .env file following the .env.example (reminder: the backend will start by default on port 8080)
  
```env
# .env example for running locally:
VITE_REACT_APP_API=http://localhost:8080/
```

  3.5 Run the project using
```bash
npm run dev
```
</details>
