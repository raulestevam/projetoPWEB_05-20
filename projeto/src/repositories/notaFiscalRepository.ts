import { NotaFiscal } from "../models/NotaFiscal";

export class notaFiscalRepository {
    private static instance: notaFiscalRepository;
    private notas: NotaFiscal[] = [];
    
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