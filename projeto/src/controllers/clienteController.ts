import { Request, Response } from "express";
import { clienteService } from "../services/clienteService";

const ClienteService = new clienteService();

export function cadastrarCliente(req: Request, res: Response): void {
    try {
        const novoCliente = ClienteService.cadastrarCliente(req.body);
        res.status(201).json(novoCliente);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("mesmo CPF")) {
            res.status(409).json({ erro: mensagem });
        } else {
            res.status(400).json({ erro: mensagem });
        }
    }
}

export function exibirClientes(req: Request, res: Response): void {
    try {
        const clientes = ClienteService.exibirClientes();
        res.status(200).json(clientes);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

export function consultarCliente(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const cliente = ClienteService.consultarCliente(id);
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
}

export function modificarCliente(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const clienteAtualizado = ClienteService.modificarCliente(id, req.body);
        res.status(200).json(clienteAtualizado);
    } catch (error: any) {
        const mensagem = error.message;

        if (mensagem.includes("não encontrado")) {
            res.status(404).json({ erro: mensagem });
        } else if (mensagem.includes("mesmo CPF")) {
            res.status(409).json({ erro: mensagem });
        } else {
            res.status(400).json({ erro: mensagem });
        }
    }
}

export function removerCliente(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        ClienteService.removerCliente(id);
        res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
}