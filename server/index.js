const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const io = new Server();

// Middlewares
const { logger } = require('./middlewares/logger');
app.use(cors());
app.use(logger('logs.txt'));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    // code for signaling
});

app.get('/', (req, res) => {
    return res.end("WeCall server has started successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`\n\nhttp://localhost:${PORT}\n\n`);
});

io.listen(PORT + 1);