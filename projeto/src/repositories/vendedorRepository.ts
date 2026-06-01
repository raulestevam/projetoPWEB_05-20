import { Vendedor } from "../models/Vendedor";

export class vendedorRepository{
    private static instance: vendedorRepository;
    private vendedores: Vendedor[] = [];
 
    private constructor() {}

    // vendedor vazio
    static getInstance(): vendedorRepository {
        if (!vendedorRepository.instance) {
            vendedorRepository.instance = new vendedorRepository();
        }
        return vendedorRepository.instance;
    }

    //inseir vendedor
    inserirVendedor(vendedor: Vendedor): void {
        this.vendedores.push(vendedor);
    }

    //mostrar vendedores
    mostrarVendedores(): Vendedor[] {
        return this.vendedores;
    }

    //buscar vendedores
    buscarVendedor(id: number): Vendedor | undefined {
        return this.vendedores.find(v => v.id_vendedor === id);
    }

    //buscar por matrícula
    buscarPorMatricula(matricula: string): Vendedor | undefined {
        return this.vendedores.find(v => v.matricula === matricula);
    }

    //atualizar vendedor
    atualizarVendedor(vendedor: Vendedor, novosDados: any): void {
        vendedor.nome = novosDados.nome;
        vendedor.matricula = novosDados.matricula;
        vendedor.comissao_percentual = novosDados.comissao_percentual;
    }

    //deletar vendedor
    deletarVendedor(id: number): void {
        this.vendedores = this.vendedores.filter(v => v.id_vendedor !== id);
    }
}
