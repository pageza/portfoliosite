const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const posts = require('./routes/posts');  // routes for your posts

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogSite', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];  // Basic <token>
      const [username, password] = Buffer.from(token, 'base64').toString().split(':');
      
      // Replace 'user' and 'pass' with your actual username and password
      if (username === 'user' && password === 'pass') {
        return next();
      }
    }
  
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this as you like
    res.status(401).send('Authentication required.'); // custom message
}

app.use('/api/posts', posts);  // Use the posts routes for requests to /posts

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
