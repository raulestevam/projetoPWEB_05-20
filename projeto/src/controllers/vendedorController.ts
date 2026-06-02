import { Request, Response } from "express";
import{vendedorService} from "../services/vendedorService" //criar o service junto com nota fiscal

const service = new vendedorService();
 
export function listarVendedores(req: Request, res: Response): void {
    try {
        const vendedores = service.listarTodos();
        res.status(200).json(vendedores);
    } catch (error: any) {
        res.status(404).json({ mensagem: error.message });
    }
}
 
export function buscarVendedor(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        const vendedor = service.buscarPorID(id);
        res.status(200).json(vendedor);
    } catch (error: any) {
        res.status(404).json({ mensagem: error.message });
    }
}
 
export function criarVendedor(req: Request, res: Response): void {
    try {
        const novoVendedor = service.cadastrarVendedor(req.body);
        res.status(201).json(novoVendedor);
    } catch (error: any) {
        if (error.message.includes("matrícula")) {
            res.status(409).json({ mensagem: error.message });
        } else {
            res.status(400).json({ mensagem: error.message });
        }
    }
}
 
export function atualizarVendedor(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        service.atualizarVendedor(id, req.body);
        res.status(200).json({ mensagem: "Vendedor atualizado com sucesso." });
    } catch (error: any) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({ mensagem: error.message });
        } else if (error.message.includes("matrícula")) {
            res.status(409).json({ mensagem: error.message });
        } else {
            res.status(400).json({ mensagem: error.message });
        }
    }
}
 
export function deletarVendedor(req: Request, res: Response): void {
    try {
        const id = Number(req.params.id);
        service.removerVendedor(id);
        res.status(200).json({ mensagem: "Vendedor removido com sucesso." });
    } catch (error: any) {
        if (error.message.includes("não encontrado")) {
            res.status(404).json({ mensagem: error.message });
        } else {
            res.status(422).json({ mensagem: error.message });
        }
    }
}