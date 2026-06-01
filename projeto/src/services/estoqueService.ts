import { Estoque } from "../models/Estoque";
import { estoqueRepository } from "../repositories/estoqueRepository";
import { carroRepository } from "../repositories/carroRepository";

export class estoqueService {
    estoqueRepository: estoqueRepository = estoqueRepository.getInstance();
    carroRepository: carroRepository = carroRepository.getInstance();

    cadastrarEstoque(estoqueInfo: any): Estoque {
        const { id_carro, quantidade, localizacao_patio, data_entrada } = estoqueInfo;

        if(!id_carro || quantidade === undefined || !localizacao_patio || !data_entrada ) {
            throw new Error ("Informações obrigatórias incompletas. É necessário informar o id_carro, quantidade, localizacao_patio e data_entrada.");
        }

        const carroExiste = this.carroRepository.buscarPorID(id_carro);
        
        if (!carroExiste) {
            throw new Error("O carro referenciado não existe no sistema.");
        }

        const estoquesCadastrados = this.estoqueRepository.listarEstoques();
        const estoqueExiste = estoquesCadastrados.some(estoque => estoque.id_carro === id_carro);

        if(estoqueExiste) {
            throw new Error ("Já existe um registro de estoque vinculado ao carro fornecido");
        }

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            throw new Error("O campo quantidade deve ser um inteiro maior ou igual a zero.");
        }

        const dataEntradaObj = new Date(data_entrada);
        
        if (isNaN(dataEntradaObj.getTime())) {
            throw new Error("A data de entrada fornecida é inválida.");
        }

        const dataHoje = new Date();

        if (dataEntradaObj.getTime() > dataHoje.getTime()) {
            throw new Error("A data de entrada não pode ser uma data futura em relação à data atual do servidor.");
        }

        const novoEstoque = new Estoque(id_carro, quantidade, localizacao_patio, dataEntradaObj);
        this.estoqueRepository.inserirEstoque(novoEstoque);

        return novoEstoque;
    }

    listarEstoques(): Estoque[] {
        return this.estoqueRepository.listarEstoques();
    }

    buscarEstoquePorId(id: number): Estoque {
        const estoque = this.estoqueRepository.buscarEstoquePorId(id);
        
        if (!estoque) {
            throw new Error("Registro de estoque não encontrado."); 
        }
        
        return estoque;
    }

    buscarEstoqueCarro(id: number): Estoque {
        const estoque = this.estoqueRepository.buscarEstoqueCarro(id);
        
        if (!estoque) {
            throw new Error("Estoque não encontrado para o carro informado."); 
        }
        
        return estoque;
    }

    atualizarEstoque(id: number, dadosAtualizacao: any): Estoque {
        const estoqueExistente = this.estoqueRepository.buscarEstoquePorId(id);

        if (!estoqueExistente) {
            throw new Error("Registro de estoque não encontrado.");
        }

        const { quantidade, localizacao_patio } = dadosAtualizacao;

        if(!quantidade && !localizacao_patio) {
            throw new Error ("Quantidade e localização não informados. É necessário informar ao menos um dos campos para atualizar.");
        }

        if (quantidade !== undefined) {
            if (!Number.isInteger(quantidade) || quantidade < 0) {
                throw new Error("O campo quantidade deve ser um inteiro maior ou igual a zero.");
            }
            estoqueExistente.quantidade = quantidade;
        }

        if (localizacao_patio) {
            estoqueExistente.localizacao_patio = localizacao_patio;
        }

        this.estoqueRepository.atualizarEstoque(estoqueExistente);
        return estoqueExistente;
    }

    deletarEstoque(id: number) {
        const estoqueExistente = this.estoqueRepository.buscarEstoquePorId(id);

        if (!estoqueExistente) {
            throw new Error("Registro de estoque não encontrado.");
        }

        this.estoqueRepository.deletarEstoque(id);
    }
}