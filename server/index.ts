import { config } from 'dotenv';
config();

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import model from './gemini.config';

const app = express();

const server = createServer(app);

const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/generate', async (req, res): Promise<any> => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const response = await model.generateContent(text);
  console.log(response.response.text());
  return res.json({response: response.response.text()});
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});