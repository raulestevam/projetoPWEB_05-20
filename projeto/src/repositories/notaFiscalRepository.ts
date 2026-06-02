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
}