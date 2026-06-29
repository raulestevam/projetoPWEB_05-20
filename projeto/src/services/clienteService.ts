import { Cliente } from "../models/Cliente";
import { clienteRepository } from "../repositories/clienteRepository";
import { notaFiscalRepository } from "../repositories/notaFiscalRepository";

export class clienteService {
    clienteRepository: clienteRepository = clienteRepository.getInstance();
    notafiscalRepository: notaFiscalRepository = notaFiscalRepository.getInstance();

    async cadastrarCliente(clienteInfo: any): Promise<Cliente> {
        const { nome, cpf, telefone, email, cidade } = clienteInfo;

        if (!nome || !cpf || !telefone)
            throw new Error("Informações obrigatórias incompletas. Nome, CPF e Telefone são necessários.");

        const cpfExiste = await this.clienteRepository.buscarPorCpf(cpf);
        if (cpfExiste)
            throw new Error("Não é permitido cadastrar dois clientes com o mesmo CPF.");

        const novoCliente = new Cliente(nome, cpf, telefone, email, cidade);
        await this.clienteRepository.inserirCliente(novoCliente);
        return novoCliente;
    }

    async exibirClientes(): Promise<Cliente[]> {
        return await this.clienteRepository.mostrarClientes();
    }

    async consultarCliente(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.buscarCliente(id);

        if (!cliente)
            throw new Error("Cliente não encontrado");

        return cliente;
    }

    async modificarCliente(id: number, clienteInfo: any): Promise<Cliente> {
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

    async removerCliente(id: number): Promise<void> {
        const cliente = await this.clienteRepository.buscarCliente(id);

        if (!cliente)
            throw new Error("Cliente não encontrado");

        const notasVinc = await this.notafiscalRepository.buscarPorClienteId(id);
        if (notasVinc && notasVinc.length > 0)
            throw new Error("Não é permitido remover um cliente que possua notas fiscais vinculadas.");

        await this.clienteRepository.deletarCliente(id);
    }
}