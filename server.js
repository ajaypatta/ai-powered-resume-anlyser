const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/resumes', resumeRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
