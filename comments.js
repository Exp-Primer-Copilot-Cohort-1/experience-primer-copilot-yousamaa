// Create web server
// POST request to create new comment
// GET request to get all comments

// Load express module
const express = require('express');
// Load body-parser module
const bodyParser = require('body-parser');
// Load path module
const path = require('path');
// Load express-handlebars module
const exphbs = require('express-handlebars');
// Load mongoose module
const mongoose = require('mongoose');

// Load routes
const comments = require('./routes/comments');

// Create express app
const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/comments', comments);

// Set port
const port = process.env.PORT || 5000;

// Create web server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});