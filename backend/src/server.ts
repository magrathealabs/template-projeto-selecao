import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3333;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Back-end started in ${port} port!`);
});
