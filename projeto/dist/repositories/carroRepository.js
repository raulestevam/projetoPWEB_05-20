"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carroRepository = void 0;
const mysql_1 = require("../database/mysql");
class carroRepository {
    static instance;
    static getCreateTableQuery() {
        return `
            CREATE TABLE IF NOT EXISTS Carro (
                id_carro        BIGINT PRIMARY KEY,
                marca           VARCHAR(100) NOT NULL,
                modelo          VARCHAR(100) NOT NULL,
                ano             INT NOT NULL,
                placa           VARCHAR(10) NOT NULL UNIQUE,
                preco           DECIMAL(10,2) NOT NULL,
                cor             VARCHAR(50) NOT NULL
            );
        `;
    }
    constructor() { }
    static getInstance() {
        if (!carroRepository.instance) {
            carroRepository.instance = new carroRepository();
        }
        return carroRepository.instance;
    }
    async salvarCarro(carro) {
        const query = `
            INSERT INTO Carro (id_carro, marca, modelo, ano, placa, preco, cor)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            carro.id_carro,
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
        ]);
    }
    async buscarTodos() {
        const query = `SELECT * FROM Carro`;
        return await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async buscarPorID(id) {
        const query = `SELECT * FROM Carro WHERE id_carro = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado[0];
    }
    async buscarPorPlaca(placa) {
        const query = `SELECT * FROM Carro WHERE placa = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [placa]);
        return resultado[0];
    }
    async atualizar(carro) {
        const query = `
            UPDATE Carro
            SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ?
            WHERE id_carro = ?
        `;
        await (0, mysql_1.executarComandoSQL)(query, [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
            carro.id_carro,
        ]);
    }
    async remover(id) {
        const query = `DELETE FROM Carro WHERE id_carro = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [id]);
    }
}
exports.carroRepository = carroRepository;
