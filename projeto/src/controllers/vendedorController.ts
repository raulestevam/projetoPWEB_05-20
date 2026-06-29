import { Request, Response } from "express";
import { vendedorService } from "../services/vendedorService";

export class vendedorController {
    private service: vendedorService;

    constructor() {
        this.service = new vendedorService();
    }

    listarVendedores = async (req: Request, res: Response): Promise<void> => {
        try {
            const vendedores = await this.service.listarTodos();
            res.status(200).json(vendedores);
        } catch (e: any) {
            res.status(500).json({ erro: "Erro interno do servidor." });
        }
    };

    buscarVendedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }

            const vendedor = await this.service.buscarPorID(id);
            res.status(200).json(vendedor);
        } catch (e: any) {
            res.status(404).json({ erro: e.message });
        }
    };

    criarVendedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const novoVendedor = await this.service.cadastrarVendedor(req.body);
            res.status(201).json(novoVendedor);
        } catch (e: any) {
            if (e.message.includes("matrícula")) {
                res.status(409).json({ erro: e.message });
            } else {
                res.status(400).json({ erro: e.message });
            }
        }
    };

    atualizarVendedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }

            const vendedorAtualizado = await this.service.atualizarVendedor(id, req.body);
            res.status(200).json({ mensagem: "Vendedor atualizado com sucesso.", vendedor: vendedorAtualizado });
        } catch (e: any) {
            if (e.message.includes("não encontrado")) {
                res.status(404).json({ erro: e.message });
            } else if (e.message.includes("matrícula")) {
                res.status(409).json({ erro: e.message });
            } else {
                res.status(400).json({ erro: e.message });
            }
        }
    };

    deletarVendedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }

            await this.service.removerVendedor(id);
            res.status(200).json({ mensagem: "Vendedor removido com sucesso." });
        } catch (e: any) {
            if (e.message.includes("não encontrado")) {
                res.status(404).json({ erro: e.message });
            } else {
                res.status(422).json({ erro: e.message });
            }
        }
    };
}