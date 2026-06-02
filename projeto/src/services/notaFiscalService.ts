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

    listarNotas(): NotaFiscal[] {
        return this.notaFiscalRepository.listarNotas();
    }

    buscarPorNotaId(id: number): NotaFiscal {
        const notaFiscal = this.notaFiscalRepository.buscarNotaPorId(id);

        if (!notaFiscal) {
            throw new Error("Nota Fiscal não encontrada."); 
        }

        return notaFiscal;
    }

    emitirNota(dados: any) {
        const { numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro } = dados;

        if (!numero_nota || !data_emissao || valor_total === undefined || !id_cliente || !id_vendedor || !id_carro) {
            throw new Error("Campos obrigatórios ausentes. É necessário informar numero_nota, data_emissao, valor_total, id_cliente, id_vendedor e id_carro."); 
        }

        const notas = this.notaFiscalRepository.listarNotas();
        const notaExiste = notas.find(n => n.numero_nota === numero_nota);
        if (notaExiste) {
            throw new Error("Número da nota já existe no sistema."); 
        }

        if (valor_total <= 0) {
            throw new Error("O valor total deve ser positivo e maior que zero."); 
        }

        const dataEmissaoObj = new Date(data_emissao);
        if (isNaN(dataEmissaoObj.getTime())) {
            throw new Error("A data de emissão fornecida é inválida."); 
        }
        
        const dataHoje = new Date();
        if (dataEmissaoObj.getTime() > dataHoje.getTime()) {
            throw new Error("A data de emissão não pode ser uma data futura em relação à data atual do servidor."); 
        }

        if (!this.clienteRepository.buscarCliente(id_cliente)) {
            throw new Error("O cliente referenciado não existe no sistema."); 
        }
        
        if (!this.vendedorRepository.buscarVendedor(id_vendedor)) {
            throw new Error("O vendedor referenciado não existe no sistema."); 
        }

        if (!this.carroRepository.buscarPorID(id_carro)) {
            throw new Error("O carro referenciado não existe no sistema."); 
        }

        const estoqueAtivo = this.estoqueRepository.buscarEstoqueCarro(id_carro);
        
        if (!estoqueAtivo || estoqueAtivo.quantidade <= 0) {
            throw new Error("Estoque insuficiente para a emissão da nota fiscal."); 
        }

        estoqueAtivo.quantidade -= 1;
        this.estoqueRepository.atualizarEstoque(estoqueAtivo);

        const novaNota = new NotaFiscal(numero_nota, dataEmissaoObj, valor_total, id_cliente, id_vendedor, id_carro);
        
        this.notaFiscalRepository.criarNota(novaNota);

        return novaNota;
    }
}