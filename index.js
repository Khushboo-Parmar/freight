
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const userRouter = require('./route/userRoutes');

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


app.use('/api', userRouter);


app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
