const express = require('express');
const multer = require('multer');
const Resume = require('/Users/pattaajaynaidu/Desktop/web_d/backend/models/resume');
const OpenAI = require('openai');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        const text = req.file.buffer.toString('utf-8');
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: `Analyze this resume: ${text}` }],
        });

        const analysis = response.choices[0].message.content;
        const newResume = new Resume({ filename: req.file.originalname, content: text, analysis });
        await newResume.save();

        res.json({ message: 'Resume uploaded successfully', analysis });
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing resume' });
    }
});

module.exports = router;
