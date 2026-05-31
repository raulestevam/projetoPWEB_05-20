import { Carro } from "../models/Carro";
import { carroRepository } from "../repositories/carroRepository";

export class carroService {
    private carroRepository = carroRepository.getInstance();

    cadastrarCarro(dados: any): Carro {
        const {marca, modelo, ano, placa, preco, cor} = dados;

        if (!marca || !modelo || !ano || !placa || preco === undefined || preco === null || !cor)
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

    listarTodos(): Carro[] {
        return this.carroRepository.buscarTodos();
    }

    buscarPorID( id: number): Carro {
        const carro = this.carroRepository.buscarPorID(id);

        if(!carro){
            throw new Error ("404: Carro não encontrado!");
        }

        return carro;
    }

    atualizarCarro(id: number, dadosCarro: any): Carro {
    const { marca, modelo, ano, placa, preco, cor } = dadosCarro;

    const carroExiste = this.carroRepository.buscarPorID(id);
    if (!carroExiste) {
        throw new Error("404:Carro não encontrado para atualização.");
    }

    if (!marca || !modelo || !ano || !placa || preco === undefined || preco === null || !cor) {
        throw new Error("400:Todos os campos são obrigatórios para a atualização.");
    }

    const carroComMesmaPlaca = this.carroRepository.buscarPorPlaca(placa);
    if (carroComMesmaPlaca && carroComMesmaPlaca.id_carro !== id) {
        throw new Error("409:Já existe outro carro cadastrado com esta placa.");
    }

    const anoAtual = new Date().getFullYear();
    if (!Number.isInteger(ano) || ano < 1950 || ano > anoAtual + 1) {
        throw new Error(`400:O ano deve ser um número inteiro entre 1950 e ${anoAtual + 1}.`);
    }

    if (preco <= 0) {
        throw new Error("400:O preço deve ser um valor positivo maior que zero.");
    }

    carroExiste.marca = marca;
    carroExiste.modelo = modelo;
    carroExiste.ano = ano;
    carroExiste.placa = placa;
    carroExiste.preco = preco;
    carroExiste.cor = cor;

    this.carroRepository.atualizar(carroExiste);

    return carroExiste;
}

    // falta o metodo de remover carro, porém é necessario estar pronto
    // a nota fiscal e o estoque para nao infligir as regras de negocio
    removerCarro(id:number): void {
        this.buscarPorID(id); //metodo pré pronto
        this.carroRepository.remover(id);
    }

}