import { Vendedor } from "../models/Vendedor";
import { vendedorRepository } from "../repositories/vendedorRepository";

export class vendedorService {
    private vendedorRepository = vendedorRepository.getInstance();

    cadastrarVendedor(dados: any): Vendedor {
        const { nome, matricula, comissao_percentual } = dados;

        if (!nome || !matricula || comissao_percentual === undefined || comissao_percentual === null)
            throw new Error("400: Nome, matrícula e comissão são obrigatórios.");

        if (comissao_percentual < 0 || comissao_percentual > 30)
            throw new Error("400: O campo comissao_percentual deve ser um número entre 0 e 30.");

        if (this.vendedorRepository.buscarPorMatricula(matricula))
            throw new Error("409: Já existe um vendedor cadastrado com esta matrícula.");

        const novoVendedor = new Vendedor(nome, matricula, comissao_percentual);
        this.vendedorRepository.inserirVendedor(novoVendedor);
        return novoVendedor;
    }

    listarTodos(): Vendedor[] {
        return this.vendedorRepository.mostrarVendedores();
    }

    buscarPorID(id: number): Vendedor {
        const vendedor = this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        return vendedor;
    }

    atualizarVendedor(id: number, dados: any): void {
        const vendedor = this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        const { nome, matricula, comissao_percentual } = dados;

        if (!nome || !matricula || comissao_percentual === undefined || comissao_percentual === null)
            throw new Error("400: Nome, matrícula e comissão são obrigatórios.");

        if (comissao_percentual < 0 || comissao_percentual > 30)
            throw new Error("400: O campo comissao_percentual deve ser um número entre 0 e 30.");

        const matriculaDuplicada = this.vendedorRepository.buscarPorMatricula(matricula);
        if (matriculaDuplicada && matriculaDuplicada.id_vendedor !== id)
            throw new Error("409: Já existe outro vendedor cadastrado com esta matrícula.");

        this.vendedorRepository.atualizarVendedor(vendedor, dados);
    }

    // Método incompleto, depende de notaFiscalRepository para verificar
    removerVendedor(id: number): void {
        const vendedor = this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        this.vendedorRepository.deletarVendedor(id);
    }

    // Método incompleto, depende de notaFiscalRepository para buscar
    listarNotasDoVendedor(id: number): any[] {
        const vendedor = this.vendedorRepository.buscarVendedor(id);

        if (!vendedor)
            throw new Error("404: Vendedor não encontrado.");

        return [];
    }
}