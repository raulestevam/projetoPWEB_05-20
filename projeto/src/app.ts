import express, { Application, Request, Response } from "express";
import {Router} from "express"; 
//o router é uma biblioteca do express para executar as rotas de forma mais simples

import{
    cadastrarCliente,exibirClientes,
    consultarCliente, modificarCliente,
    removerCliente
} from "./controllers/clienteController"

import{
    cadastrarCarro, listarTodos,
    buscarPorID, removerCarro,
} from "./controllers/carroController"

const app: Application = express();
const PORT: number = 3000;
//verificar como executar
const routerCarro = Router();
routerCarro.post("/", cadastrarCarro);
routerCarro.get("/", listarTodos);
routerCarro.get("/:id", buscarPorID);
routerCarro.delete("/:id", removerCarro);

const routerCliente = Router();
routerCliente.post("/", cadastrarCliente);
routerCliente.get("/", exibirClientes);
routerCliente.get("/:id", consultarCliente);
routerCliente.put("/:id", modificarCliente);
routerCliente.delete("/:id", removerCliente);

const routerEstoque = Router();
const routerVendedor = Router();
const routerNotaFiscal = Router();

app.use(express.json());

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));