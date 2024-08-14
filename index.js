// Importa o módulo 'express' para criar um servidor web.
import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

// Cria uma instância do aplicativo Express.
const app = express();

// Middleware que configura o servidor para entender requisições com corpo em JSON.
app.use(express.json());

// Define uma rota GET na URL '/usuarios' que responde com a lista de usuários.
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Corrigido: agora 'users' é definido corretamente
    // Responde com status 200 (OK) e envia o array 'users' em formato JSON.
    res.status(200).json(users);
  } catch (error) {
    // Responde com status 500 (Internal Server Error) em caso de erro.
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Define uma rota POST na URL '/usuarios' para adicionar um novo usuário.
app.post("/usuarios", async (req, res) => {
  try {
    // Adiciona o corpo da requisição (JSON) ao banco de dados.
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
  } catch (error) {
    // Responde com status 500 (Internal Server Error) em caso de erro.
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do usuário da URL
    const user = await prisma.user.update({
      where: {
        id: id, // Usa o ID para localizar e atualizar o usuário
      },
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });

    console.log(user);
    // Responde com status 200 (OK) e o usuário atualizado em formato JSON.
    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    // Responde com status 500 (Internal Server Error) em caso de erro.
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do usuário da URL
    await prisma.user.delete({
      where: {
        id: id, // Usa o ID para localizar e excluir o usuário
      },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    // Responde com status 500 (Internal Server Error) em caso de erro.
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
// - CRIAR ok
// - LER ok
// - EDITAR ok
// - DELETAR ok
// - LISTAR
// - BUSCAR
// - FILTRAR
// - ORDENAR
