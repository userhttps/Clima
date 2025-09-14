<?php
$temp = $_POST['temp'] ?? null;
$umid = $_POST['umid'] ?? null;
$press = $_POST['press'] ?? null;
$heat = $_POST['heat'] ?? null;

$data = [
  "temperatura" => $temp,
  "umidade" => $umid,
  "pressao" => $press,
  "sensacao_termica" => $heat,
  "hora" => date("H:i:s"),
  "data" => date("Y-m-d")
];

file_put_contents("dados.json", json_encode($data));
echo "OK";
?>
