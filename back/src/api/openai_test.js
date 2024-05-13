const OpenAI = require("openai");
require("dotenv").config();
const express = require('express');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
console.log(req.body)
console.log(message)
    const completion = await openai.chat.completions.create({
      //engine: 'text-davinci-003',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
      stop: '\n',
      model: 'gpt-4-turbo',
    });

    console.log(completion)

    const answer = completion.choices[0].message.content.trim();
    res.json({ response: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;