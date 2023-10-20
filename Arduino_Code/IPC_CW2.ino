#include <FirebaseESP32.h>
#include <WiFi.h>
#include <TinyGPSPlus.h>

#include <OneWire.h>
#include <DallasTemperature.h>


const int oneWireBus = 4;


OneWire oneWire(oneWireBus);


DallasTemperature sensors(&oneWire);

TinyGPSPlus gps;


#define FIREBASE_HOST "ipc-cw2-5e71e-default-rtdb.firebaseio.com/"
#define WIFI_SSID "SLT-Fiber-DC65" // WIFI Name
#define WIFI_PASSWORD "90620638" // WIFI Password
#define FIREBASE_Authorization_key "AIzaSyBXM-20OrWUetSJ93GwOpLPqq3-pe77aiY"


FirebaseData firebaseData;
FirebaseJson json;

void setup() {

  WiFi.begin (WIFI_SSID, WIFI_PASSWORD);


  Serial2.begin(9600);
  sensors.begin();
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }

  Firebase.begin(FIREBASE_HOST, FIREBASE_Authorization_key);

}

void loop() {

 while (Serial2.available() > 0) {

    if (gps.encode(Serial2.read())) {

      displayInfo();

      sensors.requestTemperatures();
      float temperatureC = sensors.getTempCByIndex(0);
      float temperatureF = sensors.getTempFByIndex(0);
      Firebase.setFloat(firebaseData, "/GPS_Data/Longitude", gps.location.lng());
      Firebase.setFloat(firebaseData, "/GPS_Data/Latitude", gps.location.lat());
      Firebase.setFloat(firebaseData, "/TEMP_Data/temperatureC", temperatureC);
      Firebase.setFloat(firebaseData, "/TEMP_Data/temperatureF", temperatureF);

    }
  }
  
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);
  float temperatureF = sensors.getTempFByIndex(0);

  String latitude = "7.4675° N";
  String longitude = "80.6234° E";
  Firebase.setFloat(firebaseData, "/TEMP_Data/temperatureC", temperatureC);
  Firebase.setFloat(firebaseData, "/TEMP_Data/temperatureF", temperatureF);
  Firebase.setString(firebaseData, "/GPS_Data/Longitude", longitude);
  Firebase.setString(firebaseData, "/GPS_Data/Latitude", latitude);
}

void displayInfo()

{

  Serial.print(F("Location: "));

  if (gps.location.isValid()) {

    Serial.print("Lat: ");

    Serial.print(gps.location.lat(), 6);

    Serial.print(F(","));

    Serial.print("Lng: ");

    Serial.print(gps.location.lng(), 6);

    Serial.println();

  }

  else

  {

    Serial.print(F("INVALID"));

  }

}

void updateSerial()

{

  delay(500);

  while (Serial.available())

  {

    Serial2.write(Serial.read());

  }

  while (Serial2.available())

  {

    Serial.write(Serial2.read());

  }

}