import { NotaFiscal } from "../models/NotaFiscal";
import { executarComandoSQL } from "../database/mysql";

export class notaFiscalRepository {
    private static instance: notaFiscalRepository;

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS NotaFiscal (
                id_nota         BIGINT PRIMARY KEY,
                numero_nota     VARCHAR(50) NOT NULL UNIQUE,
                data_emissao    DATETIME NOT NULL,
                valor_total     DECIMAL(10,2) NOT NULL,
                id_cliente      BIGINT NOT NULL,
                id_vendedor     BIGINT NOT NULL,
                id_carro        BIGINT NOT NULL,
                FOREIGN KEY (id_cliente)  REFERENCES Cliente(id_cliente),
                FOREIGN KEY (id_vendedor) REFERENCES Vendedor(id_vendedor),
                FOREIGN KEY (id_carro)    REFERENCES Carro(id_carro)
            );
        `;
    }

    private constructor() {}

    public static getInstance(): notaFiscalRepository {
        if (!this.instance) {
            this.instance = new notaFiscalRepository();
        }
        return this.instance;
    }

    async listarNotas(): Promise<NotaFiscal[]> {
        const query = `SELECT * FROM NotaFiscal`;
        return await executarComandoSQL(query, []);
    }

    async buscarNotaPorId(id: number): Promise<NotaFiscal | undefined> {
        const query = `SELECT * FROM NotaFiscal WHERE id_nota = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        return resultado[0];
    }

    async criarNota(nota: NotaFiscal): Promise<void> {
        const query = `
            INSERT INTO NotaFiscal (id_nota, numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await executarComandoSQL(query, [
            nota.id_nota,
            nota.numero_nota,
            nota.data_emissao,
            nota.valor_total,
            nota.id_cliente,
            nota.id_vendedor,
            nota.id_carro,
        ]);
    }

    async buscarPorCarroId(id_carro: number): Promise<NotaFiscal[]> {
        const query = `SELECT * FROM NotaFiscal WHERE id_carro = ?`;
        return await executarComandoSQL(query, [id_carro]);
    }

    async buscarPorClienteId(id_cliente: number): Promise<NotaFiscal[]> {
        const query = `SELECT * FROM NotaFiscal WHERE id_cliente = ?`;
        return await executarComandoSQL(query, [id_cliente]);
    }

    async buscarPorVendedorId(id_vendedor: number): Promise<NotaFiscal[]> {
        const query = `SELECT * FROM NotaFiscal WHERE id_vendedor = ?`;
        return await executarComandoSQL(query, [id_vendedor]);
    }
    //busca dentro do banco em vez de pela memória
    async buscarPorNumeroNota(numero_nota: string): Promise<NotaFiscal | undefined> {
        const query = `SELECT * FROM NotaFiscal WHERE numero_nota = ?`;
        const resultado = await executarComandoSQL(query, [numero_nota]);
        return resultado[0];
    }
}