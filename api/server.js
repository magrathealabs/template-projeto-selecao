const express = require('express');
const configureRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', configureRoutes);
// app.use((req, res) => {
//   res.send(404);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server sarted on port ${PORT}`));
