import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/mentor', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API GROQ:', errorText);
      return res.status(response.status).json({ 
        error: true, 
        message: 'Erro na API GROQ', 
        details: errorText 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro interno:', error);
    return res.status(500).json({ 
      error: true, 
      message: 'Erro interno no servidor',
      details: error.message 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
```

---

### **PASSO 3: Criar arquivo .env**
1. Na **raiz do projeto** (ao lado do `server.js`)
2. Criar arquivo chamado `.env` (com o ponto na frente)
3. Cole dentro:
```
GROQ_API_KEY=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
