// Importa o módulo 'express' para criar um servidor web.
import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

// Cria uma instância do aplicativo Express.
const app = express();

// Middleware que configura o servidor para entender requisições com corpo em JSON. 
app.use(express.json());


// Define uma rota GET na URL '/usuarios' que responde com a lista de usuários.
app.get("/usuarios", (req, res) => {

  prisma.user.findMany()
  // Responde com status 200 (OK) e envia o array 'users' em formato JSON.
  res.status(200).json(users);
});

// Define uma rota POST na URL '/usuarios' para adicionar um novo usuário.
app.post("/usuarios", async (req, res) => {
  // Adiciona o corpo da requisição (JSON) ao array 'users'.
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name,
    },
  });

  console.log(user);
  // Responde com status 201 (Created) e uma mensagem de sucesso em formato JSON.
  res.status(201).json({ message: "Usuário criado com sucesso" });
});

// Inicia o servidor para escutar na porta 3000.
app.listen(3000, () => {
  // Imprime uma mensagem no console indicando que o servidor está rodando.
  console.log("Servidor rodando na porta 3000");
});
