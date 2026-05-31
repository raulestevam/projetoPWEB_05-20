import { Cliente } from "../models/Cliente";

export class clienteRepository {
    private static instance: clienteRepository;
    private clienteLista: Cliente[] = [];

    private constructor() {}

    public static getInstance(): clienteRepository {
        if(!this.instance){
            this.instance = new clienteRepository();
        }
        return this.instance;
    }

    inserirCliente(cliente: Cliente) {
        this.clienteLista.push(cliente);
    }

    mostrarClientes(): Cliente[] {
        return this.clienteLista;
    }

    buscarCliente(id: number): Cliente|undefined {
        return this.clienteLista.find(cliente => cliente.id_cliente === id);
    }

    atualizarCliente(cliente: Cliente, clienteAtualizado: any) {
        cliente.nome = clienteAtualizado.nome;
        cliente.cpf = clienteAtualizado.cpf;
        cliente.telefone = clienteAtualizado.telefone;
        cliente.email = clienteAtualizado.email;
        cliente.cidade = clienteAtualizado.cidade;
    }
    
    deletarCliente(id: number) {
        const clienteIndex = this.clienteLista.findIndex(cliente => cliente.id_cliente === id);
        this.clienteLista.splice(clienteIndex, 1);
    }
}