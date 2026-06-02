import express, { Application, Request, Response } from "express";

import { listarVendedores, buscarVendedor, criarVendedor, atualizarVendedor, deletarVendedor, listarNotasDoVendedor } from "./controllers/vendedorController";
import { cadastrarCliente, exibirClientes, consultarCliente, modificarCliente, removerCliente } from "./controllers/clienteController";
import { cadastrarCarro, atualizarCarro, listarTodos, buscarPorID, removerCarro } from "./controllers/carroController";
import { cadastrarEstoque, buscarEstoqueCarro, buscarEstoquePorId, listarEstoques, atualizarEstoque, deletarEstoque } from "./controllers/estoqueController";
import { listarNotas, buscarId, emitir } from "./controllers/notaFiscalController";

const app: Application = express();
const PORT: number = 3000;
app.use(express.json());

//REQUESTS VENDEDORES
app.get("/vendedores", listarVendedores);
app.get("/vendedores/:id", buscarVendedor);
app.post("/vendedores", criarVendedor);
app.put("/vendedores/:id", atualizarVendedor);
app.delete("/vendedores/:id", deletarVendedor);

//REQUESTS CARRO
app.get("/carros", listarTodos);
app.get("/carros/:id", buscarPorID);
app.post("/carros", cadastrarCarro);
app.put("/carros/:id", atualizarCarro);
app.delete("/carros/:id", removerCarro);

//REQUESTS CLIENTE
app.get("/clientes", exibirClientes);
app.get("/clientes/:id", consultarCliente);
app.post("/clientes", cadastrarCliente);
app.put("/clientes/:id", modificarCliente);
app.delete("/clientes/:id", removerCliente);

//REQUESTS ESTOQUE
app.get("/estoque", listarEstoques);
app.get("/estoque/carro/:id_carro", buscarEstoqueCarro);
app.get("/estoque/:id", buscarEstoquePorId);
app.post("/estoque", cadastrarEstoque);
app.put("/estoque/:id", atualizarEstoque);
app.delete("/estoque/:id", deletarEstoque);

//REQUESTS NOTA FISCAL
app.get("/notas", listarNotas);
app.get("/notas/:id", buscarId);
app.post("/notas", emitir);

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));

export default app;