import express from 'express';
import cors from 'cors';
import routes from './routes/router'

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`listening at ${process.env.PORT}`);
});

export default app;