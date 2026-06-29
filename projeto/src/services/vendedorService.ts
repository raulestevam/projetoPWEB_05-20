import { Vendedor } from "../models/Vendedor";
import { vendedorRepository } from "../repositories/vendedorRepository";
import { notaFiscalRepository } from "../repositories/notaFiscalRepository";

export class vendedorService {
    private vendedorRepository = vendedorRepository.getInstance();
    private notafiscalRepository = notaFiscalRepository.getInstance();

    async cadastrarVendedor(dados: any): Promise<Vendedor> {
        const { nome, matricula, comissao_percentual } = dados;

        if (!nome || !matricula || comissao_percentual === undefined || comissao_percentual === null)
            throw new Error("400: Nome, matrícula e comissão são obrigatórios.");

        if (comissao_percentual < 0 || comissao_percentual > 30)
            throw new Error("400: O campo comissao_percentual deve ser um número entre 0 e 30.");

        if (await this.vendedorRepository.buscarPorMatricula(matricula))
            throw new Error("409: Já existe um vendedor cadastrado com esta matrícula.");

        const novoVendedor = new Vendedor(nome, matricula, comissao_percentual);
        await this.vendedorRepository.inserirVendedor(novoVendedor);
        return novoVendedor;
    }

    async listarTodos(): Promise<Vendedor[]> {
        return await this.vendedorRepository.mostrarVendedores();
    }

    async buscarPorID(id: number): Promise<Vendedor> {
        const vendedor = await this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        return vendedor;
    }

    async atualizarVendedor(id: number, dados: any): Promise<void> {
        const vendedor = await this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        const { nome, matricula, comissao_percentual } = dados;

        if (!nome || !matricula || comissao_percentual === undefined || comissao_percentual === null)
            throw new Error("400: Nome, matrícula e comissão são obrigatórios.");

        if (comissao_percentual < 0 || comissao_percentual > 30)
            throw new Error("400: O campo comissao_percentual deve ser um número entre 0 e 30.");

        const matriculaDuplicada = await this.vendedorRepository.buscarPorMatricula(matricula);
        if (matriculaDuplicada && matriculaDuplicada.id_vendedor !== id)
            throw new Error("409: Já existe outro vendedor cadastrado com esta matrícula.");

        await this.vendedorRepository.atualizarVendedor(vendedor, dados);
    }

    async removerVendedor(id: number): Promise<void> {
        const vendedor = await this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("Vendedor não encontrado");

        const notasVinc = await this.notafiscalRepository.buscarPorVendedorId(id);
        if (notasVinc && notasVinc.length > 0)
            throw new Error("Não é permitido remover um vendedor que possua notas fiscais vinculadas.");

        await this.vendedorRepository.deletarVendedor(id);
    }

    async listarNotasDoVendedor(id: number): Promise<any[]> {
        const vendedor = await this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        return [];
    }
}