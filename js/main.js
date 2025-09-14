// Modernizr (js/modernizr.js)
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');

// Main Script
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // Cursor Personalizado
  const cursorSmall = document.querySelector('.cursor--small');
  const cursorLarge = document.querySelector('.cursor--large');
  
  if (cursorSmall && cursorLarge) {
    document.addEventListener('mousemove', function(e) {
      cursorSmall.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorLarge.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Efeito em elementos interativos
    const interactiveElements = ['a', 'button', 'input', 'textarea', '.btn', '.nav-link'];
    
    interactiveElements.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorLarge.style.transform += ' scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursorLarge.style.transform += ' scale(1)';
        });
      });
    });
  }

  // Menu Mobile
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }

  // Scroll Suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fechar menu mobile se aberto
        if (mainNav && mainNav.classList.contains('active')) {
          hamburger.classList.remove('active');
          mainNav.classList.remove('active');
        }
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#48C9B0"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#48C9B0",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Inicializar Gráfico
  initClimateChart();

  // Inicializar Calculadora
  initFootprintCalculator();

  // Inicializar Fórum
  initForum();

  // Botão Voltar ao Topo
  const backToTopBtn = document.querySelector('.backtotop-btn');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });
  }
});

// Gráfico Climático
function initClimateChart() {
  const ctx = document.getElementById('grafico-clima');
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020', '2025', '2030', '2035', '2040', '2045', '2050'],
      datasets: [
        {
          label: 'Temperatura Média (°C)',
          data: [0, 0.5, 1.1, 1.8, 2.5, 3.2, 4.0],
          borderColor: '#2E7D32',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#2E7D32',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Nível do Mar (m)',
          data: [0, 0.1, 0.25, 0.45, 0.7, 1.0, 1.4],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#2196F3',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
              family: 'Montserrat, sans-serif'
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 16,
            family: 'Montserrat, sans-serif'
          },
          bodyFont: {
            size: 14,
            family: 'Montserrat, sans-serif'
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              family: 'Montserrat, sans-serif'
            }
          },
          title: {
            display: true,
            text: 'Valores',
            font: {
              size: 14,
              family: 'Montserrat, sans-serif',
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Montserrat, sans-serif'
            }
          },
          title: {
            display: true,
            text: 'Anos',
            font: {
              size: 14,
              family: 'Montserrat, sans-serif',
              weight: 'bold'
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });

  // Atualizar gráfico com controles
  const deforestationSlider = document.getElementById('desmatamento-range');
  const deforestationValue = document.getElementById('desmatamento-value');
  const co2Slider = document.getElementById('co2-range');
  const co2Value = document.getElementById('co2-value');

  if (deforestationSlider && deforestationValue && co2Slider && co2Value) {
    deforestationSlider.addEventListener('input', function() {
      const value = this.value;
      deforestationValue.textContent = value;
      updateChartData(chart, value, co2Slider.value);
    });

    co2Slider.addEventListener('input', function() {
      const value = this.value;
      co2Value.textContent = value;
      updateChartData(chart, deforestationSlider.value, value);
    });
  }

  function updateChartData(chart, deforestation, co2) {
    const deforestationFactor = deforestation / 100;
    const co2Factor = (co2 - 350) / 650; // Normaliza entre 0 e 1
    
    // Atualiza dados de temperatura
    chart.data.datasets[0].data = [
      0,
      0.5 * (1 + deforestationFactor * 0.5 + co2Factor * 0.3),
      1.1 * (1 + deforestationFactor * 0.6 + co2Factor * 0.4),
      1.8 * (1 + deforestationFactor * 0.7 + co2Factor * 0.5),
      2.5 * (1 + deforestationFactor * 0.8 + co2Factor * 0.6),
      3.2 * (1 + deforestationFactor * 0.9 + co2Factor * 0.7),
      4.0 * (1 + deforestationFactor + co2Factor * 0.8)
    ];
    
    // Atualiza dados do nível do mar
    chart.data.datasets[1].data = [
      0,
      0.1 * (1 + deforestationFactor * 0.3 + co2Factor * 0.2),
      0.25 * (1 + deforestationFactor * 0.4 + co2Factor * 0.3),
      0.45 * (1 + deforestationFactor * 0.5 + co2Factor * 0.4),
      0.7 * (1 + deforestationFactor * 0.6 + co2Factor * 0.5),
      1.0 * (1 + deforestationFactor * 0.7 + co2Factor * 0.6),
      1.4 * (1 + deforestationFactor * 0.8 + co2Factor * 0.7)
    ];
    
    chart.update();
  }
}

