import { Cliente } from "../models/Cliente";
import { clienteRepository } from "../repositories/clienteRepository";

export class clienteService {
    clienteRepository: clienteRepository = clienteRepository.getInstance()

    cadastrarCliente(clienteInfo: any): Cliente {
        const { nome, cpf, telefone, email, cidade } = clienteInfo;
        
        if(!nome || !cpf || !telefone) {
            throw new Error ("Informações obrigatórias incompletas. Nome, CPF e Telefone são necessários.");
        }

        const clientesCadastrados = this.clienteRepository.mostrarClientes();
        const cpfExiste = clientesCadastrados.some(cliente => cliente.cpf === cpf);

        if (cpfExiste) {
            throw new Error ("Não é permitido cadastrar dois clientes com o mesmo CPF.");
        }

        const novoCliente = new Cliente(nome, cpf, telefone, email, cidade);
        this.clienteRepository.inserirCliente(novoCliente);

        return novoCliente;
    }

    exibirClientes(): Cliente[] {
        const clientesCadastrados = this.clienteRepository.mostrarClientes();

        if(clientesCadastrados.length === 0) {
            throw new Error ("Não há clientes cadastrados")
        }

        return clientesCadastrados;
    }

    consultarCliente(id: number): Cliente {
        const cliente = this.clienteRepository.buscarCliente(id);

        if(!cliente) {
            throw new Error ("Cliente não encontrado");
        }

        return cliente;
    }

    modificarCliente(id: number, clienteInfo: any) {
        const cliente = this.clienteRepository.buscarCliente(id);

        if(!cliente) {
            throw new Error ("Cliente não encontrado");
        }

        const { nome, cpf, telefone, email, cidade } = clienteInfo;

        if(!nome || !cpf || !telefone) {
            throw new Error ("Informações obrigatórias incompletas. Nome, CPF e Telefone são necessários.");
        }

        const clientesCadastrados = this.clienteRepository.mostrarClientes();
        const cpfExiste = clientesCadastrados.some(cliente => cliente.cpf === cpf && cliente.id_cliente !== id);

        if (cpfExiste) {
            throw new Error ("Já há outro cliente cadastrado com o mesmo CPF.");
        }

        this.clienteRepository.atualizarCliente(cliente, clienteInfo);
    }

    // Metodo de remover cliente está incompleto, pois é necessario estar pronto
    // a nota fiscal para fazer a verificação requsitada nas regras de negócio
    removerCliente(id: number) {
        const cliente = this.clienteRepository.buscarCliente(id);

        if(!cliente) {
            throw new Error ("Cliente não encontrado");
        }

        this.clienteRepository.deletarCliente(id);
    }
}