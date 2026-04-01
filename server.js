const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_KEY;

app.post('/api/caine', async (req, res) => {
    const { messages } = req.body;
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are Caine from The Amazing Digital Circus.' },
                ...messages
            ]
        })
    });
    
    const data = await response.json();
    res.json({ message: data.choices[0].message.content, commands: [] });
});

app.get('/', (req, res) => res.send('Caine AI Running'));
app.listen(process.env.PORT || 3000);
