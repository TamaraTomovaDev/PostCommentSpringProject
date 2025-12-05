# 🌸 Pastel Blog App --- Full Stack Project

Welkom bij mijn volledige CRUD-webapplicatie gebouwd met:

- **Spring Boot** (Back-end)
- **MySQL** (Database)
- **HTML, CSS & JavaScript** (Front-end)
- **Postman** (API Testing)

Deze app laat gebruikers *posts* en *comments* toevoegen, bekijken, bewerken en verwijderen — allemaal in een zachte pastelstijl.

---

## 📂 Projectstructuur

```
src/
 ├─ main/
 │   ├─ java/org.intecbrussel/
 │   │   ├─ controller/        → REST-controllers voor posts & comments
 │   │   ├─ model/             → JPA entiteiten (Post, Comment, AuditModel)
 │   │   ├─ repository/        → Spring Data JPA repositories
 │   │   ├─ service/           → Service-logica
 │   │   ├─ exception/         → Exception handling
 │   │   └─ bootstrap/         → DataLoader met voorbeelddata
 │   └─ resources/
 │       ├─ static/            → Frontend (HTML, CSS, JS)
 │       └─ application.properties
```

---

## 🛠 Backend — Spring Boot

De backend bevat een volledige REST API met:

- Relaties tussen **Post ↔ Comment**
- Automatische timestamps via **AuditModel**
- **DataLoader** die voorbeelddata invoert
- CRUD-functionaliteit voor zowel posts als comments

---

## 🔹 Belangrijkste REST Endpoints

### 📌 Posts

| Methode | Endpoint           | Beschrijving           |
|--------|--------------------|------------------------|
| GET    | `/api/posts`       | Alle posts ophalen     |
| GET    | `/api/posts/{id}`  | Eén post ophalen       |
| POST   | `/api/posts`       | Nieuwe post toevoegen  |
| PUT    | `/api/posts/{id}`  | Post bewerken          |
| DELETE | `/api/posts/{id}`  | Post verwijderen       |

### 💬 Comments

| Methode | Endpoint                            | Beschrijving                  |
|--------|--------------------------------------|-------------------------------|
| GET    | `/api/posts/{postId}/comments`       | Comments per post ophalen     |
| POST   | `/api/posts/{postId}/comments`       | Comment toevoegen             |
| PUT    | `/api/comments/{commentId}`          | Comment bewerken              |
| DELETE | `/api/comments/{commentId}`          | Comment verwijderen           |

---

## 🗄 Database — MySQL

Maak de database aan:

```sql
CREATE DATABASE postcommentdb;
```

`application.properties`:

```
spring.application.name=PostCommentSpringProject
spring.datasource.url=jdbc:mysql://localhost:3306/postcommentdb
spring.datasource.username=intec
spring.datasource.password=intec-123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

---

## 🌱 DataLoader — Automatische Testdata

Bij het opstarten:

- Controleert of er al posts bestaan
- Zo niet:
    - worden automatisch **minimaal 2 posts** aangemaakt
    - elke post krijgt **minstens 2 comments**
- Alles wordt opgeslagen met JPA-repositories

Zo is de API direct bruikbaar.

---

## 🎨 Front-end — HTML, CSS & JavaScript

De frontend is gebouwd in een pastelkleurige stijl geïnspireerd op de headerfoto.

- Grote headerbanner bovenaan elke pagina
- Center-card layout zodat alles mooi in het midden staat
- Uniforme pastelknoppen
- Modal popup voor comment-bewerking
- Dynamische frontend die communiceert met de API via **script.js**

### 📄 Pagina's

- `index.html` — startpagina
- `posts.html` — alle posts
- `post-detail.html` — details + comments
- `add-post.html` — nieuwe post
- `edit-post.html` — bestaande post bewerken

---

## 🧪 Postman Testing

Alle API-functionaliteit is getest met Postman.

### ✔ Uitgevoerde tests:

- Posts: GET, POST, PUT, DELETE
- Comments: GET, POST, PUT, DELETE
- JSON-validatie
- HTTP-statuscodes controleren

### ✔ Gebruikte methodes:

- GET
- POST
- PUT
- DELETE

---

## 📸 Header Afbeelding

De afbeelding **`header.jpeg`** wordt gebruikt als stijlvolle banner bovenaan alle pagina’s.  
De pastelkleuren van de website zijn afgestemd op deze foto.

---

## 🗂 SQL Dump

De SQL-export toont:

- correcte database structuur
- relaties Post ↔ Comment
- auditvelden
- seed data van DataLoader

---

## 💡 Mogelijke uitbreidingen

- Login & registratie
- Profielen
- Zoeken
- Likesysteem
- Pagination

---

## 🎀 Dankwoord

Bedankt voor het bekijken van mijn project!  
Deze applicatie toont een volledige **Full Stack Spring Boot + Frontend** toepassing  
— helemaal in zachte pastelstijl 🌸💛
