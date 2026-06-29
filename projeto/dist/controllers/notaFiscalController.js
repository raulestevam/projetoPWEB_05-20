"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notaFiscalController = void 0;
const notaFiscalService_1 = require("../services/notaFiscalService");
class notaFiscalController {
    service;
    constructor() {
        this.service = new notaFiscalService_1.notaFiscalService();
    }
    listarNotas = async (req, res) => {
        try {
            const notas = await this.service.listarNotas();
            res.status(200).json(notas);
        }
        catch (e) {
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    };
    buscarId = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const nota = await this.service.buscarPorNotaId(id);
            res.status(200).json(nota);
        }
        catch (e) {
            if (e.message.includes("não encontrada")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    emitir = async (req, res) => {
        try {
            const novaNota = await this.service.emitirNota(req.body);
            res.status(201).json(novaNota);
        }
        catch (e) {
            if (e.message.includes("já existe")) {
                res.status(409).json({ erro: e.message });
            }
            else if (e.message.includes("Estoque insuficiente")) {
                res.status(422).json({ erro: e.message });
            }
            else if (e.message.includes("não encontrada") || e.message.includes("não encontrado")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    listarNotasPorCliente = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const notas = await this.service.buscarNotasPorCliente(id);
            res.status(200).json(notas);
        }
        catch (e) {
            if (e.message.includes("não encontrado") || e.message.includes("não encontradas")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
    listarNotasPorVendedor = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }
            const notas = await this.service.buscarNotasPorVendedor(id);
            res.status(200).json(notas);
        }
        catch (e) {
            if (e.message.includes("não encontrado") || e.message.includes("não encontradas")) {
                res.status(404).json({ erro: e.message });
            }
            else {
                res.status(400).json({ erro: e.message });
            }
        }
    };
}
exports.notaFiscalController = notaFiscalController;
