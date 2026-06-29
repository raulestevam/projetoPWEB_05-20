"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notaFiscalService = void 0;
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const clienteRepository_1 = require("../repositories/clienteRepository");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const carroRepository_1 = require("../repositories/carroRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const NotaFiscal_1 = require("../models/NotaFiscal");
class notaFiscalService {
    notaFiscalRepository = notaFiscalRepository_1.notaFiscalRepository.getInstance();
    clienteRepository = clienteRepository_1.clienteRepository.getInstance();
    vendedorRepository = vendedorRepository_1.vendedorRepository.getInstance();
    carroRepository = carroRepository_1.carroRepository.getInstance();
    estoqueRepository = estoqueRepository_1.estoqueRepository.getInstance();
    async listarNotas() {
        return await this.notaFiscalRepository.listarNotas();
    }
    async buscarPorNotaId(id) {
        const notaFiscal = await this.notaFiscalRepository.buscarNotaPorId(id);
        if (!notaFiscal)
            throw new Error("Nota Fiscal não encontrada.");
        return notaFiscal;
    }
    async emitirNota(dados) {
        const { numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro } = dados;
        if (!numero_nota || !data_emissao || valor_total === undefined || !id_cliente || !id_vendedor || !id_carro)
            throw new Error("Campos obrigatórios ausentes. É necessário informar numero_nota, data_emissao, valor_total, id_cliente, id_vendedor e id_carro.");
        //verifica a existencia da nota dentro do proprio banco
        const notaExiste = await this.notaFiscalRepository.buscarPorNumeroNota(numero_nota);
        if (notaExiste)
            throw new Error("Número da nota já existe no sistema.");
        if (valor_total <= 0)
            throw new Error("O valor total deve ser positivo e maior que zero.");
        const dataEmissaoObj = new Date(data_emissao);
        if (isNaN(dataEmissaoObj.getTime()))
            throw new Error("A data de emissão fornecida é inválida.");
        const dataHoje = new Date();
        if (dataEmissaoObj.getTime() > dataHoje.getTime())
            throw new Error("A data de emissão não pode ser uma data futura em relação à data atual do servidor.");
        if (!await this.clienteRepository.buscarCliente(id_cliente))
            throw new Error("O cliente referenciado não existe no sistema.");
        if (!await this.vendedorRepository.buscarVendedor(id_vendedor))
            throw new Error("O vendedor referenciado não existe no sistema.");
        if (!await this.carroRepository.buscarPorID(id_carro))
            throw new Error("O carro referenciado não existe no sistema.");
        const estoqueAtivo = await this.estoqueRepository.buscarEstoqueCarro(id_carro);
        if (!estoqueAtivo || estoqueAtivo.quantidade <= 0)
            throw new Error("Estoque insuficiente para a emissão da nota fiscal.");
        estoqueAtivo.quantidade -= 1;
        await this.estoqueRepository.atualizarEstoque(estoqueAtivo);
        const novaNota = new NotaFiscal_1.NotaFiscal(numero_nota, dataEmissaoObj, valor_total, id_cliente, id_vendedor, id_carro);
        await this.notaFiscalRepository.criarNota(novaNota);
        return novaNota;
    }
    async buscarNotasPorCliente(clienteId) {
        const notas = await this.notaFiscalRepository.buscarPorClienteId(clienteId);
        if (notas.length === 0)
            throw new Error("Notas fiscais não encontradas para este cliente.");
        return notas;
    }
    async buscarNotasPorVendedor(vendedorId) {
        const notas = await this.notaFiscalRepository.buscarPorVendedorId(vendedorId);
        if (notas.length === 0)
            throw new Error("Notas fiscais não encontradas para este vendedor.");
        return notas;
    }
}
exports.notaFiscalService = notaFiscalService;