// Calculadora de Pegada Ecológica
function initFootprintCalculator() {
  const form = document.getElementById('form-pegada');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const transporte = parseFloat(this.transporte.value) || 0;
    const energia = parseFloat(this.energia.value) || 0;
    const alimentacao = parseFloat(this.alimentacao.value) || 0;
    
    const pegadaTransporte = transporte * 0.21;
    const pegadaEnergia = energia * 0.5;
    const pegadaAlimentacao = alimentacao * 2;
    
    const pegadaTotal = pegadaTransporte + pegadaEnergia + pegadaAlimentacao;
    
    const resultadoElement = document.getElementById('resultado-pegada');
    resultadoElement.innerHTML = `
      <div class="result-header">
        <h3>Sua Pegada Ecológica Anual</h3>
        <div class="result-value">${pegadaTotal.toFixed(2)} <span>tCO₂</span></div>
      </div>
      <div class="result-details">
        <div class="detail">
          <span class="label">Transporte:</span>
          <span class="value">${pegadaTransporte.toFixed(2)} tCO₂</span>
        </div>
        <div class="detail">
          <span class="label">Energia:</span>
          <span class="value">${pegadaEnergia.toFixed(2)} tCO₂</span>
        </div>
        <div class="detail">
          <span class="label">Alimentação:</span>
          <span class="value">${pegadaAlimentacao.toFixed(2)} tCO₂</span>
        </div>
      </div>
      <div class="result-comparison">
        <p>Isso equivale a aproximadamente ${Math.round(pegadaTotal * 1000)} km dirigidos em um carro a gasolina.</p>
      </div>
    `;
    
    // Animação do resultado
    resultadoElement.style.opacity = '0';
    resultadoElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      resultadoElement.style.opacity = '1';
      resultadoElement.style.transform = 'translateY(0)';
    }, 100);
  });
}

// Sistema de Fórum
function initForum() {
  const form = document.getElementById('form-forum');
  const messageList = document.getElementById('lista-forum');
  if (!form || !messageList) return;

  // Carregar mensagens do localStorage
  let messages = JSON.parse(localStorage.getItem('forumMessages')) || [];
  
  // Função para renderizar mensagens
  function renderMessages() {
    messageList.innerHTML = messages.map((message, index) => `
      <li class="forum-message">
        <div class="message-header">
          <span class="user">Usuário ${index + 1}</span>
          <span class="date">${new Date().toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="message-content">${message}</div>
        <button class="delete-btn" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </li>
    `).join('');
    
    // Adicionar eventos aos botões de deletar
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        messages.splice(index, 1);
        localStorage.setItem('forumMessages', JSON.stringify(messages));
        renderMessages();
      });
    });
  }
  
  // Renderizar mensagens iniciais
  renderMessages();
  
  // Adicionar nova mensagem
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const messageInput = document.getElementById('msg-forum');
    const message = messageInput.value.trim();
    
    if (message) {
      messages.push(message);
      localStorage.setItem('forumMessages', JSON.stringify(messages));
      messageInput.value = '';
      renderMessages();
      
      // Animação da nova mensagem
      const newMessage = messageList.firstChild;
      newMessage.style.opacity = '0';
      newMessage.style.transform = 'translateY(20px)';
      setTimeout(() => {
        newMessage.style.opacity = '1';
        newMessage.style.transform = 'translateY(0)';
      }, 100);
    }
  });
}
// Adicione estas linhas no final do event listener DOMContentLoaded

// Atualizar data atual
function updateCurrentDate() {
  const dateElement = document.getElementById('data-atual');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('pt-BR', options);
  }
}

