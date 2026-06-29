"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
class estoqueRepository {
    static instance;
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Estoque (
                id_estoque          BIGINT PRIMARY KEY,
                id_carro            BIGINT NOT NULL,
                quantidade          INT NOT NULL,
                localizacao_patio   VARCHAR(100) NOT NULL,
                data_entrada        DATETIME NOT NULL,
                FOREIGN KEY (id_carro) REFERENCES Carro(id_carro)
            );
        `;
    }
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new estoqueRepository();
        }
        return this.instance;
    }
    async inserirEstoque(estoque) {
        const query = `
            INSERT INTO Estoque (id_estoque, id_carro, quantidade, localizacao_patio, data_entrada)
            VALUES (?, ?, ?, ?, ?)
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            estoque.id_estoque,
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada,
        ]);
    }
    async listarEstoques() {
        const query = `SELECT * FROM Estoque`;
        return await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async buscarEstoquePorId(id) {
        const query = `SELECT * FROM Estoque WHERE id_estoque = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado[0];
    }
    async buscarEstoqueCarro(id_carro) {
        const query = `SELECT * FROM Estoque WHERE id_carro = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id_carro]);
        return resultado[0];
    }
    async atualizarEstoque(estoque) {
        const query = `
            UPDATE Estoque
            SET id_carro = ?, quantidade = ?, localizacao_patio = ?, data_entrada = ?
            WHERE id_estoque = ?
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada,
            estoque.id_estoque,
        ]);
    }
    async deletarEstoque(id) {
        const query = `DELETE FROM Estoque WHERE id_estoque = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [id]);
    }
}
exports.estoqueRepository = estoqueRepository;
