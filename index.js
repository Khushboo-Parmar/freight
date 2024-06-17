
// // after index.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const app = express();
// const userRouter = require('./route/userRoutes')

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// app.use('/api' , userRouter);
// app.use(express.static("public"));

// // app.get('/api/get', (req, res) => {
// //   res.json('Welcome to the homepage!');
// // });

// // app.post('/api/post', (req, res) => {
// //   res.json('Welcome to the homepage! post');
// // });
// app.listen(3000, function () {
//   console.log("Server started on port 3000");
// });

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
