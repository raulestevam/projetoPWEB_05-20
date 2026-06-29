import { notaFiscalRepository } from '../repositories/notaFiscalRepository';
import { clienteRepository } from '../repositories/clienteRepository';
import { vendedorRepository } from '../repositories/vendedorRepository';
import { carroRepository } from '../repositories/carroRepository';
import { estoqueRepository } from '../repositories/estoqueRepository';
import { NotaFiscal } from '../models/NotaFiscal';

export class notaFiscalService {
    notaFiscalRepository: notaFiscalRepository = notaFiscalRepository.getInstance();
    clienteRepository: clienteRepository = clienteRepository.getInstance();
    vendedorRepository: vendedorRepository = vendedorRepository.getInstance();
    carroRepository: carroRepository = carroRepository.getInstance();
    estoqueRepository: estoqueRepository = estoqueRepository.getInstance();

    async listarNotas(): Promise<NotaFiscal[]> {
        return await this.notaFiscalRepository.listarNotas();
    }

    async buscarPorNotaId(id: number): Promise<NotaFiscal> {
        const notaFiscal = await this.notaFiscalRepository.buscarNotaPorId(id);

        if (!notaFiscal)
            throw new Error("Nota Fiscal não encontrada.");

        return notaFiscal;
    }

    async emitirNota(dados: any): Promise<NotaFiscal> {
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

        const novaNota = new NotaFiscal(numero_nota, dataEmissaoObj, valor_total, id_cliente, id_vendedor, id_carro);
        await this.notaFiscalRepository.criarNota(novaNota);
        return novaNota;
    }

    async buscarNotasPorCliente(clienteId: number): Promise<NotaFiscal[]> {
        const notas = await this.notaFiscalRepository.buscarPorClienteId(clienteId);

        if (notas.length === 0)
            throw new Error("Notas fiscais não encontradas para este cliente.");

        return notas;
    }

    async buscarNotasPorVendedor(vendedorId: number): Promise<NotaFiscal[]> {
        const notas = await this.notaFiscalRepository.buscarPorVendedorId(vendedorId);

        if (notas.length === 0)
            throw new Error("Notas fiscais não encontradas para este vendedor.");

        return notas;
    }
}