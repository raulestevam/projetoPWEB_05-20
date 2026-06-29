import { Vendedor } from "../models/Vendedor";
import { executarComandoSQL } from "../database/mysql";

export class vendedorRepository {
    private static instance: vendedorRepository;

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Vendedor (
                id_vendedor         BIGINT PRIMARY KEY,
                nome                VARCHAR(150) NOT NULL,
                matricula           VARCHAR(50) NOT NULL UNIQUE,
                comissao_percentual DECIMAL(5,2) NOT NULL
            );
        `;
    }

    private constructor() {}

    static getInstance(): vendedorRepository {
        if (!vendedorRepository.instance) {
            vendedorRepository.instance = new vendedorRepository();
        }
        return vendedorRepository.instance;
    }

    async inserirVendedor(vendedor: Vendedor): Promise<void> {
        const query = `
            INSERT INTO Vendedor (id_vendedor, nome, matricula, comissao_percentual)
            VALUES (?, ?, ?, ?)
        `;
        await executarComandoSQL(query, [
            vendedor.id_vendedor,
            vendedor.nome,
            vendedor.matricula,
            vendedor.comissao_percentual,
        ]);
    }

    async mostrarVendedores(): Promise<Vendedor[]> {
        const query = `SELECT * FROM Vendedor`;
        return await executarComandoSQL(query, []);
    }

    async buscarVendedor(id: number): Promise<Vendedor | undefined> {
        const query = `SELECT * FROM Vendedor WHERE id_vendedor = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        return resultado[0];
    }

    async buscarPorMatricula(matricula: string): Promise<Vendedor | undefined> {
        const query = `SELECT * FROM Vendedor WHERE matricula = ?`;
        const resultado = await executarComandoSQL(query, [matricula]);
        return resultado[0];
    }

    async atualizarVendedor(vendedor: Vendedor, novosDados: any): Promise<void> {
        const query = `
            UPDATE Vendedor
            SET nome = ?, matricula = ?, comissao_percentual = ?
            WHERE id_vendedor = ?
        `;
        await executarComandoSQL(query, [
            novosDados.nome,
            novosDados.matricula,
            novosDados.comissao_percentual,
            vendedor.id_vendedor,
        ]);
    }

    async deletarVendedor(id: number): Promise<void> {
        const query = `DELETE FROM Vendedor WHERE id_vendedor = ?`;
        await executarComandoSQL(query, [id]);
    }
}