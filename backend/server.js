const express = require('express');
const colors = require('colors')
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
// const connectDB = require('./config/db');
const {  mongoose } = require('mongoose');
const port = process.env.PORT || 8000

// connectDB()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/goals', require('./routes/goalsRoutes.js'));
app.use('/api/users', require("./routes/userRoutes"))

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(port, () => { console.log(`server running on port ${port}`)}) ).catch((err) => console.log(err))

