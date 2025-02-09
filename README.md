# 1. De applicatie draaien

Voordat je de Pattern Point applicatie kan draaien moeten er een aantal programma’s geïnstalleerd zijn. Hieronder is een stappenplan aanwezig dat je kan volgen zodat je Pattern Point zonder problemen kan starten.

##  Backend (Spring Boot met Maven):

###    1. Installeer Java:

Zorg ervoor dat Java 17 of 21 is geïnstalleerd. Controleer dit door het volgende commando in de terminal van Intellij uit te voeren:


`java -version`

Als Java niet geïnstalleerd is, kun je het downloaden en [installeren](https://adoptium.net/en-GB/)

### 2. Clone de repository van de backend:

Clone [deze](https://github.com/BoMaassen/bac-pattern-point) repository met SSH en start in Intellij het project met “get from version control”

### 3. Installeer Maven:

Controleer of Maven is geïnstalleerd door het volgende commando uit te voeren:

`mvn -v`

Als Maven niet geïnstalleerd is, download en installeer het vanaf [Maven website](https://maven.apache.org/).
Herlaad ook maven zodat alle dependencies correct zijn geïnstalleerd

### 4. Instellen CORS

Controleer in het bestand “GlobalCorsConfiguration” in de map “config” of bij de .allowedOrigins het juiste localhost port staat van de frontend die je straks draait.

### 5. PgAdmin met PostgreSQL Database:

Start PgAdmin op en zorg ervoor dat je PostgreSQL geïnstalleerd en geconfigureerd is.
Maak een database aan voor je applicatie met de naam: PatternPoint.
Pas in de application.properties het wachtwoord aan naar je eigen wachtwoord om verbinding te maken met je database.

### 6. Start de backend applicatie:

Om de applicatie te starten klik je rechtsboven naast “BacPatternPoint” op het groene driehoekje. De backend applicatie zou nu moeten draaien op http://localhost:8080.

## Frontend (React met Vite en Node.js):

### 1. Clone de repository:

Clone [deze](https://github.com/BoMaassen/fro-pattern-point) repository met SSH, open Webstorm en start het project met “get from version control”

### 2. Installeer Node.js:

Zorg ervoor dat Node.js geïnstalleerd is. Je kunt dit controleren door het volgende commando in de terminal uit te voeren:

`node -v`

Als Node.js niet geïnstalleerd is, download en installeer het vanaf [nodejs.org](https://nodejs.org/en).

### 3. Installeer de frontend dependencies:

Open de terminal en voer het volgende commando uit om alle dependencies te installeren:

`npm install`

Dit installeert de dependencies die zijn gedefinieerd in package.json en gebruikt zijn in dit project.

### 4. Start de frontend applicatie:

Start de applicatie lokaal:

`npm run dev`

De applicatie zou nu beschikbaar moeten zijn op http://localhost:3000 of http://localhost:5173. Dit staat ook in je terminal

## Als het goed is, heb je nu alles gedaan en draait de Pattern Point applicatie in de browser!

### Ik heb twee testgebruikers aangemaakt waarmee je de functionaliteiten kunt testen:

#### Gebruiker 1: Haker

Gebruikersnaam: haker
Wachtwoord: haker1iscool
Rol: Haker

##### Mogelijkheden:

* Posts aanmaken
* Posts bekijken en door de feed scrollen
* Reageren op posts

#### Gebruiker 2: Patroonmaker

Gebruikersnaam: patroonmaker
Wachtwoord: patroonmaker1
Rol: Patroonmaker

##### Mogelijkheden:

* Patronen aanmaken bij een post
* Posts bekijken en door de feed scrollen
* Reageren op posts

#### Daarnaast kun je zelf een gebruiker aanmaken via de /sign-up pagina.

Hierbij zijn de volgende velden verplicht:
* Gebruikersnaam (moet uniek zijn)
* E-mailadres (moet uniek zijn)
* Wachtwoord (minimaal 8 karakters)
* Rol (Haker of Patroonmaker)
* Het invullen van een bio is optioneel.

Veel succes!
