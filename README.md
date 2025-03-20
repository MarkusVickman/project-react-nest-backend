# Nest.JS API - Easy Book Review 
Denna backend API för att hantera bokrecensioner innehållandes bokid från Google Books API.
Repot innehåller en Nest.Js backend med en CRUD API som ansluter till en MariaDb-databas. Apin är publicerad i en docker-container till Google Cloud Run.
Här är ett repo som visar hur en webbapplikation kopplad till denna backend kan vara konstruerad [Easy book reviews](https://github.com/MarkusVickman/projekt-react)

## Backend innehåller bland annat
* Databasanslutning till MySQL/MariaDb
* ORM för att sköta databasförfrågningar
* DTO med class-validator för att säkerställa data och datatype
* ValidationPipe för felmeddelandehantering
* Entity-scheman för tabellerna
* Bcrypt lösenord hashing
* Inloggning som returnerar JWT-token
* @useguard som skyddar routes

## Api ändpunkt
Det tar ungefär 10 sekunder för första svaret och ändpunkten finns här: [Välkomstmeddelande](https://project-react-nest-backend-1050979898493.us-central1.run.app/) | [Lagret av discar](https://project-react-nest-backend-1050979898493.us-central1.run.app/review/) 

## Reviewhantering
Funktioner i detta api för att hantera bokrecensioner och inloggningar för detta med följande funktioner:
* Hämta en recension
* Hämta alla recensioner
* Skapa recension
* Redigera recension
* Ta bort recension
* Gilla recension

### Review Databastabell
Böcker lagras i en mySql-databas enligt tabellen nedan. 


|                         | Review                                 |                  |
|-------------------------|----------------------------------------|------------------|
| id                      | int autoincrement                      | PK               |
| bookId                  | varchar(200)                           |                  |
| heading                 | varchar(100)                           |                  |
| subTitle                | varchar(200)                           |                  |
| date                    | datetime, default: CURRENT_TIMESTAMP   |                  |
| about                   | varchar(10000), nullable               |                  |
| score                   | int                                    |                  |
| email                   | varchar(255)                           | FK → User(email) |


### Reviewhantering ändpunkter
När id krävs skickas det med som en html-parameter.
Skyddade routes kräver att access_token skickas med som `Authorization`: `Bearer + access_token`.

|Metod  |Ändpunkt           |Beskrivning                                                                 |
|-------|-------------------|----------------------------------------------------------------------------|
|GET    |/review/           |Hämtar alla recensioner.                                                    |
|GET    |/review/:ID        |Hämtar en specifik recension med angivet id.                                |
|POST   |/review/create/    |Lagrar en ny recension.                                                     |
|PUT    |/review/update/:ID |Uppdaterar en recension med angivet ID.                                     |
|DELETE |/review/delete/:ID |Raderar en recension med angivet ID.                                        |
|PUT    |/review/like/:ID   |Gillar en recension med angivet ID. Skicka endast med ID.                   |

Vid ny recension eller uppdatering av befintlig är värden för score och about valfritt. 


## Användarhantering
Funktioner i detta api för att hantera användare har följande funktioner:
* Skapa användare.
* Logga in användare.
* Redigera användare.
* Verifiera och avverifiera konton för att ge dem tillgång att logga in.
* Ändra konton till admin och till vanliga konton.
* Ta bort konton.

### Användarhantering Databastabell
Användare lagras i en mySql-databas enligt tabellen nedan. 

|                         | user                                     |              |
|-------------------------|------------------------------------------|--------------|
|email                    |varchar(200)                              | PK           |
|name                     |varchar(200)                              |              |
|password                 |varchar                                   |              |
|isVerified               |boolean default: false                    |              |
|isAdmin                  |boolean default: false                    |              |

### Användarhantering ändpunkter 
När id krävs skickas det med som en html-parameter.
Skyddade routes kräver att access_token skickas med som `Authorization`: `Bearer + access_token`.

|Metod  |Ändpunkt        |Beskrivning                                                                               |
|-------|----------------|------------------------------------------------------------------------------------------|
|GET    |/user/          |Hämtar alla användare.                                                                    |
|GET    |/user/:email    |Hämtar en specifik användare med angivet ID.                                              |
|POST   |/user/register/ |Skapar en ny användare om emailen inte finns redan. Name, email och lösenord skickas med. |
|PUT    |/user/:email    |Uppdaterar en användare med angivet ID. Skicka med de parametrar du vill ändra.           |
|DELETE |/user/:email    |Raderar en användare med angivet ID.                                                      |
|GET    |/auth/profile/  |Hämtar aktuell inloggad användare.                                                        |
|POST   |/auth/login/    |Loggar in och returnerar access_token                                                     |


## Återskapa
Om du vill testa själv kan du klona och återskapa projektet.
Projektet skapades med version 22.11.0.

### Project setup
Installera nest.js och alla dependencies.

```bash
     npm install -g @nestjs/cli
     npm install
```

Spara anslutningsinställningar till din MySql-databas i en .env i rootkatalogen enligt följande:

     
        DB_HOST=din host
        DB_PORT= din port
        DB_USERNAME=ditt användarnamn
        DB_PASSWORD= ditt lösenord
        DB_DATABASE= din databas

        JWT_CONSTANTS=slumpvis vald träng på 32 teckan av stora och små bokstäver samt siffror
    
Tabeller från /entities/.entity.ts-filerna kommer att skapas och scynkas automatiskt. Så inga tabeller behöver skapas av användaren. Dock bör synchronize ändras till false i filen database.prividers.ts efter publicering för att undvika dataförluster om scheman ändras.

### Testköra lokalt
```bash
     npm run start
```
Alternativt:
```bash
     npm run start:dev
```
### Publicera
Projektet kan publiceras med docker till vald tjänst där databas variabler från .env-filen ska sparas som enviremental secrets. Följande dockerfil(finns i repot) används vid publicering:

```bash
     # Use the official Node.js image as the base image
     FROM node:22.11.0
     
     # Set the working directory inside the container
     WORKDIR /usr/src/app
     
     # Copy package.json and package-lock.json to the working directory
     COPY package*.json ./
     
     # Install the application dependencies
     RUN npm install
     
     # Copy the rest of the application files
     COPY . .
     
     # Build the NestJS application
     RUN npm run build
     
     # Expose the application port
     EXPOSE 3000
     
     # Command to run the application
     CMD ["node", "dist/main"]
```


### Skapad av MARKUS VICKMAN (MAVI2302) 
