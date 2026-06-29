import { Estoque } from "../models/Estoque";
import { executarComandoSQL } from "../database/mysql";

export class estoqueRepository {
    private static instance: estoqueRepository;

    static getCreateTableQuery(): string {
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

    private constructor() {}

    public static getInstance(): estoqueRepository {
        if (!this.instance) {
            this.instance = new estoqueRepository();
        }
        return this.instance;
    }

    async inserirEstoque(estoque: Estoque): Promise<void> {
        const query = `
            INSERT INTO Estoque (id_estoque, id_carro, quantidade, localizacao_patio, data_entrada)
            VALUES (?, ?, ?, ?, ?)
        `;
        await executarComandoSQL(query, [
            estoque.id_estoque,
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada,
        ]);
    }

    async listarEstoques(): Promise<Estoque[]> {
        const query = `SELECT * FROM Estoque`;
        return await executarComandoSQL(query, []);
    }

    async buscarEstoquePorId(id: number): Promise<Estoque | undefined> {
        const query = `SELECT * FROM Estoque WHERE id_estoque = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        return resultado[0];
    }

    async buscarEstoqueCarro(id_carro: number): Promise<Estoque | undefined> {
        const query = `SELECT * FROM Estoque WHERE id_carro = ?`;
        const resultado = await executarComandoSQL(query, [id_carro]);
        return resultado[0];
    }

    async atualizarEstoque(estoque: Estoque): Promise<void> {
        const query = `
            UPDATE Estoque
            SET id_carro = ?, quantidade = ?, localizacao_patio = ?, data_entrada = ?
            WHERE id_estoque = ?
        `;
        await executarComandoSQL(query, [
            estoque.id_carro,
            estoque.quantidade,
            estoque.localizacao_patio,
            estoque.data_entrada,
            estoque.id_estoque,
        ]);
    }

    async deletarEstoque(id: number): Promise<void> {
        const query = `DELETE FROM Estoque WHERE id_estoque = ?`;
        await executarComandoSQL(query, [id]);
    }
}