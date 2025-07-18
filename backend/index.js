const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses JSON or URL-encoded data sent in HTTP requests
const cors = require('cors'); //enable Cross-Origin Resource Sharing
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');

const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/', (req, res) => {
//   res.json({
//     message: "Hello World!",
//     mongo: "MongoDB Connected....",
//     server: `Example app listening on port : http://localhost:${port}`
//   });
// })

app.use(bodyParser.json()); // So we can easily read req.body
app.use(cors()); // Allows your frontend (e.g., React app) to access your backend running on a different port.

app.use('/auth', AuthRouter); // Base Router Set-up
app.use('/products', ProductRouter);

app.listen(port, () => {
  console.log(`Example app listening on port : http://localhost:${port}`)
})
