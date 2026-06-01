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

    atualizarCliente(clienteAtualizado: Cliente) {
        const clienteIndex = this.clienteLista.findIndex(cliente => cliente.id_cliente === clienteAtualizado.id_cliente);
        
        if (clienteIndex !== -1) {
            this.clienteLista[clienteIndex] = clienteAtualizado;
        }
    }
    
    deletarCliente(id: number) {
        const clienteIndex = this.clienteLista.findIndex(cliente => cliente.id_cliente === id);
        
        if (clienteIndex !== -1) {
            this.clienteLista.splice(clienteIndex, 1);
        }
    }
}