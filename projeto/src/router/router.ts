import { Router, Request, Response } from 'express';

import { carroController } from '../controllers/carroController';
import { clienteController } from '../controllers/clienteController';
import { estoqueController } from '../controllers/estoqueController';
import { notaFiscalController } from '../controllers/notaFiscalController';
import { vendedorController } from '../controllers/vendedorController';

const router = Router();
const carro = new carroController();
const cliente = new clienteController();
const estoque = new estoqueController();
const notaFiscal = new notaFiscalController();
const vendedor = new vendedorController();

//Finalizado router

//REQUESTS VENDEDORES
router.get("/vendedores", (req: Request, res: Response) => {vendedor.listarVendedores(req, res);});
router.get("/vendedores", (req: Request, res: Response) => {vendedor.buscarVendedor(req, res);});
router.post("/vendedores", (req: Request, res: Response) => {vendedor.criarVendedor(req, res);});
router.put("/vendedores", (req: Request, res: Response) => {vendedor.atualizarVendedor(req, res);});
router.delete("/vendedores", (req: Request, res: Response) => {vendedor.deletarVendedor(req, res);});
router.get("/vendedores/notas/:id", (req: Request, res: Response) => {notaFiscal.listarNotasPorVendedor(req, res);});

//REQUESTS CARRO
router.get("/carros", (req: Request, res: Response) => {carro.listarTodos(req, res);});
router.get("/carros", (req: Request, res: Response) => {carro.listarCarrosComEstoque(req, res);});
router.get("/carros", (req: Request, res: Response) => {carro.listarTodos(req, res);});
router.get("/carros:id", (req: Request, res: Response) => {carro.buscarPorID(req, res);});
router.post("/carros", (req: Request, res: Response) => {carro.cadastrarCarro(req, res);});
router.put("/carros", (req: Request, res: Response) => {carro.atualizarCarro(req, res);});
router.delete("/carros", (req: Request, res: Response) => {carro.removerCarro(req, res);});

//REQUESTS CLIENTE
router.get("/clientes", (req: Request, res: Response) => {cliente.exibirClientes(req, res);});
router.get("/clientes:id", (req: Request, res: Response) => {cliente.consultarCliente(req, res);});
router.post("/clientes", (req: Request, res: Response) => {cliente.cadastrarCliente(req, res);});
router.put("/clientes", (req: Request, res: Response) => {cliente.modificarCliente(req, res);});
router.delete("/clientes", (req: Request, res: Response) => {cliente.removerCliente(req, res);});
router.get("/clientes/notas/:id", (req: Request, res: Response) => {notaFiscal.listarNotasPorCliente(req, res);});

//REQUESTS ESTOQUE
router.get("/estoque", (req: Request, res: Response) => {estoque.listarEstoques(req, res);});
router.get("/estoque/carro/:id_carro", (req: Request, res: Response) => {estoque.buscarEstoqueCarro(req, res);});
router.get("/estoque/:id", (req: Request, res: Response) => {estoque.buscarEstoquePorId(req, res);});
router.post("/estoque", (req: Request, res: Response) => {estoque.cadastrarEstoque(req, res);});
router.put("/estoque", (req: Request, res: Response) => {estoque.atualizarEstoque(req, res);});
router.delete("/estoque", (req: Request, res: Response) => {estoque.deletarEstoque(req, res);});

//REQUESTS NOTA FISCAL
router.get("/notas", (req: Request, res: Response) => {notaFiscal.listarNotas(req, res);});
router.get("/notas:id", (req: Request, res: Response) => {notaFiscal.buscarId(req, res);});
router.post("/notas", (req: Request, res: Response) => {notaFiscal.emitir(req, res);});

export default router;