import { NotaFiscal } from "../models/NotaFiscal";

export class notaFiscalRepository {
    private static instance: notaFiscalRepository;
    private notas: NotaFiscal[] = [];

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
        if(!this.instance){
            this.instance = new notaFiscalRepository();
        }
        return this.instance;
    }

    listarNotas(): NotaFiscal[] {
        return this.notas;
    }
    
    buscarNotaPorId(id: number): NotaFiscal | undefined {
        return this.notas.find(n => n.id_nota === id);
    }

    criarNota(nota: NotaFiscal) {
        this.notas.push(nota);
    }

    buscarPorCarroId(id_carro: number) {
        return this.notas.filter(nota => nota.id_carro === id_carro);
    }

    buscarPorClienteId(id_cliente: number) {
        return this.notas.filter(nota => nota.id_cliente === id_cliente);
    }

    buscarPorVendedorId(id_vendedor: number) {
        return this.notas.filter(nota => nota.id_vendedor === id_vendedor);
    }
}