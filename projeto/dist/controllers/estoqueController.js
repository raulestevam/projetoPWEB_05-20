"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estoqueController = void 0;
const estoqueService_1 = require("../services/estoqueService");
class estoqueController {
    service;
    constructor() {
        this.service = new estoqueService_1.estoqueService();
    }
    cadastrarEstoque = async (req, res) => {
        try {
            const novoEstoque = await this.service.cadastrarEstoque(req.body);
            res.status(201).json(novoEstoque);
        }
        catch (e) {
            if (e.message.includes("Já existe")) {
                res.status(409).json({ erro: e.message });
            }
            else if (e.message.includes("O carro")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    listarEstoques = async (req, res) => {
        try {
            const estoques = await this.service.listarEstoques();
            res.status(200).json(estoques);
        }
        catch (e) {
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    };
    buscarEstoquePorId = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const estoque = await this.service.buscarEstoquePorId(id);
            res.status(200).json(estoque);
        }
        catch (e) {
            res.status(404).json({ erro: e.message });
        }
    };
    buscarEstoqueCarro = async (req, res) => {
        try {
            const id_carro = Number(req.params.id_carro);
            if (isNaN(id_carro)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const estoque = await this.service.buscarEstoqueCarro(id_carro);
            res.status(200).json(estoque);
        }
        catch (e) {
            res.status(404).json({ erro: e.message });
        }
    };
    atualizarEstoque = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const estoqueAtualizado = await this.service.atualizarEstoque(id, req.body);
            res.status(200).json(estoqueAtualizado);
        }
        catch (e) {
            if (e.message.includes("não encontrado")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    deletarEstoque = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            await this.service.deletarEstoque(id);
            res.status(200).json({ mensagem: "Registro de estoque removido com sucesso." });
        }
        catch (e) {
            res.status(404).json({ erro: e.message });
        }
    };
}
exports.estoqueController = estoqueController;
