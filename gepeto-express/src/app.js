import express from "express";
import cors from "cors";
import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const newDir = __dirname.substring(0, __dirname.length - 3);

const model = new LlamaModel({
  modelPath: path.join(newDir, "models", "greennodelm-7b-v4leo.Q4_K_M.gguf"),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({ context });

app.post("/", async (req, res) => {
  const question = req.body.question;
  if (!question || question.length === 0) {
    res.status().send("Não pode ser string vazia!");
  }
  const answer = await session.prompt(question);
  const answeredAt = new Date();
  res.send({ question, answer, answeredAt });
});

const port = 8080;
app.listen(port, () => console.log(`Server running in port: ${port}`));
