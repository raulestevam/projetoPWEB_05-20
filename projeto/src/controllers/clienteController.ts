import { Request, Response } from "express";
import { clienteService } from "../services/clienteService";

const ClienteService = new clienteService();

export function cadastrarCliente(req: Request, res: Response) {
    try {
        const novoCliente = ClienteService.cadastrarCliente(req.body);
        res.status(201).json({
            mensagem: "Cliente cadastrado com sucesso!",
            cliente: novoCliente
        });
    } catch(error: any) {
        res.status(400).json({ message: error.message });
    }
}

export function exibirClientes(req: Request, res: Response) {
    try {
        const clientes = ClienteService.exibirClientes();
        res.status(200).json(clientes);
    } catch(error: any) {
        res.status(404).json({ message: error.message });
    }
}

export function consultarCliente(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const cliente = ClienteService.consultarCliente(id);
        res.status(200).json(cliente);
    } catch(error: any) {
        res.status(404).json({ message: error.message });
    }
}

export function modificarCliente(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        ClienteService.modificarCliente(id, req.body);
        res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
    } catch(error: any) {
        res.status(400).json({ message: error.message });
    }
}

export function removerCliente(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        ClienteService.removerCliente(id);
        res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
    } catch(error: any) {
        res.status(404).json({ message: error.message });
    }
}