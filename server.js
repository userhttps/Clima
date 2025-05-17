const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro na conexão com MongoDB:', err));

// Modelos
const User = require('./models/User');
const ForumPost = require('./models/ForumPost');
const CarbonFootprint = require('./models/CarbonFootprint');

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Rotas da API
// API de Clima
app.get('/api/clima', async (req, res) => {
  try {
    const cidade = req.query.cidade || "São Paulo";
    
    // Cache de 10 minutos para evitar muitas chamadas à API
    const cacheKey = `weather_${cidade}`;
    const cached = await Cache.findOne({ key: cacheKey });
    
    if (cached && (Date.now() - cached.createdAt.getTime()) < 600000) {
      return res.json(cached.data);
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}&lang=pt_br`
    );

    const weatherData = {
      temperatura: Math.round(response.data.main.temp),
      descricao: response.data.weather[0].description,
      icone: response.data.weather[0].icon,
      umidade: response.data.main.humidity,
      vento: (response.data.wind.speed * 3.6).toFixed(1), // m/s para km/h
    };

    // Salvar no cache
    await Cache.findOneAndUpdate(
      { key: cacheKey },
      { data: weatherData, createdAt: new Date() },
      { upsert: true }
    );

    res.json(weatherData);
  } catch (error) {
    console.error("Erro na API de clima:", error);
    res.status(500).json({ erro: "Não foi possível obter dados do clima" });
  }
});

// API de Qualidade do Ar
app.get('/api/qualidade-ar', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    
    res.json({
      qualidade: response.data.list[0].main.aqi,
      poluentes: response.data.list[0].components
    });
  } catch (error) {
    console.error("Erro na API de qualidade do ar:", error);
    res.status(500).json({ erro: "Não foi possível obter dados de qualidade do ar" });
  }
});

// Rotas de autenticação (registro, login, etc.)
// Rotas do fórum (CRUD de posts)
// Rotas de histórico de pegada de carbono

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});