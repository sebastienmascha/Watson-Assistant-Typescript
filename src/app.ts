import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import { Message } from './models';
import { Watson } from './services';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const assistant = new Watson();

app.get('/api/session', (_, res, next) => {

  assistant.createService()
    .createSession()
    .then(response => res.status(200).json(response))
    .catch(next);
});

app.post('/api/message', (req, res, next) => {
  const body: Message = req.body;

  assistant.sendMessage(body.input.text)
    .then(response => res.status(200).json(response))
    .catch(next);
});

export default app;
