// app.js or server.js
const express = require('express');
const authenticateUser = require('../../Middleware/authenticateUser');

const app = express();
app.post('/protected-route', authenticateUser, (req, res) => {
  const userId = req.user.id;

});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
