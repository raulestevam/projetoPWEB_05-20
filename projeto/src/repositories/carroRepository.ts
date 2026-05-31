import { Carro } from "../models/Carro"; 

export class carroRepository{
    private static instance: carroRepository;
    private carros: Carro[] = [];

    private constructor() {}

    public static getInstance(): carroRepository {
        if(!carroRepository.instance){ 
            carroRepository.instance = new carroRepository();
        }
        return carroRepository.instance;
    }

    salvarCarro( carro: Carro): void {
        this.carros.push(carro);
    }

    buscarTodos(): Carro[] {
        return this.carros 
    }

    buscarPorID(id: number): Carro | undefined {
        return this.carros.find(p => p.id_carro === id);
    }

    buscarPorPlaca (placa: string): Carro | undefined {
        return this.carros.find(p=> p.placa === placa)
    }

    atualizar (carroAtt: Carro): void {
        const indice = this.carros.findIndex (p => p.id_carro === carroAtt.id_carro);
        if (indice !== -1){
            this.carros[indice] = carroAtt;
        }
    }

    remover(id: number): void {
    const indice = this.carros.findIndex(c => c.id_carro === id);
    if (indice !== -1) {
        this.carros.splice(indice, 1);
    }
}
}