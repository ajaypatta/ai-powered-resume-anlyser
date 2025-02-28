const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    filename: String,
    content: String,
    analysis: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
