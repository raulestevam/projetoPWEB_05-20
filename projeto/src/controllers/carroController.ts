import express, { Request, Response } from "express";
import { carroService } from "../services/carroService";

const CarroService = new carroService();

export function cadastrarCarro(req: Request, res: Response) {
    try {
        const novoCarro = CarroService.cadastrarCarro(req.body);

        res.status(201).json({mensagem: "Carro cadastrado com sucesso!", carro: novoCarro});
    } catch (e: unknown) {
        res.status(404).json({ Message: (e as Error).message});
    }
}


export function listarTodos(req: Request, res: Response) {
    try {
        const carros = CarroService.listarTodos();
        res.status(200).json(carros);
    } catch (error: any) {
        res.status(500).json({ erro: "ERRO interno do servidor"});
    }
}

export function buscarPorID(req: Request, res: Response) {
    try {
        const id = parseInt(String(req.params.id), 10 );
        const carro = CarroService.buscarPorID(id);
        res.status(200).json(carro);
    } catch (e: unknown) {
        res.status(400).json({ Mensagem: (e as Error).message});
    }
}


export function atualizarCarro(req: Request, res: Response) {
    try {
        const id = parseInt(String(req.params.id), 10);
        
        if (isNaN(id)) {
            res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
        }

        const carroAtualizado = CarroService.atualizarCarro(id, req.body);
        return res.status(200).json({mensagem: "Carro foi atualizado com sucesso!"});
        
    } catch (e: unknown) {
        res.status(400).json({ Mensagem: (e as Error).message});
    }
}


export function removerCarro(req: Request, res: Response) {
    try {
        const id = parseInt(String(req.params.id), 10 );
        CarroService.removerCarro(id);
        res.status(200).json({ mensagem: "Carro removido com sucesso." });
    } catch (e: any) {
        const mensagem = e.message;

        if (mensagem.includes("Carro não")) {
            res.status(404).json({ error: mensagem });
        } else {
            res.status(422).json({ erro: mensagem });
        }
    }
}

export function listarCarrosComEstoque(req: Request, res: Response): void {
    try {
        const carros = CarroService.listarCarrosComEstoque();
        res.status(200).json(carros);
    } catch (e: unknown) {
        res.status(400).json({ erro: (e as Error).message });
    }
}

