// NPMs
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Routes
const viewRoutes = require("./routes/routes_html");
const apiRoutes = require("./routes/routes_api");

const app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', viewRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});