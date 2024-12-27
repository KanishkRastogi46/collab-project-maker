import { config } from 'dotenv';
config();

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from "morgan";

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});