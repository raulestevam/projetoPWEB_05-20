"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carroService = void 0;
const Carro_1 = require("../models/Carro");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class carroService {
    carroRepository = carroRepository_1.carroRepository.getInstance();
    estoquerepository = estoqueRepository_1.estoqueRepository.getInstance();
    notafiscalRepository = notaFiscalRepository_1.notaFiscalRepository.getInstance();
    async cadastrarCarro(dados) {
        const { marca, modelo, ano, placa, preco, cor } = dados;
        if (!marca || !modelo || !ano || !placa || preco === undefined || preco === null || !cor)
            throw new Error("400: É necessário preencher todos os campos!");
        if (await this.carroRepository.buscarPorPlaca(placa))
            throw new Error("409: Já existe um carro com esta placa.");
        const anoAtual = new Date().getFullYear();
        if (!Number.isInteger(ano) || ano < 1950 || ano > anoAtual + 1)
            throw new Error(`400: O ano do carro deve ser um número inteiro entre 1950 a ${anoAtual + 1}.`);
        if (preco <= 0)
            throw new Error("400: o preço deve ser um valor positivo maior que zero.");
        const novoCarro = new Carro_1.Carro(marca, modelo, ano, placa, preco, cor);
        await this.carroRepository.salvarCarro(novoCarro);
        return novoCarro;
    }
    async listarTodos() {
        return await this.carroRepository.buscarTodos();
    }
    async buscarPorID(id) {
        const carro = await this.carroRepository.buscarPorID(id);
        if (!carro)
            throw new Error("404: Carro não encontrado!");
        return carro;
    }
    async atualizarCarro(id, dadosCarro) {
        const { marca, modelo, ano, placa, preco, cor } = dadosCarro;
        const carroExiste = await this.carroRepository.buscarPorID(id);
        if (!carroExiste)
            throw new Error("404:Carro não encontrado para atualização.");
        if (!marca || !modelo || !ano || !placa || preco === undefined || preco === null || !cor)
            throw new Error("400:Todos os campos são obrigatórios para a atualização.");
        const carroComMesmaPlaca = await this.carroRepository.buscarPorPlaca(placa);
        if (carroComMesmaPlaca && carroComMesmaPlaca.id_carro !== id)
            throw new Error("409:Já existe outro carro cadastrado com esta placa.");
        const anoAtual = new Date().getFullYear();
        if (!Number.isInteger(ano) || ano < 1950 || ano > anoAtual + 1)
            throw new Error(`400:O ano deve ser um número inteiro entre 1950 e ${anoAtual + 1}.`);
        if (preco <= 0)
            throw new Error("400:O preço deve ser um valor positivo maior que zero.");
        carroExiste.marca = marca;
        carroExiste.modelo = modelo;
        carroExiste.ano = ano;
        carroExiste.placa = placa;
        carroExiste.preco = preco;
        carroExiste.cor = cor;
        await this.carroRepository.atualizar(carroExiste);
        return carroExiste;
    }
    async removerCarro(id) {
        const carro = await this.buscarPorID(id);
        if (!carro)
            throw new Error("Carro não encontrado");
        const existeEstoque = await this.estoquerepository.buscarEstoqueCarro(id);
        if (existeEstoque)
            throw new Error("Não é permitido remover um carro que possua registros em estoque.");
        const notasVinc = await this.notafiscalRepository.buscarPorCarroId(id);
        if (notasVinc && notasVinc.length > 0)
            throw new Error("Não é permitido remover um carro que possua notas fiscais vinculadas.");
        await this.carroRepository.remover(id);
    }
    async listarCarrosComEstoque() {
        const todosCarros = await this.carroRepository.buscarTodos();
        const carrosDisponiveis = [];
        for (const carro of todosCarros) {
            const estoque = await this.estoquerepository.buscarEstoqueCarro(carro.id_carro);
            if (estoque && estoque.quantidade > 0) {
                carrosDisponiveis.push(carro);
            }
        }
        return carrosDisponiveis;
    }
}
exports.carroService = carroService;