// Carregar dados do clima
async function loadWeatherData(cidade = "São Paulo") {
  try {
    const response = await fetch(`/api/clima?cidade=${encodeURIComponent(cidade)}`);
    const data = await response.json();
    
    if (data.erro) throw new Error(data.erro);
    
    document.getElementById('cidade-nome').textContent = cidade;
    document.getElementById('weather-temp').textContent = data.temperatura;
    document.getElementById('weather-desc').textContent = data.descricao;
    
    const iconUrl = `https://openweathermap.org/img/wn/${data.icone}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = data.descricao;
    
  } catch (error) {
    console.error("Erro ao carregar dados do clima:", error);
    document.getElementById('weather-desc').textContent = "Não foi possível carregar os dados do clima";
  }
}

// Event listeners para o monitoramento climático
document.getElementById('atualizar-clima')?.addEventListener('click', () => {
  const cidade = document.getElementById('cidade-select').value;
  loadWeatherData(cidade);
});

// Inicialização
updateCurrentDate();
loadWeatherData();
// Adicione estas funções ao seu main.js

// Sistema de Autenticação
async function handleLogin(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      updateUIForLoggedInUser(data.user);
      return true;
    } else {
      showAlert(data.message || 'Erro no login');
      return false;
    }
  } catch (error) {
    console.error('Erro no login:', error);
    showAlert('Erro ao conectar com o servidor');
    return false;
  }
}

// Dashboard de Monitoramento Climático
async function initClimateDashboard() {
  // Obter localização do usuário (com permissão)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Carregar dados de clima e qualidade do ar simultaneamente
          const [weatherRes, airQualityRes] = await Promise.all([
            fetch(`/api/clima?lat=${latitude}&lon=${longitude}`),
            fetch(`/api/qualidade-ar?lat=${latitude}&lon=${longitude}`)
          ]);
          
          const weatherData = await weatherRes.json();
          const airQualityData = await airQualityRes.json();
          
          updateWeatherDashboard(weatherData, airQualityData);
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      },
      (error) => {
        console.warn('Permissão de localização negada:', error);
        loadWeatherData('São Paulo'); // Fallback para cidade padrão
      }
    );
  } else {
    loadWeatherData('São Paulo'); // Fallback para navegadores sem geolocalização
  }
}

function updateWeatherDashboard(weather, airQuality) {
  // Atualizar elementos da UI com os dados recebidos
  document.getElementById('weather-temp').textContent = weather.temperatura;
  document.getElementById('weather-desc').textContent = weather.descricao;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weather.icone}@2x.png`;
  
  // Adicionar informações extras
  document.getElementById('weather-humidity').textContent = `${weather.umidade}%`;
  document.getElementById('weather-wind').textContent = `${weather.vento} km/h`;
  
  // Qualidade do ar
  const aqiText = ['Boa', 'Moderada', 'Ruim', 'Muito Ruim', 'Péssima'][airQuality.qualidade - 1] || 'Desconhecida';
  document.getElementById('air-quality').textContent = aqiText;
  document.getElementById('air-quality').className = `aqi-${airQuality.qualidade}`;
}

// Calculadora de Pegada de Carbono Aprimorada
function initEnhancedFootprintCalculator() {
  const form = document.getElementById('form-pegada');
  if (!form) return;

  // Carregar histórico se usuário estiver logado
  if (localStorage.getItem('token')) {
    loadUserFootprintHistory();
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      transporte: parseFloat(this.transporte.value) || 0,
      energia: parseFloat(this.energia.value) || 0,
      alimentacao: parseFloat(this.alimentacao.value) || 0,
      residencia: parseFloat(this.residencia?.value) || 0,
      consumo: parseFloat(this.consumo?.value) || 0
    };
    
    const pegadaTotal = calculateFootprint(formData);
    displayFootprintResult(pegadaTotal, formData);
    
    // Salvar no banco de dados se usuário estiver logado
    if (localStorage.getItem('token')) {
      await saveFootprintToDatabase(pegadaTotal, formData);
    }
  });
}

function calculateFootprint(data) {
  const factors = {
    transporte: 0.21,    // kgCO2/km
    energia: 0.5,       // kgCO2/kWh
    alimentacao: 2,     // kgCO2/kg carne
    residencia: 0.1,    // kgCO2/m2
    consumo: 0.05       // kgCO2/R$100
  };
  
  return Object.entries(data).reduce((total, [key, value]) => {
    return total + (value * factors[key]);
  }, 0);
}

async function saveFootprintToDatabase(total, details) {
  try {
    const response = await fetch('/api/footprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ total, details, date: new Date() })
    });
    
    if (!response.ok) {
      console.error('Erro ao salvar pegada:', await response.json());
    }
  } catch (error) {
    console.error('Erro ao salvar pegada:', error);
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Seus listeners existentes...
  
  // Novas inicializações
  initClimateDashboard();
  initEnhancedFootprintCalculator();
  
  // Verificar autenticação ao carregar
  checkAuthStatus();
});