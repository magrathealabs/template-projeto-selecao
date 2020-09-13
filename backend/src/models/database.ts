import mongoose from 'mongoose';

mongoose.connect(String(process.env.DB_URL), {useNewUrlParser: true});

const db = mongoose.connection;

export default db;
