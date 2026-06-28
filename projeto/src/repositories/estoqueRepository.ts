import { Estoque } from "../models/Estoque";

export class estoqueRepository {
    private static instance: estoqueRepository;
    private estoques: Estoque[] = [];

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
        if(!this.instance){
            this.instance = new estoqueRepository();
        }
        return this.instance;
    }

    inserirEstoque(estoque: Estoque){
        this.estoques.push(estoque);
    }

    listarEstoques(): Estoque[] {
        return this.estoques;
    }

    buscarEstoquePorId(id: number): Estoque|undefined {
        return this.estoques.find(estoque => estoque.id_estoque === id);
    }

    buscarEstoqueCarro(id: number): Estoque|undefined {
        return this.estoques.find(estoque => estoque.id_carro === id);
    }

    atualizarEstoque(estoqueAtualizado: Estoque) {
        const estoqueIndex = this.estoques.findIndex(estoque => estoque.id_estoque === estoqueAtualizado.id_estoque);
        
        if (estoqueIndex !== -1) {
            this.estoques[estoqueIndex] = estoqueAtualizado;
        }
    }

    deletarEstoque(id:number) {
        const estoqueIndex = this.estoques.findIndex(estoque => estoque.id_estoque === id);
        
        if (estoqueIndex !== -1) {
            this.estoques.splice(estoqueIndex, 1);
        }
    }
}