"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteService = void 0;
const Cliente_1 = require("../models/Cliente");
const clienteRepository_1 = require("../repositories/clienteRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
class clienteService {
    clienteRepository = clienteRepository_1.clienteRepository.getInstance();
    notafiscalRepository = notaFiscalRepository_1.notaFiscalRepository.getInstance();
    async cadastrarCliente(clienteInfo) {
        const { nome, cpf, telefone, email, cidade } = clienteInfo;
        if (!nome || !cpf || !telefone)
            throw new Error("Informações obrigatórias incompletas. Nome, CPF e Telefone são necessários.");
        const cpfExiste = await this.clienteRepository.buscarPorCpf(cpf);
        if (cpfExiste)
            throw new Error("Não é permitido cadastrar dois clientes com o mesmo CPF.");
        const novoCliente = new Cliente_1.Cliente(nome, cpf, telefone, email, cidade);
        await this.clienteRepository.inserirCliente(novoCliente);
        return novoCliente;
    }
    async exibirClientes() {
        return await this.clienteRepository.mostrarClientes();
    }
    async consultarCliente(id) {
        const cliente = await this.clienteRepository.buscarCliente(id);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        return cliente;
    }
    async modificarCliente(id, clienteInfo) {
        const cliente = await this.clienteRepository.buscarCliente(id);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        const { nome, cpf, telefone, email, cidade } = clienteInfo;
        if (!nome || !cpf || !telefone)
            throw new Error("Informações obrigatórias incompletas. Nome, CPF e Telefone são necessários.");
        const cpfExiste = await this.clienteRepository.buscarPorCpf(cpf);
        if (cpfExiste && cpfExiste.id_cliente !== id)
            throw new Error("Já há outro cliente cadastrado com o mesmo CPF.");
        cliente.nome = nome;
        cliente.cpf = cpf;
        cliente.telefone = telefone;
        cliente.email = email;
        cliente.cidade = cidade;
        await this.clienteRepository.atualizarCliente(cliente);
        return cliente;
    }
    async removerCliente(id) {
        const cliente = await this.clienteRepository.buscarCliente(id);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        const notasVinc = await this.notafiscalRepository.buscarPorClienteId(id);
        if (notasVinc && notasVinc.length > 0)
            throw new Error("Não é permitido remover um cliente que possua notas fiscais vinculadas.");
        await this.clienteRepository.deletarCliente(id);
    }
}
exports.clienteService = clienteService;
