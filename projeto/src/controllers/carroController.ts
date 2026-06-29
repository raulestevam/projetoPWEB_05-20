import { Request, Response } from "express";
import { carroService } from "../services/carroService";

const CarroService = new carroService();

export class carroController {

    cadastrarCarro = async (req: Request, res: Response): Promise<void> => {
        try {
            const novoCarro = await CarroService.cadastrarCarro(req.body);
            res.status(201).json({ mensagem: "Carro cadastrado com sucesso!", carro: novoCarro });
        } catch (e: any) {
            const mensagem = e.message;

            if (mensagem.includes("409: Já existe")) {
                res.status(409).json({ erro: mensagem });
            } else if (mensagem.includes("400: É necessário")) {
                res.status(400).json({ erro: mensagem });
            } else if (mensagem.includes("400: O ano do carro")) {
                res.status(400).json({ erro: mensagem });
            } else if (mensagem.includes("400: o preço deve")) {
                res.status(400).json({ erro: mensagem });
            }
        }
    };

    listarTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const carros = await CarroService.listarTodos();
            res.status(200).json(carros);
        } catch (error: any) {
            res.status(500).json({ erro: "ERRO interno do servidor" });
        }
    };

    buscarPorID = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(String(req.params.id), 10);
            const carro = await CarroService.buscarPorID(id);
            res.status(200).json(carro);
        } catch (e: any) {
            const mensagem = e.message;

            if (mensagem.includes("404: Carro não")) {
                res.status(404).json({ erro: mensagem });
            }
        }
    };

    atualizarCarro = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(String(req.params.id), 10);

            if (isNaN(id)) {
                res.status(400).json({ erro: "O ID informado na URL deve ser um número." });
                return;
            }

            const carroAtualizado = await CarroService.atualizarCarro(id, req.body);
            res.status(200).json({ mensagem: "Carro foi atualizado com sucesso!" });
        } catch (e: unknown) {
            res.status(400).json({ Mensagem: (e as Error).message });
        }
    };

    removerCarro = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(String(req.params.id), 10);
            await CarroService.removerCarro(id);
            res.status(200).json({ mensagem: "Carro removido com sucesso." });
        } catch (e: any) {
            const mensagem = e.message;

            if (mensagem.includes("Carro não")) {
                res.status(404).json({ error: mensagem });
            } else {
                res.status(422).json({ erro: mensagem });
            }
        }
    };

    listarCarrosComEstoque = async (req: Request, res: Response): Promise<void> => {
        try {
            const carros = await CarroService.listarCarrosComEstoque();
            res.status(200).json(carros);
        } catch (e: unknown) {
            res.status(400).json({ erro: (e as Error).message });
        }
    };
}