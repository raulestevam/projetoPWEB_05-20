import { Request, Response } from "express";
import { notaFiscalService } from "../services/notaFiscalService";

const NotaFiscalService = new notaFiscalService();

export function listarNotas(req: Request, res: Response): void {
    try {
        const notas = NotaFiscalService.listarNotas();
        res.status(200).json(notas);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

export function buscarId(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const nota = NotaFiscalService.buscarPorNotaId(id);
        res.status(200).json(nota);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("não encontrada")) {
            res.status(404).json({ erro: mensagem });
        } else {
            res.status(400).json({ erro: mensagem });
        }
    }
}

export function emitir(req: Request, res: Response): void {
    try {
        const novaNota = NotaFiscalService.emitirNota(req.body);
        res.status(201).json(novaNota);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("já existe")) {
            res.status(409).json({ erro: mensagem });
        } 
        else if (mensagem.includes("Estoque insuficiente")) {
            res.status(422).json({ erro: mensagem });
        } 
        else if (mensagem.includes("não encontrada")) {
            res.status(404).json({ erro: mensagem });
        } 
        else {
            res.status(400).json({ erro: mensagem });
        }
    }
}