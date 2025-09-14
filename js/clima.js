// === CONFIGURAÇÃO ===
// Substitua 'SUA_CHAVE_API' pela sua chave da OpenWeatherMap
const apiKey = '01fbd2117d2c39cfaf15b2a5850d5ad0';

// Elementos do DOM
const cidadeSelect = document.getElementById('cidade-select');
const atualizarBtn = document.getElementById('atualizar-clima');
const cidadeNome = document.getElementById('cidade-nome');
const dataAtual = document.getElementById('data-atual');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');
const airQuality = document.getElementById('air-quality');

// === FUNÇÕES ===

// Busca clima atual da cidade
async function buscarClima(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    atualizarDadosClima(data);
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    alert('Erro ao buscar clima. Verifique a conexão ou a cidade selecionada.');
  }
}

// Atualiza os elementos do DOM com os dados
function atualizarDadosClima(data) {
  const temperatura = Math.round(data.main.temp);
  const descricao = data.weather[0].description;
  const icone = data.weather[0].icon;
  const umidade = data.main.humidity;
  const vento = data.wind.speed;
  const cidade = data.name;

  cidadeNome.textContent = cidade;
  dataAtual.textContent = new Date().toLocaleDateString('pt-BR');
  weatherIcon.src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
  weatherTemp.textContent = temperatura;
  weatherDesc.textContent = descricao;
  weatherHumidity.textContent = `${umidade}%`;
  weatherWind.textContent = `${vento} km/h`;
  airQuality.textContent = '--'; // Aqui você pode integrar com API de qualidade do ar
  airQuality.className = 'aqi-1'; // Classe visual para boa qualidade por padrão
}

// Evento de clique no botão "Atualizar"
atualizarBtn.addEventListener('click', () => {
  const cidade = cidadeSelect.value;
  buscarClima(cidade);
});

// Buscar clima inicial ao carregar
document.addEventListener('DOMContentLoaded', () => {
  buscarClima(cidadeSelect.value);
});
