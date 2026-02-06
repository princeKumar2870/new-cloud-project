const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRoutes')

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter)

app.get('/', (req, res) => {
    res.json({ message: "Cloud Hospital API is running..." });
});

module.exports = app;