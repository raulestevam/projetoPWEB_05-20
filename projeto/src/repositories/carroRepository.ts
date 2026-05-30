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

    public salvarCarro( carro: Carro): void {
        this.carros.push(carro);
    }

    public buscarTodos(): Carro[] {
        return this.carros 
    }

    public buscarPorID(id: number): Carro | undefined {
        return this.carros.find(p => p.id_carro === id);
    }

    public buscarPorPlaca (placa: string): Carro | undefined {
        return this.carros.find(p=> p.placa === placa)
    }

    public atualizarCarro (carroAtt: Carro): void {
        const indice = this.carros.findIndex (p => p.id_carro === carroAtt.id_carro);
        if (indice !== -1){
            this.carros[indice] = carroAtt;
        }
    }

    public removerCarro (id:number): void {
        this.carros.filter(p => p.id_carro !== id)
    }
}