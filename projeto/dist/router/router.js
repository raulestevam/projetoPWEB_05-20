"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carroController_1 = require("../controllers/carroController");
const clienteController_1 = require("../controllers/clienteController");
const estoqueController_1 = require("../controllers/estoqueController");
const notaFiscalController_1 = require("../controllers/notaFiscalController");
const vendedorController_1 = require("../controllers/vendedorController");
const router = (0, express_1.Router)();
const carro = new carroController_1.carroController();
const cliente = new clienteController_1.clienteController();
const estoque = new estoqueController_1.estoqueController();
const notaFiscal = new notaFiscalController_1.notaFiscalController();
const vendedor = new vendedorController_1.vendedorController();
//Finalizado router
//REQUESTS VENDEDORES
router.get("/vendedores", (req, res) => { vendedor.listarVendedores(req, res); });
router.get("/vendedores/:id", (req, res) => { vendedor.buscarVendedor(req, res); });
router.post("/vendedores", (req, res) => { vendedor.criarVendedor(req, res); });
router.put("/vendedores", (req, res) => { vendedor.atualizarVendedor(req, res); });
router.delete("/vendedores", (req, res) => { vendedor.deletarVendedor(req, res); });
router.get("/vendedores/notas/:id", (req, res) => { notaFiscal.listarNotasPorVendedor(req, res); });
//REQUESTS CARRO
router.get("/carros", (req, res) => { carro.listarTodos(req, res); });
router.get("/carros/estoque", (req, res) => { carro.listarCarrosComEstoque(req, res); });
router.get("/carros", (req, res) => { carro.listarTodos(req, res); });
router.get("/carros/:id", (req, res) => { carro.buscarPorID(req, res); });
router.post("/carros", (req, res) => { carro.cadastrarCarro(req, res); });
router.put("/carros/:id", (req, res) => { carro.atualizarCarro(req, res); });
router.delete("/carros/:id", (req, res) => { carro.removerCarro(req, res); });
//REQUESTS CLIENTE
router.get("/clientes", (req, res) => { cliente.exibirClientes(req, res); });
router.get("/clientes/:id", (req, res) => { cliente.consultarCliente(req, res); });
router.post("/clientes", (req, res) => { cliente.cadastrarCliente(req, res); });
router.put("/clientes/:id", (req, res) => { cliente.modificarCliente(req, res); });
router.delete("/clientes/:id", (req, res) => { cliente.removerCliente(req, res); });
router.get("/clientes/notas/:id", (req, res) => { notaFiscal.listarNotasPorCliente(req, res); });
//REQUESTS ESTOQUE
router.get("/estoque", (req, res) => { estoque.listarEstoques(req, res); });
router.get("/estoque/carro/:id_carro", (req, res) => { estoque.buscarEstoqueCarro(req, res); });
router.get("/estoque/:id", (req, res) => { estoque.buscarEstoquePorId(req, res); });
router.post("/estoque", (req, res) => { estoque.cadastrarEstoque(req, res); });
router.put("/estoque/:id", (req, res) => { estoque.atualizarEstoque(req, res); });
router.delete("/estoque/:id", (req, res) => { estoque.deletarEstoque(req, res); });
//REQUESTS NOTA FISCAL
router.get("/notas", (req, res) => { notaFiscal.listarNotas(req, res); });
router.get("/notas/:id", (req, res) => { notaFiscal.buscarId(req, res); });
router.post("/notas", (req, res) => { notaFiscal.emitir(req, res); });
exports.default = router;
