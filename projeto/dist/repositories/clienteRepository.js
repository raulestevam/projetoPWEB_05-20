"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteRepository = void 0;
const mysql_1 = require("../database/mysql");
class clienteRepository {
    static instance;
    static getCreateTableQuery() {
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
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new clienteRepository();
        }
        return this.instance;
    }
    async inserirCliente(cliente) {
        const query = `
            INSERT INTO Cliente (id_cliente, nome, cpf, telefone, email, cidade)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            cliente.id_cliente,
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email ?? null,
            cliente.cidade ?? null,
        ]);
    }
    async mostrarClientes() {
        const query = `SELECT * FROM Cliente`;
        return await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async buscarCliente(id) {
        const query = `SELECT * FROM Cliente WHERE id_cliente = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado[0];
    }
    async buscarPorCpf(cpf) {
        const query = `SELECT * FROM Cliente WHERE cpf = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
        return resultado[0];
    }
    async atualizarCliente(cliente) {
        const query = `
            UPDATE Cliente
            SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?
            WHERE id_cliente = ?
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email ?? null,
            cliente.cidade ?? null,
            cliente.id_cliente,
        ]);
    }
    async deletarCliente(id) {
        const query = `DELETE FROM Cliente WHERE id_cliente = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [id]);
    }
}
exports.clienteRepository = clienteRepository;
