import { Cliente } from "../models/Cliente";
import { executarComandoSQL } from "../database/mysql";

export class clienteRepository {
    private static instance: clienteRepository;

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS Cliente (
                id_cliente      BIGINT PRIMARY KEY,
                nome            VARCHAR(150) NOT NULL,
                cpf             VARCHAR(14) NOT NULL UNIQUE,
                telefone        VARCHAR(20) NOT NULL,
                email           VARCHAR(150),
                cidade          VARCHAR(100)
            );
        `;
    }

    private constructor() {}

    public static getInstance(): clienteRepository {
        if (!this.instance) {
            this.instance = new clienteRepository();
        }
        return this.instance;
    }

    async inserirCliente(cliente: Cliente): Promise<void> {
        const query = `
            INSERT INTO Cliente (id_cliente, nome, cpf, telefone, email, cidade)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await executarComandoSQL(query, [
            cliente.id_cliente,
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email ?? null,
            cliente.cidade ?? null,
        ]);
    }

    async mostrarClientes(): Promise<Cliente[]> {
        const query = `SELECT * FROM Cliente`;
        return await executarComandoSQL(query, []);
    }

    async buscarCliente(id: number): Promise<Cliente | undefined> {
        const query = `SELECT * FROM Cliente WHERE id_cliente = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        return resultado[0];
    }

    async buscarPorCpf(cpf: string): Promise<Cliente | undefined> {
        const query = `SELECT * FROM Cliente WHERE cpf = ?`;
        const resultado = await executarComandoSQL(query, [cpf]);
        return resultado[0];
    }

    async atualizarCliente(cliente: Cliente): Promise<void> {
        const query = `
            UPDATE Cliente
            SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?
            WHERE id_cliente = ?
        `;
        await executarComandoSQL(query, [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email ?? null,
            cliente.cidade ?? null,
            cliente.id_cliente,
        ]);
    }

    async deletarCliente(id: number): Promise<void> {
        const query = `DELETE FROM Cliente WHERE id_cliente = ?`;
        await executarComandoSQL(query, [id]);
    }
}