import express, { Application, Request, Response } from "express";

import { listarVendedores, buscarVendedor, criarVendedor, atualizarVendedor, deletarVendedor, listarNotasDoVendedor } from "./controllers/vendedorController";
import { cadastrarCliente, exibirClientes, consultarCliente, modificarCliente, removerCliente } from "./controllers/clienteController";
import { cadastrarCarro, atualizarCarro, listarTodos, buscarPorID, removerCarro } from "./controllers/carroController";
import { cadastrarEstoque, buscarEstoqueCarro, buscarEstoquePorId, listarEstoques, atualizarEstoque, deletarEstoque } from "./controllers/estoqueController";



const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));