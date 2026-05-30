import express, { Request, Response } from "express";
import { carroService } from "../services/carroService";

const CarroService = new carroService();

export function cadastrarCarro(req: Request, res: Response) {
    try {
        const novoCarro = CarroService.cadastrarCarro(req.body);

        res.status(201).json(novoCarro);
    } catch (e: unknown) {
        const erro = e as Error;

        const [statusCode, message] = erro.message.split(":");

        res.status(Number(statusCode) || 400).json({ Message: message || erro.message });
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
    } catch (error: any) {
        const [statusCode, message] = error.message.split(":");
        res.status(Number(statusCode) || 400).json({ erro: message || error.message });
    }
}

export function removerCarro(req: Request, res: Response) {
    try {
        const id = parseInt(String(req.params.id), 10 );
        carroService.removerCarro(id); //falta terminar esse metodo..
        res.status(200).json({ mensagem: "Carro removido com sucesso." });
    } catch (error: any) {
        const [statusCode, message] = error.message.split(":");
        res.status(Number(statusCode) || 400).json({ erro: message || error.message });
    }
}