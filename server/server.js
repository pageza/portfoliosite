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

app.use('/api/posts', posts);  // Use the posts routes for requests to /posts

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
