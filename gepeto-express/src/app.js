import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health Check");
});

const port = 8080;
app.listen(port, () => console.log(`Server running in port: ${port}`));
