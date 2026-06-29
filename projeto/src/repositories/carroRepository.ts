import { Carro } from "../models/Carro";
import { executarComandoSQL } from "../database/mysql";

export class carroRepository {
    private static instance: carroRepository;

    static getCreateTableQuery(): string {
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

    private constructor() {}

    public static getInstance(): carroRepository {
        if (!carroRepository.instance) {
            carroRepository.instance = new carroRepository();
        }
        return carroRepository.instance;
    }

    async salvarCarro(carro: Carro): Promise<void> {
        const query = `
            INSERT INTO Carro (id_carro, marca, modelo, ano, placa, preco, cor)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await executarComandoSQL(query, [
            carro.id_carro,
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
        ]);
    }

    async buscarTodos(): Promise<Carro[]> {
        const query = `SELECT * FROM Carro`;
        return await executarComandoSQL(query, []);
    }

    async buscarPorID(id: number): Promise<Carro | undefined> {
        const query = `SELECT * FROM Carro WHERE id_carro = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        return resultado[0];
    }

    async buscarPorPlaca(placa: string): Promise<Carro | undefined> {
        const query = `SELECT * FROM Carro WHERE placa = ?`;
        const resultado = await executarComandoSQL(query, [placa]);
        return resultado[0];
    }

    async atualizar(carro: Carro): Promise<void> {
        const query = `
            UPDATE Carro
            SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ?
            WHERE id_carro = ?
        `;
        await executarComandoSQL(query, [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.preco,
            carro.cor,
            carro.id_carro,
        ]);
    }

    async remover(id: number): Promise<void> {
        const query = `DELETE FROM Carro WHERE id_carro = ?`;
        await executarComandoSQL(query, [id]);
    }
}