"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteController = void 0;
const clienteService_1 = require("../services/clienteService");
class clienteController {
    service;
    constructor() {
        this.service = new clienteService_1.clienteService();
    }
    cadastrarCliente = async (req, res) => {
        try {
            const novoCliente = await this.service.cadastrarCliente(req.body);
            res.status(201).json(novoCliente);
        }
        catch (e) {
            if (e.message.includes("mesmo CPF")) {
                res.status(409).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    exibirClientes = async (req, res) => {
        try {
            const clientes = await this.service.exibirClientes();
            res.status(200).json(clientes);
        }
        catch (e) {
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    };
    consultarCliente = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const cliente = await this.service.consultarCliente(id);
            res.status(200).json(cliente);
        }
        catch (e) {
            res.status(404).json({ erro: e.message });
        }
    };
    modificarCliente = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const clienteAtualizado = await this.service.modificarCliente(id, req.body);
            res.status(200).json(clienteAtualizado);
        }
        catch (e) {
            if (e.message.includes("não encontrado")) {
                res.status(404).json({ erro: e.message });
            }
            else if (e.message.includes("mesmo CPF")) {
                res.status(409).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    removerCliente = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            await this.service.removerCliente(id);
            res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
        }
        catch (e) {
            res.status(404).json({ erro: e.message });
        }
    };
}
exports.clienteController = clienteController;
