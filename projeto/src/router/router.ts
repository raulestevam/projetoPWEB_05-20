import { Router, Request, Response } from 'express';

import {carroController} from '../controllers/carroController';
import {clienteControlle} from '../controllers/clienteController';
import {estoqueController} from '../controllers/estoqueController';
import {notaFiscalController} from '../controllers/notaFiscalController';
import {vendedorController} from '../controllers/vendedorController';

const router = Router();
const carro = new carroController();
const cliente = new clienteControlle();
const estoque = new estoqueController();
const notaFIscal = new notaFiscalController();
const vendedor = new vendedorController();

//Atualização, criar uma classe para exportar o controller de uma vez, senão é função por função

//REQUESTS VENDEDORES
app.get("/vendedores", listarVendedores);
app.get("/vendedores/:id", buscarVendedor);
app.post("/vendedores", criarVendedor);
app.put("/vendedores/:id", atualizarVendedor);
app.delete("/vendedores/:id", deletarVendedor);
app.get("/vendedores/notas/:id", listarNotasPorVendedor);

//REQUESTS CARRO
app.get("/carros", listarTodos);
app.get("/carros/disponiveis", listarCarrosComEstoque);
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
app.get("/clientes/notas/:id", listarNotasPorCliente);

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