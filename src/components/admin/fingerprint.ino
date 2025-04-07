#include <Adafruit_Fingerprint.h>
#include <HardwareSerial.h>

// Serial2 setup
#define RXD2 16
#define TXD2 17

// LED Pins
#define GREEN_LED 13
#define RED_LED 12

HardwareSerial sensorSerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&sensorSerial);

String incomingCommand = "";
bool isEnrolling = false;

void setup() {
  Serial.begin(57600);
  while (!Serial);

  sensorSerial.begin(57600, SERIAL_8N1, RXD2, TXD2);
  finger.begin(57600);
  delay(1000);

  pinMode(GREEN_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, LOW);

  if (finger.verifyPassword()) {
    Serial.println("Sensor ready");
  } else {
    Serial.println("ERROR:Sensor not found");
    while (1);
  }
}

void loop() {
  if (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\n') {
      incomingCommand.trim();
      if (incomingCommand == "ENROLL") {
        isEnrolling = true;
        digitalWrite(GREEN_LED, HIGH);
        digitalWrite(RED_LED, LOW);
        enrollFinger();
      }
      incomingCommand = "";
    } else {
      incomingCommand += ch;
    }
  }
}

void enrollFinger() {
  int id = getFreeID();
  if (id == -1) return showError("No available ID");

  Serial.println("Place finger...");
  int p = -1;
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    if (p == FINGERPRINT_NOFINGER) continue;
    if (p != FINGERPRINT_OK) return showError("Image capture failed");
  }

  p = finger.image2Tz(1);
  if (p != FINGERPRINT_OK) return showError("Image conversion failed");

  Serial.println("Remove finger...");
  delay(2000);
  while (finger.getImage() != FINGERPRINT_NOFINGER);

  Serial.println("Place same finger again...");
  p = -1;
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    if (p == FINGERPRINT_NOFINGER) continue;
    if (p != FINGERPRINT_OK) return showError("Second capture failed");
  }

  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK) return showError("Second image conversion failed");

  p = finger.createModel();
  if (p != FINGERPRINT_OK) return showError("Model creation failed");

  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.print("SUCCESS:");
    Serial.println(id);
    digitalWrite(GREEN_LED, HIGH);
    delay(2000);
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, LOW);
    return showError("Storing failed");
  }

  isEnrolling = false;
}

void showError(String reason) {
  Serial.print("ERROR:");
  Serial.println(reason);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(RED_LED, HIGH);
  delay(2000);
  digitalWrite(RED_LED, LOW);
  isEnrolling = false;
}

int getFreeID() {
  for (int id = 1; id < 127; id++) {
    if (!finger.loadModel(id)) return id;
  }
  return -1;
}
