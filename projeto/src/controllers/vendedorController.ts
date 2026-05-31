import { Request, Response } from "express";
import{vendedorService} from "../services/vendedorService" //criar o service junto com nota fiscal

export class vendedorController{
    private vendedorService: vendedorService = new vendedorService(); //criar vendedorService, não esquecer
    
    listarVendedores(req: Request, res: Response): void {
        try {
            const vendedores = this.vendedorService.exibirVendedores();
            res.status(200).json(vendedores);
        } catch (error: any) {
            res.status(404).json({ mensagem: error.message });
        }
    }
    buscarVendedor(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const vendedor = this.vendedorService.consultarVendedor(id);
            res.status(200).json(vendedor);
        } catch (error: any) {
            res.status(404).json({ mensagem: error.message });
        }
    }
    criarVendedor(req: Request, res: Response): void {
        try {
            const novoVendedor = this.vendedorService.cadastrarVendedor(req.body);
            res.status(201).json(novoVendedor);
        } catch (error: any) {
            // erro da matricula duplicada 409
            if (error.message.includes("matrícula")) {
                res.status(409).json({ mensagem: error.message });
            } else {
                res.status(400).json({ mensagem: error.message });
            }
        }
    }
    atualizarVendedor(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            this.vendedorService.modificarVendedor(id, req.body);
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
    deletarVendedor(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            this.vendedorService.removerVendedor(id);
            res.status(200).json({ mensagem: "Vendedor removido com sucesso." });
        } catch (error: any) {
            if (error.message.includes("não encontrado")) {
                res.status(404).json({ mensagem: error.message });
            } else {
                // possui notas vinculadas → 422 Unprocessable
                res.status(422).json({ mensagem: error.message });
            }
        }
    }
    
    //função dependente da nota fiscal
    listarNotasDoVendedor(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const notas = this.vendedorService.listarNotasDoVendedor(id);
            res.status(200).json(notas);
        } catch (error: any) {
            res.status(404).json({ mensagem: error.message });
        }
    }

}