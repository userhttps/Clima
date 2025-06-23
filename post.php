<?php
// URL do seu Firebase - coloque o final .json para pegar o JSON
$url = "https://climaconsciente-131f2-default-rtdb.firebaseio.com/sensor.json";

// Pega o conteúdo JSON da URL
$json = file_get_contents($url);

// Converte JSON em array PHP
$data = json_decode($json, true);

// Exibe os dados
echo "<h1>Dados do Sensor</h1>";
if ($data) {
    echo "Temperatura: " . htmlspecialchars($data['temperatura']) . " °C<br>";
    echo "Umidade: " . htmlspecialchars($data['umidade']) . " %<br>";
    echo "Pressão: " . htmlspecialchars($data['pressao']) . " hPa<br>";
    if (isset($data['sensacao_termica'])) {
        echo "Sensação Térmica: " . htmlspecialchars($data['sensacao_termica']) . " °C<br>";
    }
} else {
    echo "Não foi possível obter os dados do Firebase.";
}
?>
