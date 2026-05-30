import { Carro } from "../models/Carro";
import { carroRepository } from "../repositories/carroRepository";

export class carroService {
    private carroRepository = carroRepository.getInstance();

    public cadastrarCarro(dados: any): Carro {
        const {marca, modelo, ano, placa, preco, cor} = dados;

        if (!marca || !modelo || !ano || !placa || !preco || !cor)
            throw new Error("400: É necessário preencher todos os campos!");

        if (this.carroRepository.buscarPorPlaca(placa)){
            throw new Error("409: Já existe um carro com esta placa.");
        }

        const anoAtual = new Date().getFullYear();

        if(!Number.isInteger(ano) || ano < 1950 || ano> anoAtual + 1) {
            throw new Error(`400: O ano do carro deve ser um número inteiro entre 1950 a ${anoAtual + 1}.`)
        }

        if(preco <= 0){
            throw new Error("400: o preço deve ser um valor positivo maior que zero.");
        }

        const novoCarro = new Carro( marca, modelo, ano, placa, preco, cor);
        this.carroRepository.salvarCarro(novoCarro);
        return novoCarro;
    }

    public listarTodos(): Carro[] {
        return this.carroRepository.buscarTodos();
    }

    public buscarPorID( id: number): Carro {
        const carro = this.carroRepository.buscarPorID(id);

        if(!carro){
            throw new Error ("404: Carro não encontrado!");
        }

        return carro;
    }

    // falta o metodo de remover carro, porém é necessario estar pronto
    // a nota fiscal e o estoque para nao infligir as regras de negocio
    public removerCarro(id:number): void {
        this.buscarPorID(id); //metodo pré pronto
    }
}