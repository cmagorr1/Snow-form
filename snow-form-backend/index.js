const express = require('express');
const app = express();
const port = 6000; // or any port you prefer

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});