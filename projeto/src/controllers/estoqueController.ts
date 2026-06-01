import { Request, Response } from "express";
import { estoqueService } from "../services/estoqueService";

const EstoqueService = new estoqueService();

export function cadastrarEstoque(req: Request, res: Response): void {
    try {
        const novoEstoque = EstoqueService.cadastrarEstoque(req.body);
        res.status(201).json(novoEstoque);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("Já existe")) {
            res.status(409).json({ erro: mensagem });
        }
        else if (mensagem.includes("O carro")) {
            res.status(404).json({ erro: mensagem });
        }
        else {
            res.status(400).json({ erro: mensagem });
        }
    }
}

export function listarEstoques(req: Request, res: Response): void {
    try {
        const estoques = EstoqueService.listarEstoques();
        res.status(200).json(estoques);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

export function buscarEstoquePorId(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const estoque = EstoqueService.buscarEstoquePorId(id);
        res.status(200).json(estoque);
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
}

export function buscarEstoqueCarro(req: Request, res: Response): void {
    try {
        const id_carro = Number(req.params.id_carro);
        const estoque = EstoqueService.buscarEstoqueCarro(id_carro);
        res.status(200).json(estoque);
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
}

export function atualizarEstoque(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const estoqueAtualizado = EstoqueService.atualizarEstoque(id, req.body);
        res.status(200).json(estoqueAtualizado);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("não encontrado")) {
            res.status(404).json({ erro: mensagem });
        } else {
            res.status(400).json({ erro: mensagem });
        }
    }
}

export function deletarEstoque(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        EstoqueService.deletarEstoque(id);
        res.status(200).json({ mensagem: "Registro de estoque removido com sucesso." });
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
}