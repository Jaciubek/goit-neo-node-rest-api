import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

// Testowanie w  PowerShell - wpisz komendę podaną po :

// GET wszystkich kontaktów:

// Invoke-RestMethod -Uri http://localhost:3000/api/contacts -Method GET


// GET kontaktu po ID:

// Invoke-RestMethod -Uri http://localhost:3000/api/contacts/05olLMgyVQdWRwgKfg5J6 -Method GET


// POST – dodanie nowego kontaktu:

// Invoke-RestMethod -Uri http://localhost:3000/api/contacts -Method POST -ContentType "application/json" -Body '{"name":"Mango","email":"mango@gmail.com","phone":"322-22-22"}'


// PUT – aktualizacja kontaktu:

// Invoke-RestMethod -Uri http://localhost:3000/api/contacts/05olLMgyVQdWRwgKfg5J6 -Method PUT -ContentType "application/json" -Body '{"phone":"123-456-789"}'


// DELETE – usunięcie kontaktu:

// Invoke-RestMethod -Uri http://localhost:3000/api/contacts/05olLMgyVQdWRwgKfg5J6 -Method DELETE 
