"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendedorRepository = void 0;
const mysql_1 = require("../database/mysql");
class vendedorRepository {
    static instance;
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Vendedor (
                id_vendedor         BIGINT PRIMARY KEY,
                nome                VARCHAR(150) NOT NULL,
                matricula           VARCHAR(50) NOT NULL UNIQUE,
                comissao_percentual DECIMAL(5,2) NOT NULL
            );
        `;
    }
    constructor() { }
    static getInstance() {
        if (!vendedorRepository.instance) {
            vendedorRepository.instance = new vendedorRepository();
        }
        return vendedorRepository.instance;
    }
    async inserirVendedor(vendedor) {
        const query = `
            INSERT INTO Vendedor (id_vendedor, nome, matricula, comissao_percentual)
            VALUES (?, ?, ?, ?)
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            vendedor.id_vendedor,
            vendedor.nome,
            vendedor.matricula,
            vendedor.comissao_percentual,
        ]);
    }
    async mostrarVendedores() {
        const query = `SELECT * FROM Vendedor`;
        return await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async buscarVendedor(id) {
        const query = `SELECT * FROM Vendedor WHERE id_vendedor = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado[0];
    }
    async buscarPorMatricula(matricula) {
        const query = `SELECT * FROM Vendedor WHERE matricula = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [matricula]);
        return resultado[0];
    }
    async atualizarVendedor(vendedor, novosDados) {
        const query = `
            UPDATE Vendedor
            SET nome = ?, matricula = ?, comissao_percentual = ?
            WHERE id_vendedor = ?
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            novosDados.nome,
            novosDados.matricula,
            novosDados.comissao_percentual,
            vendedor.id_vendedor,
        ]);
    }
    async deletarVendedor(id) {
        const query = `DELETE FROM Vendedor WHERE id_vendedor = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [id]);
    }
}
exports.vendedorRepository = vendedorRepository;
