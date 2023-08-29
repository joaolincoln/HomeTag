/*
  Alterado por: Fernando Costenaro Silva
  Baseado no exemplo de:

  Rui Santos
  Complete project details at https://RandomNerdTutorials.com

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

// Importa as bibliotecas necessarias
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

String end_placa_1 = "http://192.168.48.11"; //endereço da placa 1
String end_placa_2 = "http://192.168.48.12"; //endereço da placa 2

bool status_som1 = false;
bool status_led1 = false;

bool status_som2 = false;
bool status_led2 = false;

// Substitua com as credenciais da sua rede
const char* ssid     = "javalees";
const char* password = "12345678";

// Seu endereço de IP estático (será atribuido à placa)
IPAddress local_IP(192,168,48,10);
// O endereço do gateway
IPAddress gateway(192,168,48,30);

IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //opcional
IPAddress secondaryDNS(8, 8, 4, 4); //opcional

const int pinoBotao1 = 5; //10; //GPIO5 -> D1
const int pinoBotao2 = 4; //9; GPIO4 -> D2

const char* PARAM_INPUT_1 = "input1"; //armazena parametro recebido



// Cria um objeto AsyncWebServer na porta 80
AsyncWebServer server(80);


void set_botao1(String config_botao)
{
  //00 01 10 ou 11
  if(config_botao == "00"){
    status_led1 = false;
    status_som1 = false;    
  }else if(config_botao == "01"){
    status_led1 = false;
    status_som1 = true;
  }else if(config_botao == "10"){
    status_led1 = true;
    status_som1 = false;
  }else if(config_botao == "11"){
    status_led1 = true;
    status_som1 = true;
  }
}

void set_botao2(String config_botao)
{
  //00 01 10 ou 11
  if(config_botao == "00"){
    status_led2 = false;
    status_som2 = false;    
  }else if(config_botao == "01"){
    status_led2 = false;
    status_som2 = true;
  }else if(config_botao == "10"){
    status_led2 = true;
    status_som2 = false;
  }else if(config_botao == "11"){
    status_led2 = true;
    status_som2 = true;
  }
}


void setup() {
  // Porta Serial para debug
  Serial.begin(115200);
  pinMode(pinoBotao1, INPUT); // config pino botao 1 como entrada
  pinMode(pinoBotao2, INPUT); // config pino botao 2 como entradaa

  // Configura o endereço IP estático
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("Falha ao configurar em modo Station (STA)");
  }

  // Conecta na rede Wi-Fi com o SSID e senha (password)
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Imprime pela serial o endereço de IP e inicia o servidor web
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Rota para comandar a saida analogica (PWM) formato: <ESP_IP>/saidaAnalogica?input1=<inputMessage>
  server.on("/configuraBotao1", HTTP_GET, [] (AsyncWebServerRequest * request) {
    String inputMessage;
    String inputParam;
    // GET input1 value on <ESP_IP>/saidaAnalogica?input1=<inputMessage>
    if (request->hasParam(PARAM_INPUT_1)) {
      inputMessage = request->getParam(PARAM_INPUT_1)->value(); //valor do paramtro
      //inputParam = PARAM_INPUT_1; //se quiser saber o nome do parametro
      set_botao1(inputMessage); //comanda o valor
    } else {
      inputMessage = "Nenhuma mensagem enviada";
      inputParam = "none";
    }
    request->send_P(200, "text/plain", inputMessage.c_str());
    Serial.println(inputMessage);
  });

  // Rota para comandar a saida analogica (PWM) formato: <ESP_IP>/saidaAnalogica?input1=<inputMessage>
  server.on("/configuraBotao2", HTTP_GET, [] (AsyncWebServerRequest * request) {
    String inputMessage;
    String inputParam;
    // GET input1 value on <ESP_IP>/saidaAnalogica?input1=<inputMessage>
    if (request->hasParam(PARAM_INPUT_1)) {
      inputMessage = request->getParam(PARAM_INPUT_1)->value(); //valor do paramtro
      //inputParam = PARAM_INPUT_1; //se quiser saber o nome do parametro
      set_botao2(inputMessage); //comanda o valor
    } else {
      inputMessage = "Nenhuma mensagem enviada";
      inputParam = "none";
    }
    request->send_P(200, "text/plain", inputMessage.c_str());
    Serial.println(inputMessage);
  });

  
  // Adiciona no cabeçalho para evitar erro de acesso do CORS
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  // Inicia o servidor
  server.begin();
}

void envia_comando_esp01(String ip_placa, bool status_som, bool status_led)
{
  if(WiFi.status()== WL_CONNECTED){ 
    WiFiClient client;
    HTTPClient http;

    // 0 + 0 = 0 - SOM OFF e LED OFF
    // 0 + 1 = 1 - SOM OFF e LED ON
    // 2 + 0 = 2 - SOM ON  e LED OFF
    // 2 + 1 = 3 - SOM ON  e LED ON
    int comando = int(status_som)*2 + int(status_led); 

    //exemplo: "http://192.168.45.11/comando?opcao=3" //envia comando que liga o som e o led 
    String serverPath = ip_placa + "/comando?opcao=" + String(comando);
    http.begin(client, serverPath.c_str()); //inicia a comunicação

    Serial.println("comando: " + serverPath);
    
    int httpResponseCode = http.GET(); //envia a requisição HTTP GET

    //verifica erros
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // finaliza conexão com a placa
  }
}

void comanda_botao1()
{
  Serial.println("aciona botao1");
  envia_comando_esp01(end_placa_1, status_som1, status_led1);
}

void desliga_hometag1()
{
  Serial.println("desaciona botao1");
  envia_comando_esp01(end_placa_1, false, false);
}

void comanda_botao2()
{
  Serial.println("aciona botao2");
  envia_comando_esp01(end_placa_2, status_som2, status_led2);
}

void desliga_hometag2()
{
  Serial.println("desaciona botao2");
  envia_comando_esp01(end_placa_2, false, false);
}

bool estado_hometag1 = false;
bool estado_hometag2 = false;

void loop() {  
  //altera o estado do botao
  if(digitalRead(pinoBotao1)== HIGH)
  {
    estado_hometag1 = !estado_hometag1;
    if(estado_hometag1) comanda_botao1();
    else desliga_hometag1();
  }
  
  if(digitalRead(pinoBotao2)== HIGH)
  {
    estado_hometag2 = !estado_hometag2;
    if(estado_hometag2) comanda_botao2();
    else desliga_hometag2();
  }
  delay(500);
}
