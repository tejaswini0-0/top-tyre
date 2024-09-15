float baselineVal;
float psiValfin;
const int sensorPin = A5;
const float alpha = 0.95; // Low Pass Filter alpha (0 - 1 )
const float aRef = 5; // analog reference
float filteredVal = 512.0; // midway starting point
float sensorVal;
float voltage;
float psiVal;
void setup() {

Serial.begin(9600); 
}
void loop() {
// delay
delay(5000);
sensorVal = (float)analogRead(sensorPin);

voltage = ((sensorVal / 1024.0) * aRef);
float psi = (37.5939 * voltage) - 13.5338; // y=mx+b
psiVal = roundoff(psi, 1);
psiValfin = psiVal - baselineVal;

if (psiValfin<10){
  psiValfin = 0;
}
if (psiValfin>10){
  if (psiValfin < 102){
    Serial.print("Pressure too low\n");
  }
  if (psiValfin > 131){
    Serial.print("Pressure too high\n");
  }
}
Serial.print(psiValfin);
Serial.println(" psi");
delay(200); 
}
float roundoff(float value, unsigned char prec)
{
  float pow_10 = pow(10.0f, (float)prec);
  return round(value * pow_10) / pow_10;
}
