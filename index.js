import { PrismaClient } from "@prisma/client"; // Importando o cliente Prisma para se conectar ao banco de dados
import cors from 'cors' // Importando o middleware CORS para permitir requisições entre diferentes origens (front e back)
import express from "express"; // Importando o Express para criar o servidor web

const prisma = new PrismaClient(); // Instanciando o cliente Prisma

const PORT = process.env.PORT || 4001;

const app = express(); // Criando uma instância do Express

app.use(express.json()); // Middleware para entender requisições em formato JSON
app.use(cors()); // Middleware para habilitar CORS

// Rota GET para listar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Buscando todos os usuários no banco de dados
    res.status(200).json(users); // Retornando os usuários encontrados
  } catch (error) {
    console.log(error); // Logando o erro no console
    res.status(500).json({ error: "Erro ao buscar usuários" }); // Retornando erro ao cliente
  }
});

// Rota POST para criar um novo usuário
app.post("/usuarios", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });
    res.status(201).json({ message: "Usuário criado com sucesso", user }); // Retornando sucesso ao criar o usuário
  } catch (error) {
    console.error(error); // Logando o erro no console
    res.status(500).json({ error: "Erro ao criar usuário" }); // Retornando erro ao cliente
  }
});

// Rota PUT para atualizar um usuário existente
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params; // Pegando o ID dos parâmetros da URL
    const user = await prisma.user.update({
      where: { id: id }, // Buscando e atualizando o usuário pelo ID
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name,
      },
    });
    res.status(200).json({ message: "Usuário atualizado com sucesso", user }); // Retornando sucesso
  } catch (error) {
    console.log(error); // Logando o erro no console
    res.status(500).json({ error: "Erro ao atualizar usuário" }); // Retornando erro ao cliente
  }
});

// Rota DELETE para deletar um usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params; // Pegando o ID dos parâmetros da URL
    await prisma.user.delete({ where: { id: id } }); // Deletando o usuário pelo ID
    res.status(200).json({ message: "Usuário deletado com sucesso" }); // Retornando sucesso
  } catch (error) {
    console.log(error); // Logando o erro no console
    res.status(500).json({ error: "Erro ao deletar usuário" }); // Retornando erro ao cliente
  }
});



// Inicia o servidor na porta 4001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// - CRIAR ok
// - LER ok
// - EDITAR ok
// - DELETAR ok
// - LISTAR
// - BUSCAR
// - FILTRAR
// - ORDENAR


// andresilvadev05
// 22082005